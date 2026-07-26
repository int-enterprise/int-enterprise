/**
 * 팀 인물 사진을 카드 비율(4:5)에 맞춘다.
 *
 *   node scripts/prepare-team-photos.mjs
 *
 * 왜 필요한가
 *   받은 사진은 대부분 정사각에 가깝다(415×371, 2090×2016 …).
 *   카드는 4:5 세로라 `object-cover`가 좌우를 잘라 낸다 — 어깨가 잘리고 얼굴만 커진다.
 *   그래서 **자르는 대신 배경색으로 여백을 채워** 4:5를 만든다.
 *
 * 배경색은 네 모서리에서 뽑는다. 스튜디오 촬영본이라 흰색/아주 옅은 회색이고,
 * 채운 여백이 원본 배경과 이어져 보인다(임의로 흰색을 칠하면 경계가 드러난다).
 *
 * 여백은 위 10% / 아래 90%로 나눈다. 인물 사진은 머리 위 공간이 조금만 있고
 * 몸 아래가 넓은 쪽이 자연스럽다.
 *
 * ⚠️ **확대하지 않는다.** 원본 폭을 그대로 두고 높이만 늘린다.
 * ⚠️ 원본은 `assets/raw/team/`에 남긴다. 다시 돌려도 결과가 같아야 한다.
 */
import puppeteer from "puppeteer-core";
import fs from "node:fs";
import path from "node:path";

const CHROME =
  process.env.CHROME_PATH ??
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

const RAW_DIR = path.resolve("assets/raw/team");
const OUT_DIR = path.resolve("public/about/team");
/** 카드 비율. widgets/company/ui/team-section.tsx의 aspect-[4/5]와 맞춘다. */
const RATIO = 4 / 5;
/** 늘린 높이 중 위쪽에 두는 비율 */
const TOP_SHARE = 0.1;

fs.mkdirSync(OUT_DIR, { recursive: true });
const files = fs.readdirSync(RAW_DIR).filter((f) => /\.(png|jpe?g)$/i.test(f));

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "new",
  args: ["--no-sandbox"],
});
const page = await browser.newPage();
await page.setContent("<html><body></body></html>");

const rows = [];

for (const file of files) {
  const buf = fs.readFileSync(path.join(RAW_DIR, file));
  const mime = /\.png$/i.test(file) ? "image/png" : "image/jpeg";
  const dataUrl = `data:${mime};base64,${buf.toString("base64")}`;

  const result = await page.evaluate(
    async (url, ratio, topShare) => {
      const img = new Image();
      img.src = url;
      await img.decode();

      const src = document.createElement("canvas");
      src.width = img.width;
      src.height = img.height;
      const sctx = src.getContext("2d", { willReadFrequently: true });
      sctx.drawImage(img, 0, 0);

      // 네 모서리 평균으로 배경색을 잡는다.
      // ⚠️ 배경이 **투명한 PNG**면 RGB가 (0,0,0)이라 검정으로 읽힌다.
      // 알파가 낮으면 흰색으로 본다 — 안 그러면 여백이 새까맣게 칠해진다.
      const corners = [
        [2, 2],
        [img.width - 3, 2],
        [2, img.height - 3],
        [img.width - 3, img.height - 3],
      ].map(([x, y]) => sctx.getImageData(x, y, 1, 1).data);
      const opaque = corners.filter((c) => c[3] >= 200);
      let bg = opaque.length
        ? [0, 1, 2].map((i) =>
            Math.round(opaque.reduce((s, c) => s + c[i], 0) / opaque.length)
          )
        : [255, 255, 255];
      // 스튜디오 인물 사진의 배경은 항상 밝다. 어둡게 읽혔다면 모서리에 인물이나
      // 비네팅이 걸린 것이므로 흰색으로 간다(검은 여백이 생기는 것보다 낫다).
      const lum = 0.299 * bg[0] + 0.587 * bg[1] + 0.114 * bg[2];
      if (lum < 220) bg = [255, 255, 255];

      // 배경을 **순백으로 통일**한다.
      // 받은 사진마다 배경이 #ffffff / #f7f7f7 / #fffffe로 조금씩 다른데,
      // 카드가 흰 페이지 위에 놓이므로 한 장만 회색이면 그 사람만 네모가 드러난다.
      // 네 모서리에서 flood fill 하면 인물 밖만 칠해진다(윤곽선이 경계가 된다).
      const TOL = 14;
      const flood = () => {
        const data = sctx.getImageData(0, 0, src.width, src.height);
        const px = data.data;
        const { width: w, height: h } = src;
        const seen = new Uint8Array(w * h);
        const stack = [0, w - 1, (h - 1) * w, h * w - 1];
        const near = (i) =>
          Math.abs(px[i] - bg[0]) <= TOL &&
          Math.abs(px[i + 1] - bg[1]) <= TOL &&
          Math.abs(px[i + 2] - bg[2]) <= TOL;
        while (stack.length) {
          const p = stack.pop();
          if (seen[p]) continue;
          const i = p * 4;
          if (!near(i)) continue;
          seen[p] = 1;
          px[i] = 255;
          px[i + 1] = 255;
          px[i + 2] = 255;
          px[i + 3] = 255;
          const x = p % w;
          const y = (p - x) / w;
          if (x > 0) stack.push(p - 1);
          if (x < w - 1) stack.push(p + 1);
          if (y > 0) stack.push(p - w);
          if (y < h - 1) stack.push(p + w);
        }
        sctx.putImageData(data, 0, 0);
      };
      flood();
      bg = [255, 255, 255];

      const targetH = Math.round(img.width / ratio);
      const pad = Math.max(0, targetH - img.height);
      // 투명 배경도 흰 바탕 위에 얹어 평평하게 만든다(여백과 이어지도록)
      const out = document.createElement("canvas");
      out.width = img.width;
      out.height = Math.max(targetH, img.height);
      const octx = out.getContext("2d");
      octx.fillStyle = `rgb(${bg[0]},${bg[1]},${bg[2]})`;
      octx.fillRect(0, 0, out.width, out.height);
      octx.drawImage(src, 0, Math.round(pad * topShare));

      return {
        padded: pad > 0,
        w: out.width,
        h: out.height,
        bg,
        png: out.toDataURL("image/png"),
      };
    },
    dataUrl,
    RATIO,
    TOP_SHARE
  );

  const outFile = path.join(OUT_DIR, file.replace(/\.jpe?g$/i, ".png"));
  fs.writeFileSync(outFile, Buffer.from(result.png.split(",")[1], "base64"));

  rows.push({
    파일: path.basename(outFile),
    산출: `${result.w}×${result.h}`,
    배경: `rgb(${result.bg.join(",")})`,
    처리: result.padded ? "여백 채움" : "비율 충분 — 배경만 평탄화",
  });
}

await browser.close();
console.table(rows);
