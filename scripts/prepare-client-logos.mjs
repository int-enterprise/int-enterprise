/**
 * 고객사·파트너 로고 원본을 public/clients/ 아래 쓸 수 있는 형태로 정리한다.
 *
 *   node scripts/prepare-client-logos.mjs
 *
 * 하는 일
 *   1) 원본을 읽어 네 모서리 색으로 배경을 판정한다.
 *      - 흰색/투명 배경 → 로고 주변 여백을 잘라낸다(트리밍).
 *        여백이 큰 정사각 원본을 그대로 쓰면 로고 월에서 혼자 작게 보인다.
 *      - 색이 있는 배경 → **자르지 않는다.** 그 색면이 그 회사가 정한 로고 락업이다.
 *        (Mobisight 네이비, VOWING 블루, STRA 차콜)
 *   2) 높이 120px를 상한으로 축소만 한다. **확대는 하지 않는다** —
 *      원본이 작은 로고를 억지로 키우면 흐려진 로고가 박힌다.
 *      그래서 산출 높이는 로고마다 다를 수 있고, 낮으면 경고를 띄운다(원본 재요청 신호).
 *   3) 산출물의 실제 width/height를 표로 출력한다.
 *      → 이 값을 entities/client의 로고 데이터(logoWidth/logoHeight)에 적어 준다.
 *        next/image에 정확한 비율을 넘겨야 로고가 찌그러지지 않는다.
 *
 * ⚠️ 남의 회사 로고에 그레이스케일·톤 보정을 걸지 않는다. 여백만 정리한다.
 * 브라우저 캔버스로 처리하므로 별도 이미지 라이브러리를 설치하지 않는다.
 */
import puppeteer from "puppeteer-core";
import fs from "node:fs";
import path from "node:path";

const CHROME =
  process.env.CHROME_PATH ??
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

/** 전달받은 원본 보관함. 산출물을 다시 만들 수 있어야 하므로 지우지 않는다. */
const SRC_DIR = path.resolve("assets/raw/clients");
const OUT_DIR = path.resolve("public/clients");
/** 산출 높이 상한(px). 화면에서 36px 안팎으로 쓰므로 3배 이상이면 충분하다. */
const OUT_HEIGHT = 120;
/** 이 높이에 못 미치면 원본 해상도가 부족하다는 뜻 — 경고를 띄운다. */
const MIN_CRISP_HEIGHT = 72;

/** 원본 파일명 → 저장 슬러그. 한글·공백 파일명을 그대로 쓰지 않는다. */
const FILES = [
  { src: "fust-lab.webp", slug: "fust-lab", name: "FUST Lab." },
  { src: "icore.png", slug: "icore", name: "icore" },
  { src: "mobisight.jpg", slug: "mobisight", name: "Mobisight" },
  { src: "stra.png", slug: "stra", name: "STRA" },
  { src: "vowing.png", slug: "vowing", name: "VOWING" },
  { src: "zhejiang-university.png", slug: "zhejiang-university", name: "저장대학교" },
  { src: "younglimwon.jpg", slug: "younglimwon", name: "영림원소프트랩" },
  { src: "cheonghae-env.png", slug: "cheonghae-env", name: "청해ENV" },
  { src: "cambridge.png", slug: "cambridge", name: "University of Cambridge" },
  // 기존 자산도 같은 규칙으로 다시 정리한다 — 여백이 남아 있으면 로고 월에서 혼자 작아 보인다.
  { src: "cnt-tech.png", slug: "cnt-tech", name: "씨엔티테크" },
  { src: "stepi.png", slug: "stepi", name: "STEPI" },
  { src: "ogq.png", slug: "ogq", name: "OGQ" },
  { src: "keit.jpg", slug: "keit", name: "KEIT" },
];

const MIME = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
};

fs.mkdirSync(OUT_DIR, { recursive: true });

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "new",
  args: ["--no-sandbox"],
});
const page = await browser.newPage();
await page.setContent("<html><body></body></html>");

const rows = [];

