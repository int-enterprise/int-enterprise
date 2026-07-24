# entities/ — 도메인 모델 + 표시 컴포넌트

비즈니스 도메인 객체와 그것을 표현하는 작은 컴포넌트. 인터랙션 없는 "데이터의 시각화" 레이어.

## 슬라이스 목록
- `company/` — 법인 사실 정보(`company`, `corporateFacts`, `copyright()`), 연혁(`milestones`), 원칙(`principles`), 강점(`strengths`), 대표(`founder`).
- `client/` — 고객사(`clients`), 파트너(`partners`), 수행 과제(`references`), 커버리지 집계(`coverage`). 표시용 `ClientLogo`.
- `service/` — 세 가지 서비스 오퍼링(`offerings`), 포지셔닝(`positioning`), 고객 규모별 협업 방식(`playbooks`).
- `product/` — turing. 정보(`product`), 5개 Agent 루프(`loopStages`), 성능열화 6개 축(`decayAxes`), 보안 계층(`harness`). 표시용 `LoopDiagram`.
- `careers/` — 채용 직군(`roles`), 일하는 방식(`workingPolicies`), 지원 안내(`applicationGuide`).
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
