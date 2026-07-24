/**
 * 웹폰트가 실제로 적용되고 있는지 확인한다.
 * @font-face가 실패해 시스템 폰트로 폴백되면 사이트 전체가 싸구려로 보이는데,
 * 코드만 봐서는 알 수 없다.
 *
 *   pnpm start
 *   node scripts/font-check.mjs
 */
import puppeteer from "puppeteer-core";

const CHROME =
  process.env.CHROME_PATH ??
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const URL = process.env.CHECK_URL ?? "http://localhost:3000";

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "new",
  args: ["--no-sandbox"],
});
const page = await browser.newPage();
await page.goto(URL, { waitUntil: "networkidle2" });

const report = await page.evaluate(async () => {
  await document.fonts.ready;

  const measure = (family, weight = 500) => {
    const s = document.createElement("span");
    s.textContent = "AI는 배포한 다음 날부터 조용히 나빠집니다";
    s.style.cssText = `position:absolute;visibility:hidden;white-space:nowrap;font-size:48px;font-weight:${weight};font-family:${family}`;
    document.body.appendChild(s);
    const w = s.getBoundingClientRect().width;
    s.remove();
    return Math.round(w);
  };

  const h1 = document.querySelector("h1");
  const cs = h1 ? getComputedStyle(h1) : null;

  return {
    faces: [...document.fonts].map((f) => ({
      family: f.family,
      status: f.status,
      weight: f.weight,
    })),
    h1FontFamily: cs?.fontFamily ?? null,
    h1FontWeight: cs?.fontWeight ?? null,
    width: {
      siteStack: cs ? measure(cs.fontFamily) : null,
      malgun: measure('"Malgun Gothic"'),
      systemUi: measure("system-ui"),
      serif: measure("serif"),
    },
  };
});

await browser.close();

const { width } = report;
const usingWebfont =
  width.siteStack !== width.malgun && width.siteStack !== width.systemUi;

console.log(JSON.stringify(report, null, 2));
console.log(
  usingWebfont
    ? "\n✅ 웹폰트가 적용되고 있다 (시스템 폰트와 렌더 폭이 다름)"
    : "\n❌ 시스템 폰트로 폴백됐다 — @font-face 로딩 실패"
);
