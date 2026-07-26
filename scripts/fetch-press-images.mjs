/**
 * 기사 URL에서 대표 이미지(og:image)를 받아 로컬에 저장하고 매니페스트를 만든다.
 *
 *   node scripts/fetch-press-images.mjs
 *
 * 산출물
 *   public/press/auto/<host>-<hash>.<ext>            내려받은 이미지
 *   src/entities/press/model/press-images.generated.ts  URL → 로컬 경로 매핑
 *
 * ⚠️ 빌드 때 네트워크를 쓰지 않는다. 이 스크립트는 **사람이 돌리는 도구**이고,
 * 산출물(이미지 + 매니페스트)을 커밋해 둔다. 기사를 추가한 뒤 한 번 돌리면 된다.
 *
 * ⚠️ 원격 URL을 next/image에 그대로 물리지 않는다. 남의 CDN 주소는 예고 없이 바뀌거나
 * 핫링크가 막히고, 도메인마다 remotePatterns를 열어 줘야 한다. 받아서 우리가 서빙한다.
 *
 * ⚠️ 언론사 CDN은 Referer가 없으면 403을 주는 곳이 많다. 기사 주소를 Referer로 보낸다.
 */
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

const PRESS_MODEL = path.resolve("src/entities/press/model/press.ts");
const OUT_DIR = path.resolve("public/press/auto");
const MANIFEST = path.resolve(
  "src/entities/press/model/press-images.generated.ts"
);

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0 Safari/537.36";

/**
 * press.ts에서 기사 항목을 뽑아낸다.
 * .ts를 node가 직접 import할 수 없어서 파일을 읽어 정규식으로 긁는다.
 * (목록의 단일 진실 공급원은 계속 press.ts다 — 여기에 목록을 복제하지 않는다)
 *
 * `image:`가 이미 적힌 항목은 **건너뛴다.** 수동 사진이 매니페스트를 이기므로
 * 받아도 쓰이지 않고 저장소만 무거워진다.
 */