for (const f of FILES) {
  const abs = path.join(SRC_DIR, f.src);
  if (!fs.existsSync(abs)) {
    console.error("없음:", f.src);
    continue;
  }
  const mime = MIME[path.extname(f.src).toLowerCase()];
  const dataUrl = `data:${mime};base64,${fs.readFileSync(abs).toString("base64")}`;

  const result = await page.evaluate(
    async (url, outHeight) => {
      const img = new Image();
      img.src = url;
      await img.decode();

      const c = document.createElement("canvas");
      c.width = img.width;
      c.height = img.height;
      const ctx = c.getContext("2d", { willReadFrequently: true });
      ctx.drawImage(img, 0, 0);
      const { data } = ctx.getImageData(0, 0, c.width, c.height);

      const px = (x, y) => {
        const i = (y * c.width + x) * 4;
        return [data[i], data[i + 1], data[i + 2], data[i + 3]];
      };

      // 네 모서리로 배경 판정. 전부 투명하거나 전부 흰색에 가까우면 "여백"이다.
      const corners = [
        px(0, 0),
        px(c.width - 1, 0),
        px(0, c.height - 1),
        px(c.width - 1, c.height - 1),
      ];
      const isBlank = ([r, g, b, a]) =>
        a < 12 || (r > 240 && g > 240 && b > 240);
      const trimmable = corners.every(isBlank);

      let box = { sx: 0, sy: 0, sw: c.width, sh: c.height };

      if (trimmable) {
        let minX = c.width;
        let minY = c.height;
        let maxX = -1;
        let maxY = -1;
        for (let y = 0; y < c.height; y++) {
          for (let x = 0; x < c.width; x++) {
            if (!isBlank(px(x, y))) {
              if (x < minX) minX = x;
              if (x > maxX) maxX = x;
              if (y < minY) minY = y;
              if (y > maxY) maxY = y;
            }
          }
        }
        if (maxX >= minX && maxY >= minY) {
          // 아주 얇은 숨 여백만 남긴다 — 타일 안에서 붙어 보이지 않게.
          const pad = Math.round((maxY - minY) * 0.04);
          const sx = Math.max(0, minX - pad);
          const sy = Math.max(0, minY - pad);
          box = {
            sx,
            sy,
            sw: Math.min(c.width - sx, maxX - minX + 1 + pad * 2),
            sh: Math.min(c.height - sy, maxY - minY + 1 + pad * 2),
          };
        }
      }

      // 축소만. 원본보다 키우지 않는다(확대하면 로고가 흐려진다).
      const scale = Math.min(1, outHeight / box.sh);
      const outW = Math.max(1, Math.round(box.sw * scale));
      const outH = Math.max(1, Math.round(box.sh * scale));
      const out = document.createElement("canvas");
      out.width = outW;
      out.height = outH;
      const octx = out.getContext("2d");
      octx.imageSmoothingQuality = "high";
      octx.drawImage(
        c,
        box.sx,
        box.sy,
        box.sw,
        box.sh,
        0,
        0,
        outW,
        outH
      );

      return {
        trimmed: trimmable,
        source: { w: img.width, h: img.height },
        width: outW,
        height: outH,
        png: out.toDataURL("image/png"),
      };
    },
    dataUrl,
    OUT_HEIGHT
  );

  const file = path.join(OUT_DIR, `${f.slug}.png`);
  fs.writeFileSync(file, Buffer.from(result.png.split(",")[1], "base64"));

  rows.push({
    name: f.name,
    file: `/clients/${f.slug}.png`,
    원본: `${result.source.w}×${result.source.h}`,
    산출: `${result.width}×${result.height}`,
    w: result.width,
    h: result.height,
    처리: result.trimmed ? "여백 트리밍" : "색배경 유지",
    해상도: result.height < MIN_CRISP_HEIGHT ? "⚠ 부족" : "충분",
  });
}

await browser.close();

console.table(rows);

console.log("\n// entities/client 로고 데이터에 넣을 값");
for (const r of rows) {
  console.log(
    `  { name: "${r.name}", logoUrl: "${r.file}", logoWidth: ${r.w}, logoHeight: ${r.h} },`
  );
}

const lowRes = rows.filter((r) => r.해상도 !== "충분");
if (lowRes.length > 0) {
  console.log(
    `\n⚠ 원본 해상도가 부족한 로고 ${lowRes.length}건 — 고해상도(또는 SVG) 파일을 다시 받는 편이 좋다:`
  );
  for (const r of lowRes) console.log(`   - ${r.name} (${r.산출})`);
}
