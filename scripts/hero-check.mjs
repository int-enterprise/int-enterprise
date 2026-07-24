import puppeteer from "puppeteer-core";
const CHROME =
  process.env.CHROME_PATH ??
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const URL = process.env.CHECK_URL ?? "http://localhost:3100";

const b = await puppeteer.launch({
  executablePath: CHROME,
  headless: "new",
  args: [
    "--no-sandbox",
    "--use-gl=angle",
    "--use-angle=swiftshader",
    "--enable-unsafe-swiftshader",
    "--ignore-gpu-blocklist",
  ],
});
const p = await b.newPage();
await p.setViewport({ width: 1440, height: 860 });
await p.emulateMediaFeatures([
  { name: "prefers-reduced-motion", value: "no-preference" },
]);

const errs = [];
p.on("pageerror", (e) => errs.push("[pageerror] " + e.message));
p.on("console", (m) => {
  if (m.type() === "error") errs.push("[console.error] " + m.text().slice(0, 220));
});

await p.goto(URL, { waitUntil: "domcontentloaded", timeout: 60000 });
await new Promise((r) => setTimeout(r, 16000));

const info = await p.evaluate(() => {
  const cs = [...document.querySelectorAll("canvas")].map((c) => ({
    w: c.width,
    h: c.height,
    cw: c.clientWidth,
    ch: c.clientHeight,
  }));
  const h1 = document.querySelector("h1");
  return {
    scrollY: window.scrollY,
    canvases: cs,
    h1Top: h1 ? Math.round(h1.getBoundingClientRect().top) : null,
    h1Text: h1?.textContent?.slice(0, 22),
  };
});
console.log(JSON.stringify(info, null, 2));
console.log("errors:\n" + (errs.slice(0, 10).join("\n") || "(none)"));

await p.evaluate(() => window.scrollTo(0, 0));
await new Promise((r) => setTimeout(r, 500));
await p.screenshot({ path: ".screenshots/hero-clean.png" });
console.log("shot: .screenshots/hero-clean.png");
await b.close();
