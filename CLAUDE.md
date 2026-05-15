@AGENTS.md

# int. 기업 홈페이지

(주)인트(Int Corp.)의 공식 기업 홈페이지 프로젝트.

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
- Clearbit Logo API (`logo.clearbit.com`) — 고객사 로고

## 브랜드 규약
- 워드마크는 **`<BrandMark label="int|turing" />`** 컴포넌트로만 표현. 폰트 Pretendard 900(Black), `letter-spacing: -0.055em`, 마침표는 민트(`--color-mint`).
- 색상은 `globals.css`의 mint 스케일을 사용. 임의 hex 컬러 금지.

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
- `/about` 회사 개요
  - `/about/history` 연혁
  - `/about/location` 오시는 길 (Kakao Map)
  - `/about/ceo` CEO 프로필 (모노그램 placeholder — 사진은 추후 교체)
  - `/about/careers` 채용 안내 (메일 지원)
- `/turing` 제품
- `/clients` 고객사
- `/partners` 관계사
- `/insights` 인사이트/기사
- `/contact` 문의

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