function readArticles() {
  const src = fs.readFileSync(PRESS_MODEL, "utf8");
  const blocks = src.match(/\{[^{}]*url:\s*"https?:\/\/[^{}]*\}/g) ?? [];
  const seen = new Set();
  const out = [];
  for (const block of blocks) {
    const url = block.match(/url:\s*"(https?:\/\/[^"]+)"/)?.[1];
    if (!url || seen.has(url)) continue;
    seen.add(url);
    out.push({
      url,
      date: block.match(/date:\s*"(\d{4})-(\d{2})-(\d{2})"/)?.slice(1).join("") ?? "",
      hasManualImage: /\bimage:\s*"/.test(block),
    });
  }
  return out;
}

/** HTML에서 대표 이미지 후보를 순서대로 찾는다 */
function findMetaImage(html) {
  const keys = [
    "og:image:secure_url",
    "og:image:url",
    "og:image",
    "twitter:image:src",
    "twitter:image",
  ];
  for (const key of keys) {
    // property/name 순서와 따옴표 종류가 매체마다 달라서 양방향으로 본다.
    const patterns = [
      new RegExp(
        `<meta[^>]+(?:property|name)=["']${key}["'][^>]+content=["']([^"']+)["']`,
        "i"
      ),
      new RegExp(
        `<meta[^>]+content=["']([^"']+)["'][^>]+(?:property|name)=["']${key}["']`,
        "i"
      ),
    ];
    for (const re of patterns) {
      const m = html.match(re);
      if (m?.[1]) return { url: m[1], key };
    }
  }
  return null;
}

const EXT_BY_TYPE = {
  "image/jpeg": ".jpg",
  "image/jpg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
  "image/avif": ".avif",
  "image/gif": ".gif",
};

function extFor(contentType, urlStr) {
  const byType = EXT_BY_TYPE[(contentType ?? "").split(";")[0].trim().toLowerCase()];
  if (byType) return byType;
  const fromPath = path.extname(new URL(urlStr).pathname).toLowerCase();
  return EXT_BY_TYPE[`image/${fromPath.slice(1)}`] ? fromPath : ".jpg";
}

/**
 * 파일명은 `<매체>-<발행일>` — 사람이 보고 어느 기사인지 알 수 있어야 한다.
 * 같은 매체·같은 날 기사가 겹칠 때만 짧은 해시를 덧붙인다.
 */
function slugFor(articleUrl, date) {
  const host = new URL(articleUrl).hostname
    .replace(/^www\./, "")
    .replace(/\..*$/, "")
    .replace(/[^a-z0-9-]/gi, "");
  const base = date ? `${host}-${date}` : host;
  const taken = slugFor.taken ?? (slugFor.taken = new Set());
  if (!taken.has(base)) {
    taken.add(base);
    return base;
  }
  const hash = crypto.createHash("sha1").update(articleUrl).digest("hex").slice(0, 6);
  return `${base}-${hash}`;
}

fs.mkdirSync(OUT_DIR, { recursive: true });

const articles = readArticles();
const targets = articles.filter((a) => !a.hasManualImage);
const skipped = articles.length - targets.length;
console.log(
  `기사 ${articles.length}건 중 ${targets.length}건에서 대표 이미지를 찾는다` +
    (skipped ? ` (수동 사진이 있는 ${skipped}건은 건너뜀)` : "") +
    "\n"
);

const manifest = {};
const rows = [];

for (const { url: articleUrl, date } of targets) {
  const row = { 기사: new URL(articleUrl).hostname.replace(/^www\./, "") };
  try {
    const res = await fetch(articleUrl, {
      headers: { "user-agent": UA, accept: "text/html,*/*" },
      redirect: "follow",
      signal: AbortSignal.timeout(25000),
    });
    if (!res.ok) throw new Error(`기사 HTTP ${res.status}`);
    const html = await res.text();

    const found = findMetaImage(html);
    if (!found) throw new Error("메타 이미지 없음");

    const imgUrl = new URL(found.url, articleUrl).toString();
    const imgRes = await fetch(imgUrl, {
      headers: { "user-agent": UA, referer: articleUrl, accept: "image/*" },
      redirect: "follow",
      signal: AbortSignal.timeout(25000),
    });
    if (!imgRes.ok) throw new Error(`이미지 HTTP ${imgRes.status}`);

    const buf = Buffer.from(await imgRes.arrayBuffer());
    if (buf.byteLength < 2048) throw new Error(`너무 작음 ${buf.byteLength}B`);

    const ext = extFor(imgRes.headers.get("content-type"), imgUrl);
    const file = `${slugFor(articleUrl, date)}${ext}`;
    fs.writeFileSync(path.join(OUT_DIR, file), buf);

    manifest[articleUrl] = `/press/auto/${file}`;
    row.메타 = found.key;
    row.파일 = file;
    row.크기 = `${Math.round(buf.byteLength / 1024)}KB`;
    row.결과 = "OK";
  } catch (e) {
    row.결과 = `실패 — ${e.message}`;
  }
  rows.push(row);
}

console.table(rows);

const body = `/**
 * 자동 생성 파일 — 직접 고치지 않는다.
 * \`node scripts/fetch-press-images.mjs\`가 기사 URL의 og:image를 받아 만든 매핑이다.
 *
 * 기사를 추가하거나 이미지가 바뀌었으면 그 스크립트를 다시 돌린다.
 * press.ts의 \`image\`를 직접 적으면 그 값이 이 매핑을 이긴다(수동 우선).
 */
export const pressImagesByUrl: Readonly<Record<string, string>> = ${JSON.stringify(
  manifest,
  null,
  2
)};
`;
fs.writeFileSync(MANIFEST, body);

const ok = rows.filter((r) => r.결과 === "OK").length;
console.log(`\n받은 이미지 ${ok}/${targets.length}건`);
console.log(`매니페스트: ${path.relative(process.cwd(), MANIFEST)}`);
if (ok < targets.length) {
  console.log(
    "실패한 건은 매니페스트에서 빠진다 — 화면에서는 브랜드 그라디언트 패널로 대체된다."
  );
}
