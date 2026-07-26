# widgets/ — 페이지 단위 큰 블록

각 widget은 자기 섹션의 레이아웃·카피 조판을 가진다. 라우트가 widget들을 조립한다.

## 슬라이스 목록

### 글로벌 크롬
- `header/` — sticky 헤더. 라우트 기반 활성 표시, 모바일 전체화면 메뉴.
- `footer/` — 사이트맵·법인 정보·카피라이트.
- `page-hero/` — 하위 페이지 공통 상단(브레드크럼/eyebrow/타이틀/설명/aside).

### 랜딩 (`/`) — 담백하게
랜딩은 **슬로건 하나와 두 사업(BM)만** 짚는다. 제품 상세를 여기로 끌어오지 않는다.
성능열화 6개 축·5개 Agent 루프·수행 과제 목록이 랜딩에 있으면 사업이 두 개인 회사를 잘못 그린 것이다.

1. `hero/` — 첫 화면을 채우는 핀 구간. 좌(워드마크 + 브랜드 뜻 + 버튼 두 개) / 중앙 3D.
   스크롤하면 히어로가 붙어 있는 채로 3D가 천천히 돌고, 활주로가 끝나면 풀린다(`hero-stage.tsx`).
   ⚠️ 우측 슬로건 칸은 없앴다. 슬로건 문단을 다시 넣지 않는다.
2. `products/` → `ProductDuo` — 두 BM(buildAI. / turing.)을 나란히. 주력(turing.)만 톤을 올린다.
3. `logo-wall/` → `LogoWall` — 주요 고객사 및 파트너. 고객사·파트너를 **한 구간에 합쳐** 보여 준다
   (일부 로고는 관계가 확인되지 않아 "고객사"로 단정할 수 없다). 로고 없는 파트너는 아래 한 줄로.
4. `press/` — 언론 보도. 데이터가 없으면 **섹션 자체를 렌더하지 않는다.**
5. `cta/` → `FinalCta` — 페이지 끝 전환 구간.

`clients/` → `ClientLogos`(고객사만 + 수행 과제 집계 캡션)는 제품 페이지에서 쓴다.

### 하위 페이지
- `products/` → `ProductDuo` — `/products` (탭 랜딩)
- `offerings/` + `work/` + `clients/` + `strengths/` — `/products/buildai`
- `decay/` + `turing/` — `/products/turing`
- `company/` → `GreetingSection` `Timeline` `TeamSection` `LocationSection` — `/about`
  (파트너십은 랜딩의 `LogoWall`이 맡는다 — `PartnersSection`은 없앴다)
- `careers/` → `CareersDetail` — `/careers`
- `press/` → `PressList` — `/press`
- `contact/` → `ContactDetail` — `/contact`
- `legal/` → `LegalDoc` — `/privacy` `/terms` `/delete-account` 공통 조판

### 서강대 언급은 한 곳뿐
`company/ui/team-section.tsx`의 설명 한 문장에서만 서강대학교 연구실 출발을 말한다.
히어로·고지 바·보도 섹션·메타데이터로 이 서사를 옮겨 쓰지 않는다.

## 규칙
- widget은 다른 widget을 import 하지 않는다(수평 격리). 조립은 `app/`에서.
- 인터랙션 없는 widget은 Server Component를 유지한다. 인터랙티브 자식만 `"use client"`.
- 외부 노출은 슬라이스마다 `index.ts` 한 줄로.
- 데이터는 `entities/`에서, 폼·맵 같은 인터랙션은 `features/`에서 import.
- 한 파일 200줄 이내.

## 레이아웃 규약 — "같은 섹션을 반복하지 않는다"
템플릿처럼 보이는 가장 큰 원인은 **모든 섹션이 `eyebrow → 제목 → 3카드 그리드`로 똑같은 것**이다.
새 섹션을 추가할 때는 옆 섹션과 다른 구조를 고른다.

현재 페이지가 쓰고 있는 구조:
| 섹션 | 구조 |
|---|---|
| Hero | 핀 스크롤 · 좌 텍스트 / 중앙 3D (우측은 여백) |
| ClientWall | 테두리 격자 (표) |
| Offerings | 3행 목록, 주력 행만 배경 반전 |
| BuildProcess | 넓은 사진 띠 + 4단 가로 레일 |
| BuildScope | 아이콘 행 2단(분야 6 / 고객 유형 4) |
| Problem (decay) | 아이콘 + 한 줄 3열 |
| Turing | 좌 텍스트 / 우 성능 곡선 그래프 + 아래 5행 레일 |
| Strengths (차별점) | 3열 대조표 + 지표 밴드 |
| Timeline | 가로 스크롤 |
| Press | 대표 1건 크게 + 나머지 리스트 |
| CtaBand | 좌우 분할 카드 |

- 아이콘을 원형 배경에 넣은 카드는 쓰지 않는다. 위계는 활자와 여백으로 만든다.
- 모션은 이유가 있을 때만 넣는다(루프=순환, 마퀴=다수, 파동=감지).

## 슬라이스 표준 구조
```
widgets/<name>/
  index.ts        ← public export
  ui/             ← 섹션 + 보조 컴포넌트
```
