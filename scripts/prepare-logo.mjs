/**
 * public/brand/int-logo-raw.png(여백이 큰 원본)에서 워드마크만 잘라
 * 실제로 쓸 로고 파일을 만든다.
 *
 *   node scripts/prepare-logo.mjs
 *
 * 산출물
 *   public/brand/int-logo.png        라이트 배경용 (원본 색)
 *   public/brand/int-logo-white.png  다크 배경용 (검정 → 화이트, 틸 점은 유지)
 *
 * 브라우저 캔버스로 처리하므로 별도 이미지 라이브러리를 설치하지 않는다.
 */
import puppeteer from "puppeteer-core";
import fs from "node:fs";
import path from "node:path";

const CHROME =
  process.env.CHROME_PATH ??
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

const RAW = path.resolve("public/brand/int-logo-raw.png");
const raw = fs.readFileSync(RAW).toString("base64");

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "new",
  args: ["--no-sandbox"],
});
const page = await browser.newPage();
await page.setContent("<html><body></body></html>");

const result = await page.evaluate(async (dataUrl) => {
  const img = new Image();
  img.src = dataUrl;
  await img.decode();

  const c = document.createElement("canvas");
  c.width = img.width;
  c.height = img.height;
  const ctx = c.getContext("2d", { willReadFrequently: true });
  ctx.drawImage(img, 0, 0);
  const { data } = ctx.getImageData(0, 0, c.width, c.height);

  // 흰색/투명이 아닌 픽셀의 경계 상자를 찾는다.
  let minX = c.width, minY = c.height, maxX = -1, maxY = -1;
  const isInk = (i) => {
    const a = data[i + 3];
    if (a < 12) return false;
    const r = data[i], g = data[i + 1], b = data[i + 2];
    return !(r > 244 && g > 244 && b > 244);
  };
  for (let y = 0; y < c.height; y++) {
    for (let x = 0; x < c.width; x++) {
      const i = (y * c.width + x) * 4;
      if (isInk(i)) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }

  const pad = Math.round((maxY - minY) * 0.06);
  const sx = Math.max(0, minX - pad);
  const sy = Math.max(0, minY - pad);
  const sw = Math.min(c.width - sx, maxX - minX + pad * 2);
  const sh = Math.min(c.height - sy, maxY - minY + pad * 2);

  // 틸 점 색 추출 — 우하단 영역에서 채도가 가장 높은 픽셀
  let teal = null;
  let bestSat = 0;
  for (let y = minY; y <= maxY; y += 3) {
    for (let x = minX; x <= maxX; x += 3) {
      const i = (y * c.width + x) * 4;
      if (data[i + 3] < 200) continue;
      const r = data[i], g = data[i + 1], b = data[i + 2];
      const mx = Math.max(r, g, b), mn = Math.min(r, g, b);
      const sat = mx === 0 ? 0 : (mx - mn) / mx;
      if (sat > bestSat) {
        bestSat = sat;
        teal = [r, g, b];
      }
    }
  }

  // 1) 원본 색 크롭
  const out = document.createElement("canvas");
  out.width = sw;
  out.height = sh;
  const octx = out.getContext("2d");
  octx.drawImage(c, sx, sy, sw, sh, 0, 0, sw, sh);
  const normal = out.toDataURL("image/png");

  // 2) 화이트 버전 — 어두운 픽셀만 흰색으로, 틸은 그대로
  const wl = octx.getImageData(0, 0, sw, sh);
  const d2 = wl.data;
  for (let i = 0; i < d2.length; i += 4) {
    if (d2[i + 3] < 12) continue;
    const r = d2[i], g = d2[i + 1], b = d2[i + 2];
    const mx = Math.max(r, g, b), mn = Math.min(r, g, b);
    const sat = mx === 0 ? 0 : (mx - mn) / mx;
    if (sat < 0.25) {
      // 무채색(글자·배경) → 밝기를 반전
      const lum = (r + g + b) / 3;
      const v = 255 - lum;
      d2[i] = d2[i + 1] = d2[i + 2] = 255;
      d2[i + 3] = Math.round(d2[i + 3] * (v / 255));
    }
  }
  octx.putImageData(wl, 0, 0);
  const white = out.toDataURL("image/png");

  return {
    box: { sx, sy, sw, sh },
    teal,
    normal,
    white,
  };
}, `data:image/png;base64,${raw}`);

await browser.close();

const save = (dataUrl, file) => {
  const b64 = dataUrl.split(",")[1];
  fs.writeFileSync(path.resolve(file), Buffer.from(b64, "base64"));
  console.log("wrote:", file);
};

save(result.normal, "public/brand/int-logo.png");
save(result.white, "public/brand/int-logo-white.png");

const hex =
  "#" + result.teal.map((v) => v.toString(16).padStart(2, "0")).join("");
console.log("crop box:", result.box);
console.log("logo teal:", hex, result.teal);
