@AGENTS.md
@docs/brand-guideline.md

# int. 기업 홈페이지

(주)인트(Int Corp.)의 공식 기업 홈페이지 프로젝트.

## 회사 이해
**[docs/company-profile.md](docs/company-profile.md)** — 사업 구조, 튜링 제품 상세, 레퍼런스, 시장, 채용.
카피를 쓰거나 페이지 구조를 바꾸기 전에 읽는다.

> 인트는 **TIPS 회사가 아니다.** TIPS는 튜링이라는 하나의 솔루션으로 나간 R&D 과제이고,
> 회사의 본체는 3년간 매출을 만들어 온 기업용 AI 통합구축 사업이다.

## 회사 기본 정보
- 회사명: 주식회사 인트 / (주)인트 / Int Corp.
- **브랜드명의 뜻: `int.` = intelligent new technologies** (`company.brandMeaning`)
  - **전부 소문자로 적는다.** 대문자로 쓰지 않는다.
  - **노출은 랜딩 히어로 한 곳뿐.** 푸터·하위 페이지·인사말로 퍼뜨리지 않는다(반복되면 과하다).
    메타데이터·JSON-LD 같은 기계용 식별 정보에는 남겨 둔다.
- 설립: 2026.04.23
- 대표: 박현규 (Founder & CEO)
- 사업자등록번호: 158-88-03793
- 법인등록번호: 1101110-956986
- 주소: 서울특별시 마포구 서강대길 22 2층 6호
- 대표전화: 0507-1336-0775
- 이메일: info@intcorp.ai

## 기술 스택
- Next.js 16 App Router + Turbopack (Node 25)
- TypeScript strict
- Tailwind v4 (`@theme` 토큰, PostCSS plugin)
- shadcn/ui 패턴 (CLI 없이 직접 작성, `class-variance-authority`)
- TanStack Query v5
- motion (필요 시 — 현재 마퀴는 CSS keyframe)
- react-hook-form **7.54.2** + zod (7.75은 d.ts 깨짐, 다운그레이드 고정)
- lucide-react
- **Pretendard Variable** (next/font/local로 self-host)
- Kakao Maps JavaScript SDK (`NEXT_PUBLIC_KAKAO_MAPS_KEY`)
- 고객사 로고는 `public/clients/`에 직접 보관. 외부 로고 API를 쓰지 않는다.

> Astryx(`@astryxdesign/*`) 의존은 제거했다. 디자인 시스템은 Tailwind v4 `@theme` 토큰 +
> `src/shared/ui`의 자체 프리미티브로 단일화되어 있다. 다시 도입하지 않는다.

## 디자인 규약 (필수)

디자인 SSOT는 **두 문서**다. 색·간격 작업 전에 둘 다 따른다.
1. **[docs/brand-guideline.md](docs/brand-guideline.md)** — 색 팔레트·타이포 스케일의 값.
2. **[docs/spline-style-design.md](docs/spline-style-design.md)** — 스타일 방향(Spline 스타일 스킬). 레이아웃·시각요소·모션의 지침.

### 스킬 핵심 (docs/spline-style-design.md)
- **여백 80% : 시각요소 20%.** 화면 대부분은 절제, 나머지가 시선을 강하게 붙잡는다.
- **모든 주요 섹션에 시각 요소 필수.** 텍스트만으로 섹션을 채우지 않는다(3D·이미지·그라디언트 블롭·콘솔 화면·글래스/그라디언트 카드·큰 모노 숫자 중 하나).
- **헤딩은 Bold(700) + 자간 좁게(-0.025em).** 본문은 가볍게(`font-light`) + 넉넉한 줄간격. 개성은 헤딩에서.
- **포인트 컬러 1개(Teal)만 절제해서.** 강조 텍스트·버튼은 Navy. 그라디언트는 블롭·3D 표면·패널 배경에만(텍스트 위 금지).
- **소프트 섀도우 + 하이라이트로 입체.** 모서리 12~24px(`radius-sm/md/lg`). pill과 각진 것 혼용.
- **모션은 전부 ease-out, bounce 금지.** 블롭은 천천히 떠다니고(8~18s), hover는 살짝 떠오름.
- **비대칭 레이아웃.** 히어로는 텍스트 좌 / 3D 우.

