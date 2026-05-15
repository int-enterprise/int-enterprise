# widgets/ — 페이지 단위 큰 블록

각 widget은 자기 섹션 안의 레이아웃·카피·보조 컴포넌트를 가진다. 라우트가 widget들을 조립한다.

## 슬라이스 목록

### 글로벌 크롬
- `header/` — sticky·솔리드 배경 헤더. 라우트 기반 네비, 회사소개 드롭다운, 모바일 햄버거.
- `footer/` — 사이트맵·법적 정보·카피라이트.

### 랜딩 (`/`)
- `hero/` — 메인 비주얼 + 핵심 카피 + 2개 CTA.
- `brand-intro/` — About / Product / Clients 3카드 티저.
- `product/` → `ProductTeaser` — 다크 섹션 제품 티저.
- `clients/` → `ClientsStrip` — 마퀴 2줄(고객사·파트너).
- `cta-strip/` — 페이지 어디서나 끝에 붙이는 다크 CTA 블록.

### 회사 소개 트리
- `page-header/` — 모든 서브 페이지 상단 헤더(라벨/타이틀/설명/브레드크럼).
- `about/` → `AboutOverview` — `/about` 본문(회사 개요 + 메타 카드 + 하위 탭 카드).
- `history/` — `/about/history` 연혁 타임라인.
- `location/` → `LocationDetail` — `/about/location` Kakao Maps + 연락처.
- `ceo-profile/` — `/about/ceo` 대표 프로필 (모노그램 placeholder).
- `careers/` — `/about/careers` 채용 안내 (현재 외부 채용 사이트 없음, 메일 지원).

### 제품/관계
- `product/` → `ProductPage` — `/turing` 제품 페이지.
- `clients/` → `ClientsPage` — `/clients` 전체 고객사 그리드.
- `partners/` — `/partners` 관계사(운영사·기술·학술·공공).
- `insights/` — `/insights` 기사·보도자료.
- `contact/` → `ContactPage` — `/contact` 문의 폼 + 연락 채널.

## 규칙
- widget은 다른 widget을 import 하지 않는다(수평 격리). 조립은 `app/`에서.
- 인터랙션 없는 widget은 Server Component를 유지한다. 인터랙티브 자식만 `"use client"`.
- 외부 노출은 슬라이스마다 `index.ts` 한 줄로.
- 데이터는 `entities/`에서, 폼·맵 같은 인터랙션은 `features/`에서 import.
- 한 파일 200줄 이내.

## 슬라이스 표준 구조
```
widgets/<name>/
  index.ts        ← public export
  ui/             ← 섹션 + 보조 컴포넌트
```
