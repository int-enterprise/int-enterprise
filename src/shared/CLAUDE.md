# shared/ — 프리미티브, 유틸, 설정, 자산, SEO

도메인 비종속 코드. 가장 아래 레이어.

## 서브 폴더
- `ui/` — shadcn 패턴 UI 프리미티브 (Button, Card, Input, Textarea, Label, Section, SectionHeader, Badge, BrandMark).
- `lib/` — 유틸 (`cn`).
- `config/` — `site.ts`(브랜드/메타데이터/네비), `index.ts` 재export.
- `assets/` — 정적 자산. `fonts/PretendardVariable.woff2` 포함.
- `providers/` — 글로벌 클라이언트 프로바이더 (`QueryProvider`).
- `seo/` — JSON-LD 컴포넌트(`OrganizationJsonLd`, `WebSiteJsonLd`, `BreadcrumbJsonLd`), `buildMetadata` 헬퍼.

## 규칙
- shared는 **도메인을 모른다**. 회사명 같은 도메인 상수는 `entities/company/`에.
- shared 안에서는 자유롭게 import.
- 외부 라이브러리는 여기서 한 번 wrapping해서 노출하는 것을 선호.
- 한 파일 200줄 이내.

## BrandMark 규약
- 폰트: Pretendard Black (900) · variable font의 최대 굵기.
- 자간: `letter-spacing: -0.055em` (브랜드 로고 자간 규정 반영).
- 마침표: 민트(`--color-mint`)로 표현, `.brand-dot` 클래스.
- 헬퍼: `<BrandMark label="int" />` 또는 `<BrandMark label="turing" />`.
- 크기는 `size` prop: `xs|sm|md|lg|xl|display`.

## 디자인 토큰 (`app/globals.css`)
- 브랜드 컬러: 블랙 `#0a0a0a` + 민트 스케일(`#3FE0C7` 기준 strong/deep/dark/soft/pale/mist) + 따뜻한 보조 톤(cream).
- 표면(surface): white / soft / strong / mint-mist.
- 토큰 변경 시 `globals.css` 한 곳에서 관리.