### 토큰·값
- **타이포 최소 17px.** 라벨·캡션·메타까지 그 아래로 내려가지 않는다. Tailwind 기본 스케일을
  `globals.css`의 `@theme`에서 덮어썼다(`text-xs` = 1.0625rem, `text-sm` = 1.125rem, `text-base` = 1.1875rem).
  따라서 `text-xs`는 "가장 작은 글자"라는 뜻이고 12px이 아니다. **임의 크기(`text-[13px]`, `text-[0.95rem]`)를 새로 만들지 않는다.**
- **컬러**: 가이드라인 팔레트(Gray / Navy / Teal)와 시맨틱 토큰만. 임의 hex 금지. Tailwind 기본 팔레트는 `--color-*: initial`로 비웠다.
- **Teal(`#40E0D0`)은 도형·아이콘·채움·3D 하이라이트 전용.** 흰 배경 위 텍스트 색으로 쓰지 않는다(대비 1.8:1, WCAG 미달). 강조 텍스트·링크는 `text-link`(Navy 30).
- **토큰 정의 위치**: 모든 값은 `src/app/globals.css`의 `@theme` 블록. 컴포넌트는 변수만 참조.
- **워드마크**: `<BrandMark />` 컴포넌트로만. 로고는 Pretendard가 아니라 별도 지오메트릭 워드마크 이미지(`public/brand/int-logo.png`)다. CSS로 글자를 그려 대신하지 않는다.

### 히어로 — 3열 구성 + 가운데 3D
랜딩 히어로는 **좌(워드마크·브랜드 뜻) / 중앙(3D 오브젝트) / 우(슬로건·버튼)** 3열이다.
흰 여백을 넓게 두고 활자는 조용하게, 시각 요소는 가운데 3D 하나로 몬다.

- `@react-three/fiber` + `drei`로 직접 구현(Spline 미사용). 씬은 `src/widgets/hero/ui/hero-canvas.tsx`.
- 클라이언트 전용·지연 로드(`hero-scene.tsx`), `prefers-reduced-motion`이면 로드 안 함. 도형은 Navy+Teal 브랜드 색만.
- **씬 좌표는 원점 기준 좌우 균형이 맞아야 한다(x 대략 −2.1~2.1).** 3D가 배경이 아니라
  가운데 칸의 주인공이기 때문이다. 예전 우측 패널 시절의 우편향 좌표(x 0.6~4.9)로 되돌리지 않는다.
- **라인아트로 대체하지 않는다.** 회로 나무 SVG(`hero-circuit.tsx`)로 바꿔 본 적이 있으나 되돌렸다.
  레퍼런스 사이트를 닮게 그리는 방향은 채택하지 않는다.

### 디자인 확인 도구 (눈으로 보고 고친다)
- 코드만 보고 디자인하지 않는다. 레이아웃을 만지면 `scripts/screenshot.mjs`로 실제 화면을 찍어 확인한다.
- `pnpm build && (PORT=3100) pnpm start` 후 `node scripts/screenshot.mjs '[{"name":"x","url":"http://localhost:3100"}]'`. 결과는 `.screenshots/`(git 무시).
- 서버 인스턴스가 충돌하면 stale/unstyled 화면이 나온다. 포트를 확실히 비우고 단일 서버로 띄운 뒤 CSS 링크가 200인지 확인한다.

## 아키텍처: Feature-Sliced Design

레이어는 위에서 아래로만 의존한다. 같은 레이어 안 슬라이스끼리 직접 import 하지 않는다.

```
src/
  app/        ← Next.js 라우트/페이지 조립만. 비즈니스 로직 X.
  widgets/    ← 페이지 단위 큰 블록 (Header, Hero, AboutOverview, Footer 등)
  features/   ← 사용자 인터랙션 단위 (contact-form, logo-marquee, map)
  entities/   ← 도메인 모델 + 표시 카드 (company, client, article, product)
  shared/     ← UI 프리미티브, 유틸, 설정, 자산, 프로바이더, SEO 헬퍼
```

