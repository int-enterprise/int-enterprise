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
- **컬러**: 가이드라인 팔레트(Gray / Navy / Teal)와 시맨틱 토큰만. 임의 hex 금지. Tailwind 기본 팔레트는 `--color-*: initial`로 비웠다.
- **Teal(`#40E0D0`)은 도형·아이콘·채움·3D 하이라이트 전용.** 흰 배경 위 텍스트 색으로 쓰지 않는다(대비 1.8:1, WCAG 미달). 강조 텍스트·링크는 `text-link`(Navy 30).
- **토큰 정의 위치**: 모든 값은 `src/app/globals.css`의 `@theme` 블록. 컴포넌트는 변수만 참조.
- **워드마크**: `<BrandMark />` 컴포넌트로만. 로고는 Pretendard가 아니라 별도 지오메트릭 워드마크 이미지(`public/brand/int-logo.png`)다. CSS로 글자를 그려 대신하지 않는다.

### 3D 히어로
- `@react-three/fiber` + `drei`로 직접 구현(Spline 미사용). 씬은 `src/widgets/hero/ui/hero-canvas.tsx`.
- 클라이언트 전용·지연 로드, `prefers-reduced-motion`이면 로드 안 함. 도형은 Navy+Teal 브랜드 색만.

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

## 라우트
- `/` 랜딩
- `/services` 기업용 AI 구축 — 세 오퍼링 · 협업 방식 · 수행 과제
- `/turing` 제품 — 문제 정의 · 5개 Agent 루프 · AI Harness
- `/about` 회사 — 원칙 · 연혁 · 대표 · 파트너 · 오시는 길 (앵커: `#principles` `#history` `#founder` `#partners` `#press` `#location`)
- `/careers` 채용
- `/contact` 문의
- `/privacy` `/terms` `/delete-account` — **보존 대상**

구 IA에서 사라진 주소(`/about/history` `/about/location` `/about/ceo` `/about/careers` `/clients` `/partners` `/insights`)는
`next.config.ts`의 `redirects()`가 308로 처리한다.

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
