# entities/ — 도메인 모델 + 표시 컴포넌트

비즈니스 도메인 객체와 그것을 표현하는 작은 컴포넌트. 인터랙션 없는 "데이터의 시각화" 레이어.

## 슬라이스 목록
- `company/` — 법인 사실 정보(`company`, `corporateFacts`, `copyright()`), 연혁(`milestones`), 원칙(`principles`), 차별점 대조표(`differences` + 근거 지표 `proofMetric`), 대표(`founder` — 인사말 `greeting` 포함), 팀(`team`, `teamSize` — 연구개발계획서에서 가져온 실명·약력·사진).
  - `milestones`는 **고객사 이름 없이** 유형으로 적는다. `milestonesByYear()`가 연도별로 묶어 준다.
- `client/` — 고객사(`clients`), 파트너(`partners`), 수행 과제(`references`), 커버리지 집계(`coverage`), 랜딩 로고 월(`wallLogos`). 표시용 `ClientLogo`.
  - 로고 크기(`logoWidth`/`logoHeight`)는 **실제 파일 크기**여야 한다. `node scripts/prepare-client-logos.mjs`가 출력한 값을 적고 감으로 채우지 않는다(비율이 틀리면 로고가 찌그러진다).
  - `wallLogos`의 `unclassified: true` 항목은 고객사/파트너 구분이 확인되지 않은 곳이다. 카피에서 "고객사"로 단정하지 않는다.
- `service/` — 세 가지 서비스 오퍼링(`offerings`), 포지셔닝(`positioning`), 구축 절차(`buildSteps`), 다뤄 온 분야(`buildFields` + `scopeNote`), 고객 유형별 협업 방식(`playbooks` — 대기업·공공기관·중견기업·스타트업 4개).
  - `buildFields`의 여섯 분야는 **다 해 본 목록이 아니라 예시**다. 카피에서 여섯을 한계처럼 쓰지 않는다(업종을 가리지 않는 것이 강점).
- `product/` — 두 제품 브랜드(`productBrands`, `buildai`, `turing` — 표기는 **`buildAI.` / `turing.`** 고정, 조판은 `<ProductMark />`), turing. 정보(`product`), 5개 Agent 루프(`loopStages`), 성능열화 6개 축(`decayAxes`), 보안 계층(`harness`). 표시용 `LoopDiagram`, 성능 곡선 `DecayChart`(개념 도해 — 눈금 숫자를 넣지 않는다).
- `careers/` — 채용 기준(`whoWeWant`), 조직문화(`workStyles`), 복리후생(`benefits`), 채용 공고(`jobPostings` — 비면 '공고 없음'), 채용 절차(`hiringProcess`), 지원 안내(`applicationGuide`).
- `press/` — 언론 보도(`pressItems`)와 조회 헬퍼.

## 사실 관계의 출처
카피와 데이터의 근거는 **[docs/company-profile.md](../../docs/company-profile.md)** 다. 값을 바꾸기 전에 그 문서를 먼저 확인한다.

특히 지키는 것:
- **TIPS를 회사의 정체성으로 쓰지 않는다.** turing.이라는 한 솔루션의 R&D 트랙일 뿐이다. `strengths`에 TIPS 항목을 넣지 않는다.
- **진행 단계를 부풀리지 않는다.** `references[].stage`는 현업 운영 / 시범 적용 / 개발 / 성능 평가를 있는 그대로 적는다.
- **미래 매출·목표 수치는 넣지 않는다.** 투자 문서용 값이다.
- 기술 용어(BOCPD, 반사실적 추론 등)는 `loopStages[].tech`에만 두고, 본문은 쉬운 표현을 쓴다.

## 규칙
- 외부 의존: `shared/`만 가능. 다른 entity·feature·widget을 import 하지 않는다.
- 데이터는 `model/`에 상수로 정의하고 타입을 함께 export.
- 표시 컴포넌트는 props로 데이터를 받는 Server Component 기본.
- 한 파일 200줄 이내.

## 콘텐츠 규약 — 사실만 적는다
이 폴더는 홈페이지에 실리는 **주장의 출처**다. 여기서 지어내면 회사가 거짓말을 하게 된다.

- 검증할 수 없는 수식어("최적화된", "혁신적인", "업계 최고의")를 쓰지 않는다.
- 역량 주장에는 근거가 되는 고객사를 함께 적는다 (`capabilities[].proof`).
- **자리를 채우기 위한 가상 데이터를 넣지 않는다.** 예정된 기사, 가상의 고객사, 임시 수치 전부 금지.
- 데이터가 없으면 배열을 비워 둔다. 소비하는 widget이 섹션을 통째로 감춘다 (`press`가 이 방식).

## 디렉터리 구조
```
entities/<name>/
  index.ts        ← public export
  model/          ← types + static data
  ui/             ← 표시 컴포넌트 (없을 수 있음)
```
