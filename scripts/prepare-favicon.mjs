/**
 * 파비콘 생성 — 브랜드 워드마크를 정사각 아이콘으로 만든다.
 *
 *   node scripts/prepare-favicon.mjs
 *
 * 산출물
 *   src/app/icon.png        512×512 (Next가 favicon으로 쓰고 크기별로 줄여 준다)
 *   src/app/apple-icon.png  180×180 (iOS 홈 화면)
 *
 * ⚠️ Next.js App Router는 `app/favicon.ico`를 `app/icon.png`보다 우선한다.
 * 기본 아이콘이 남아 있으면 이 파일을 만들어도 안 바뀐다 — favicon.ico를 지운다.
 *
 * 디자인: 브랜드 네이비 정사각 + 흰 워드마크. 16px에서 글자는 못 읽지만
 * 색 블록이 브라우저 탭에서 우리 것으로 식별된다(대부분의 기업 파비콘이 이 방식).
 */
import puppeteer from "puppeteer-core";
import fs from "node:fs";
import path from "node:path";

const CHROME =
  process.env.CHROME_PATH ??
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

const NAVY = "#04044a";
const MARK = path.resolve("public/brand/int-logo-white.png");
const SIZES = [
  { size: 512, out: "src/app/icon.png" },
  { size: 180, out: "src/app/apple-icon.png" },
];

const markData = `data:image/png;base64,${fs.readFileSync(MARK).toString("base64")}`;

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "new",
  args: ["--no-sandbox"],
});
const page = await browser.newPage();
await page.setContent("<html><body></body></html>");

for (const { size, out } of SIZES) {
  const dataUrl = await page.evaluate(
    async (mark, s, navy) => {
      const img = new Image();
      img.src = mark;
      await img.decode();

      const c = document.createElement("canvas");
      c.width = s;
      c.height = s;
      const ctx = c.getContext("2d");

      // 배경 — 모서리를 살짝 둥글린 정사각
      const r = Math.round(s * 0.22);
      ctx.fillStyle = navy;
      ctx.beginPath();
      ctx.roundRect(0, 0, s, s, r);
      ctx.fill();

      // 워드마크 — 가로 78%를 채우고 가운데 정렬
      const w = s * 0.78;
      const h = (img.height / img.width) * w;
      ctx.drawImage(img, (s - w) / 2, (s - h) / 2, w, h);

      return c.toDataURL("image/png");
    },
    markData,
    size,
    NAVY
  );

  const file = path.resolve(out);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, Buffer.from(dataUrl.split(",")[1], "base64"));
  console.log("wrote:", out, `${size}×${size}`);
}

await browser.close();
