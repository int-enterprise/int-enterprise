/**
 * 디자인 확인용 스크린샷 도구.
 *
 * 이 사이트를 눈으로 보지 않고 고치면 반드시 헛돈다.
 * 레이아웃을 만졌으면 빌드 후 이 스크립트로 실제 화면을 찍어 확인한다.
 *
 *   pnpm build && pnpm start
 *   node scripts/screenshot.mjs '[{"name":"fold","url":"http://localhost:3000"}]'
 *   node scripts/screenshot.mjs '[{"name":"all","url":"http://localhost:3000","full":true}]'
 *
 * 옵션: w/h(뷰포트) · full(전체 페이지) · clip{x,y,width,height} · wait(ms) · scroll(px)
 *
 * `scroll`은 히어로처럼 **스크롤에 따라 변하는 구간**을 확인할 때 쓴다.
 * 촬영 직전 그 위치로 내려가서 찍는다(핀이 걸린 상태를 봐야 하기 때문).
 *
 * ⚠️ lazy 이미지를 강제로 로드시킨 뒤 촬영한다.
 *    이 처리가 없으면 화면 밖 이미지가 빈 박스로 찍혀 멀쩡한 레이아웃을 버그로 오진한다.
 *
 * 결과물은 .screenshots/ 에 저장된다(git 무시).
 * 브라우저 경로는 환경변수 CHROME_PATH로 덮어쓸 수 있다.
 */
import puppeteer from "puppeteer-core";
import fs from "node:fs";
import path from "node:path";

const CHROME =
  process.env.CHROME_PATH ??
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const OUT = process.env.SHOT_OUT ?? path.resolve(".screenshots");

fs.mkdirSync(OUT, { recursive: true });

const targets = JSON.parse(process.argv[2] ?? "[]");
if (targets.length === 0) {
  console.error(
    '사용법: node scripts/screenshot.mjs \'[{"name":"fold","url":"http://localhost:3000"}]\''
  );
  process.exit(1);
}

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "new",
  args: [
    "--no-sandbox",
    "--disable-dev-shm-usage",
    "--hide-scrollbars",
    // WebGL 콘텐츠(Spline 3D 씬)를 헤드리스에서도 렌더시킨다.
    // 이 플래그가 없으면 캔버스가 비어 나와 "씬이 안 뜬다"고 오진하게 된다.
    "--use-gl=angle",
    "--use-angle=swiftshader",
    "--enable-unsafe-swiftshader",
    "--enable-webgl",
    "--ignore-gpu-blocklist",
  ],
});

for (const t of targets) {
  const page = await browser.newPage();
  await page.setViewport({
    width: t.w ?? 1440,
    height: t.h ?? 900,
    deviceScaleFactor: 1,
  });

  try {
    await page.goto(t.url, { waitUntil: "networkidle2", timeout: 60000 });
  } catch {
    await page.goto(t.url, { waitUntil: "domcontentloaded", timeout: 60000 });
  }

  // lazy 이미지 강제 로드 — 끝까지 스크롤한 뒤 맨 위로 돌아온다.
  await page.evaluate(async () => {
    document.querySelectorAll("img").forEach((img) => {
      img.loading = "eager";
      img.setAttribute("fetchpriority", "high");
    });
    await new Promise((res) => {
      let y = 0;
      const step = () => {
        window.scrollTo(0, y);
        y += 600;
        if (y < document.body.scrollHeight + 900) setTimeout(step, 40);
        else {
          window.scrollTo(0, 0);
          res();
        }
      };
      step();
    });
  });

  await page.evaluate(() =>
    Promise.all(
      Array.from(document.images)
        .filter((i) => !i.complete)
        .map((i) => new Promise((r) => (i.onload = i.onerror = r)))
    )
  );

  if (t.scroll) {
    await page.evaluate((y) => window.scrollTo(0, y), t.scroll);
    // 스크롤 구동 애니메이션(3D lerp)이 목표값에 닿을 시간을 준다
    await new Promise((r) => setTimeout(r, 1200));
  }

  await new Promise((r) => setTimeout(r, t.wait ?? 1500));

  const file = path.join(OUT, `${t.name}.png`);
  if (t.clip) await page.screenshot({ path: file, clip: t.clip });
  else if (t.full) await page.screenshot({ path: file, fullPage: true });
  else await page.screenshot({ path: file });

  console.log("shot:", t.name, "→", file);
  await page.close();
}

await browser.close();
