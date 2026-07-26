/**
 * 모바일 레이아웃 자동 점검.
 *
 *   pnpm build && (PORT=3100) pnpm start
 *   node scripts/mobile-audit.mjs                 # 기본 390px
 *   node scripts/mobile-audit.mjs 360 http://localhost:3100
 *
 * 왜 스크린샷이 아니라 측정인가
 *   모바일 문제는 대부분 **눈으로 안 보인다.** 가로 스크롤 3px, 8px로 찍힌 SVG 글자,
 *   38px짜리 탭 영역은 스크린샷을 아무리 봐도 "좀 작네" 정도로만 읽힌다.
 *   숫자로 뽑아야 고칠 목록이 된다.
 *
 * 무엇을 잡아내나
 *   1) 가로 스크롤 — 문서가 뷰포트보다 넓은가, 넓다면 **어느 요소가** 넘치는가
 *   2) 작은 글자 — 렌더된 font-size가 최소치(17px) 미만인 텍스트. SVG <text> 포함.
 *      ⚠️ SVG는 viewBox 축소 배율까지 곱해 **실제 화면 크기**로 환산한다.
 *        `text-[15px]`라고 적혀 있어도 0.5배로 그려지면 7.5px다.
 *   3) 작은 탭 영역 — a/button의 실제 렌더 크기가 44×44 미만
 *   4) 화면을 벗어나는 요소 — 오른쪽 경계를 넘는 박스
 *
 * 결과는 라우트별 표로 찍힌다. 종료 코드는 항상 0이다(CI 게이트가 아니라 작업 목록).
 */
import puppeteer from "puppeteer-core";

const CHROME =
  process.env.CHROME_PATH ??
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

const WIDTH = Number(process.argv[2] ?? 390);
const ORIGIN = process.argv[3] ?? "http://localhost:3100";

/** 프로젝트 규약: 타이포 최소 17px (globals.css의 @theme) */
const MIN_FONT = 17;
/** 손가락 최소 타깃 */
const MIN_TAP = 44;

const ROUTES = [
  "/",
  "/products",
  "/products/buildai",
  "/products/turing",
  "/about/greeting",
  "/about/history",
  "/about/team",
  "/about/location",
  "/careers",
  "/careers/jobs",
  "/press",
  "/contact",
];

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "new",
  args: [
    "--no-sandbox",
    "--disable-dev-shm-usage",
    "--hide-scrollbars",
    "--use-gl=angle",
    "--use-angle=swiftshader",
    "--enable-unsafe-swiftshader",
  ],
});

let total = 0;

for (const route of ROUTES) {
  const page = await browser.newPage();
  await page.setViewport({
    width: WIDTH,
    height: 844,
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
  });

  try {
    await page.goto(ORIGIN + route, {
      waitUntil: "networkidle2",
      timeout: 60000,
    });
  } catch {
    await page.goto(ORIGIN + route, {
      waitUntil: "domcontentloaded",
      timeout: 60000,
    });
  }

  const found = await page.evaluate(
    (minFont, minTap, vw) => {
      const out = [];
      /** 요소를 사람이 알아볼 수 있게 찍는다 */
      const label = (el) => {
        const cls = (el.getAttribute?.("class") ?? "")
          .split(/\s+/)
          .filter(Boolean)
          .slice(0, 3)
          .join(".");
        const text = (el.textContent ?? "").trim().replace(/\s+/g, " ");
        return `${el.tagName.toLowerCase()}${cls ? "." + cls : ""}${
          text ? ` — “${text.slice(0, 28)}”` : ""
        }`;
      };

      // 1) 가로 스크롤
      const docW = document.documentElement.scrollWidth;
      if (docW > vw + 1) {
        out.push({
          종류: "가로 스크롤",
          값: `문서 ${docW}px > 뷰포트 ${vw}px`,
          요소: "document",
        });
      }

      // 2) 화면 오른쪽을 넘는 요소
      for (const el of document.querySelectorAll("body *")) {
        const s = getComputedStyle(el);
        if (s.position === "fixed" || s.display === "none") continue;
        // 장식용 블롭은 일부러 화면 밖으로 나간다(부모가 clip 한다)
        if (el.getAttribute("aria-hidden") === "true") continue;
        const r = el.getBoundingClientRect();
        if (r.width === 0 || r.height === 0) continue;
        if (r.right > vw + 1 || r.left < -1) {
          out.push({
            종류: "화면 밖",
            값: `left ${Math.round(r.left)} / right ${Math.round(r.right)}`,
            요소: label(el),
          });
        }
      }

      // 3) 작은 글자 — HTML
      const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT
      );
      const seen = new Set();
      for (let n = walker.nextNode(); n; n = walker.nextNode()) {
        if (!n.nodeValue?.trim()) continue;
        const el = n.parentElement;
        if (!el || seen.has(el)) continue;
        seen.add(el);
        const s = getComputedStyle(el);
        if (s.display === "none" || s.visibility === "hidden") continue;
        const size = parseFloat(s.fontSize);
        if (size < minFont - 0.01) {
          out.push({
            종류: "작은 글자",
            값: `${size.toFixed(1)}px`,
            요소: label(el),
          });
        }
      }

      // 4) 작은 글자 — SVG (viewBox 축소 배율까지 곱한다)
      for (const svg of document.querySelectorAll("svg")) {
        const box = svg.viewBox?.baseVal;
        const r = svg.getBoundingClientRect();
        if (!box || !box.width || !r.width) continue;
        const scale = r.width / box.width;
        for (const t of svg.querySelectorAll("text")) {
          const size = parseFloat(getComputedStyle(t).fontSize) * scale;
          if (size < minFont - 0.01) {
            out.push({
              종류: "SVG 글자",
              값: `${size.toFixed(1)}px (배율 ${scale.toFixed(2)})`,
              요소: `text — “${(t.textContent ?? "").trim().slice(0, 24)}”`,
            });
          }
        }
      }

      // 5) 작은 탭 영역
      for (const el of document.querySelectorAll("a, button")) {
        const s = getComputedStyle(el);
        if (s.display === "none" || s.visibility === "hidden") continue;
        const r = el.getBoundingClientRect();
        if (r.width === 0 || r.height === 0) continue;
        // 본문 안에 인라인으로 섞인 링크는 대상이 아니다
        if (s.display === "inline") continue;
        // 스크린리더 전용(스킵 링크)은 포커스 전에는 1×1이다 — 손가락 대상이 아니다
        if (r.width <= 1 && r.height <= 1) continue;
        if (r.height < minTap - 0.01 || r.width < minTap - 0.01) {
          out.push({
            종류: "작은 탭",
            값: `${Math.round(r.width)}×${Math.round(r.height)}`,
            요소: label(el),
          });
        }
      }

      return out;
    },
    MIN_FONT,
    MIN_TAP,
    WIDTH
  );

  await page.close();

  // 같은 컴포넌트가 반복되면 목록이 의미 없이 길어진다 — 종류+값+요소로 접는다
  const rolled = new Map();
  for (const f of found) {
    const key = `${f.종류}|${f.값}|${f.요소}`;
    rolled.set(key, (rolled.get(key) ?? 0) + 1);
  }
  const rows = [...rolled.entries()].map(([k, n]) => {
    const [종류, 값, 요소] = k.split("|");
    return { 종류, 값, 요소, 개수: n };
  });

  total += rows.length;
  console.log(`\n■ ${route}  (${WIDTH}px)  — ${rows.length}건`);
  if (rows.length) console.table(rows);
}

await browser.close();
console.log(`\n합계 ${total}건 (${WIDTH}px)`);