## 탭 구조 (3탭)
헤더 탭은 셋이다. 하위 항목의 단일 진실 공급원은 `src/shared/config/site.ts`의 `navItems`.

| 탭 | 경로 | 하위 |
|---|---|---|
| 기업소개 | `/about` | 인사말 `#greeting` · 기업연혁 `#history` · 팀 `#team` · 오시는 길 `#location` |
| 제품소개 | `/products` | `buildAI.` `/products/buildai` · `turing.` `/products/turing` |
| 인재채용 | `/careers` | — |

CTA는 **도입 문의**(`/contact`).

## 라우트
- `/` 랜딩 — **담백하게.** 슬로건 하나 + 버튼(도입 문의·인재채용) + 두 BM 요약 + 고객사 + 파트너십 + 기사 + 문의
- `/products` 제품소개 개요
- `/products/buildai` 기업용 AI 구축 — 세 오퍼링 · 협업 방식 · 수행 과제
- `/products/turing` AI 운영 자동화 — 문제 정의 · 5개 Agent 루프 · AI Harness
- `/about` 기업소개 — 인사말 · 기업연혁 · 팀 · 오시는 길
- `/careers/jobs` 채용 공고 — **`/careers`를 거쳐 들어온다.** 헤더 메뉴에 직접 걸지 않는다
- `/careers` 인재채용
- `/press` 보도·기고
- `/contact` 문의
- `/privacy` `/terms` `/delete-account` — **보존 대상**

사라진 주소(`/services` `/turing` `/about/history` `/about/location` `/about/ceo` `/about/careers`
`/clients` `/partners` `/insights`)는 `next.config.ts`의 `redirects()`가 308로 처리한다.

## 제품 표기 규칙
사업(BM)은 둘이고 각각 제품 브랜드를 가진다. 정의는 `src/entities/product/model/brands.ts`.

- **`buildAI.`** — 기업용 AI 구축 (캐시카우 + 주력 구축)
- **`turing.`** — AI 운영 자동화 (주력 제품)

"buildai." "Buildai" "BuildAi" "Turing"처럼 쓰지 않는다. 화면·메타데이터·문서 전부 `buildAI.` `turing.`.

### 워드마크 조판은 `<ProductMark />`로만
제품명을 화면에 적을 때 문자열로 박지 않는다. `src/shared/ui/product-mark.tsx`가 규칙을 갖고 있다.

- **가장 두꺼운 웨이트** — Pretendard Variable을 45~920으로 실었으므로 `font-[920]`(900이 아니다).
- **마침표는 Accent(Teal)** — 브랜드 가이드라인의 로고 규칙(글자 + 틸 점).
- **자간을 조금 좁게** — `-0.035em`.

⚠️ 이것이 "흰 배경 위 Teal 텍스트 금지" 규칙의 **유일한 예외**다.
마침표는 읽는 글자가 아니라 브랜드 마크의 일부다. 본문·링크에 Teal을 쓰는 근거로 삼지 않는다.
메타데이터·설명문 같은 순수 문자열에는 마크를 적용할 수 없으니 표기만 맞춘다.

## 랜딩에 넣지 않는 것
랜딩이 turing. 소개서처럼 읽히면 사업이 두 개인 회사를 잘못 그린 것이다.
성능열화 6개 축, 5개 Agent 루프, 수행 과제 마퀴, 강점 카드는 **제품 페이지의 몫**이다.

## 고객사 노출은 랜딩(`/`) 한 곳뿐
고객사 이름과 로고는 **랜딩의 로고 월(`/#logos`)에서만** 보여 준다.
제품 페이지·기업소개·채용 어디에도 고객사 이름을 적지 않는다. 이미지도 마찬가지다.

- 데이터(`entities/client`의 `clients` `references`, `service`의 `proof`/`example`)는 사실 기록이라 남겨 두되 **렌더하지 않는다.**
- 실적을 말해야 하면 유형으로 적는다 — "국내 대형 IT 서비스 기업", "국책 연구기관", "국내 1위 웹툰 제작사".
- 팀원 약력의 회사명은 개인 경력이라 이 규칙과 별개다.

