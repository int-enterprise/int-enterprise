# widgets/ — 페이지 단위 큰 블록

각 widget은 자기 섹션의 레이아웃·카피 조판을 가진다. 라우트가 widget들을 조립한다.

## 슬라이스 목록

### 글로벌 크롬
- `header/` — sticky 헤더. 라우트 기반 활성 표시, 모바일 전체화면 메뉴.
- `footer/` — 사이트맵·법인 정보·카피라이트.
- `page-hero/` — 하위 페이지 공통 상단(브레드크럼/eyebrow/타이틀/설명/aside).

### 랜딩 (`/`)
1. `hero/` — 회사의 한 줄 정의 + 세 오퍼링 색인. 주력(②)만 톤을 올린다.
2. `clients/` → `ClientWall` — 고객사 격자. 한 화면에 전부 보이는 것이 목적이라 마퀴가 아니다.
3. `offerings/` → `OfferingsSection` — 세 가지 서비스 오퍼링. 나열이 아니라 단계.
4. `problem/` → `ProblemSection` — 성능열화 6개 축. turing.의 존재 이유를 만든다.
5. `turing/` → `TuringSection` — 5개 Agent 루프. 랜딩 유일의 다크 구간.
6. `strengths/` — 왜 (주)인트인가.
7. `press/` — 언론 보도. 데이터가 없으면 **섹션 자체를 렌더하지 않는다.**
8. `timeline/` — 연혁. 가로 스크롤.
9. `cta-band/` — 페이지 끝 전환 구간.

### 하위 페이지
- `offerings/` → `OfferingsSection` `PlaybookSection`, `references/` → `ReferenceList` — `/services`
- `problem/` + `turing/` → `TuringDetail` — `/turing`
- `company/` → `PrinciplesSection` `FounderSection` `PartnersSection` `LocationSection` — `/about`
- `careers/` → `CareersDetail` — `/careers`
- `contact/` → `ContactDetail` — `/contact`
- `legal/` → `LegalDoc` — `/privacy` `/terms` `/delete-account` 공통 조판

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
| Hero | 좌 텍스트 / 우 색인 목록 (비대칭) |
| ClientWall | 테두리 격자 (표) |
| Offerings | 3행 목록, 주력 행만 배경 반전 |
| Problem | 상단 2열 + 하단 3열 번호 목록 |
| Turing | 다크 풀블리드 + 5분할 띠 |
| Strengths | 2열 활자 위계 (테두리 없음) |
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