## 자산 위치
- `public/` 에는 **실제로 서빙하는 파일만** 둔다. 파일명은 영문 슬러그(한글·공백 금지).
  - `public/clients/<slug>.png|svg` · `public/press/<매체>-<YYYYMMDD>.<ext>` · `public/about/team/<slug>.png`
  - `public/products/turing-console.png` · `public/careers/<slot>.jpg` · `public/brand/`
- 전달받은 **원본은 `assets/raw/`** 에 둔다(서빙하지 않음). 스크립트가 여기서 읽어 `public/`으로 산출한다.

## 섹션 라벨(Eyebrow)
알약 + 틸 점 + 그림자 조합을 쓰지 않는다. 어느 사이트에나 있는 모양이라 브랜드가 없어 보인다.
**자간 넓은 대문자 한 줄**만 쓴다(`shared/ui`의 `Eyebrow`). 안에 제품 워드마크를 넣을 때는
`ProductMark`가 `normal-case`를 갖고 있어야 `buildAI.`가 대문자로 뭉개지지 않는다.

## 서강대 언급은 한 곳뿐
서강대학교 연구실에서 출발했다는 서사는 `/about#team`의 설명 **한 문장**에서만 말한다.
히어로·고지 바·보도 섹션·메타데이터·키워드로 옮겨 쓰지 않는다.
(주소의 "서강대길", 교통편의 "서강대역"은 주소 정보라 예외다)

## 절대 건드리면 안 되는 것
- `/delete-account` — Apple App Store 심사가 참조하는 계정 삭제 안내(Donky Note). 경로·문구 유지.
- `/privacy` `/terms` — 앱·스토어가 링크하는 법적 고지. 경로 유지.
- `siteConfig.googleSiteVerification` — Google Search Console 인증 토큰. 지우면 인증이 풀린다. (로고는 이제 이미지라 마침표와의 커플링은 없어졌지만, 인증 토큰 자체는 그대로 보존한다.)
- 루트 `layout.tsx`의 `metadata` 블록과 `Organization`/`WebSite` JSON-LD.

## SEO
- 루트 `layout.tsx`에 `Organization` + `WebSite` JSON-LD 항상 주입.
- 페이지마다 `buildMetadata({ ... })`로 canonical / OG / 키워드 개별 지정.
- `BreadcrumbJsonLd`로 페이지별 브레드크럼 구조화.
- `app/sitemap.ts`, `app/robots.ts` 자동 생성.

## 코드 규칙
- 단일 책임 원칙(SRP). 한 파일은 한 역할만.
- 한 파일 200줄 이내 목표. 넘어가면 분리.
- Server Component를 기본으로, `"use client"`는 정말 필요한 곳에만.
- 데이터/타입은 `entities/`에 두고, 뷰는 그것을 소비한다.
- shadcn 스타일 프리미티브는 `shared/ui/`에 둔다.

## 디렉터리별 CLAUDE.md
- [src/app/CLAUDE.md](src/app/CLAUDE.md)
- [src/widgets/CLAUDE.md](src/widgets/CLAUDE.md)
- [src/features/CLAUDE.md](src/features/CLAUDE.md)
- [src/entities/CLAUDE.md](src/entities/CLAUDE.md)
- [src/shared/CLAUDE.md](src/shared/CLAUDE.md)

## 실행
```bash
pnpm dev      # 개발 서버 (Turbopack)
pnpm build    # 프로덕션 빌드
pnpm start    # 프로덕션 실행
pnpm lint     # ESLint
```

## 환경 변수 (`.env.local`)
```
NEXT_PUBLIC_KAKAO_MAPS_KEY=...   # Kakao Developers JavaScript 키
NEXT_PUBLIC_SITE_URL=...         # 배포 URL (sitemap/metadata 용)
```
키가 없으면 지도는 정적 폴백 카드로 자동 대체된다.
