# entities/ — 도메인 모델 + 표시 카드

비즈니스 도메인 객체와 그것을 표현하는 작은 카드 컴포넌트. 인터랙션 없는 "데이터의 시각화" 레이어.

## 슬라이스 목록
- `company/` — 회사 메타데이터(법정 이름, 주소, 사업자번호, 연락처, 카피라이트). 외부에 `company` 상수 + `copyright()`.
- `client/` — 고객사·파트너 데이터(Clearbit 로고 URL 포함). `ClientLogo`로 표시.
- `article/` — 기사·보도자료 카드 데이터. `ArticleCard`.
- `product/` — turing. 정보·5개 운영 단계·도입 효과. `PillarCard`.

## 규칙
- 외부 의존: `shared/`만 가능. 다른 entity·feature·widget을 import 하지 않는다.
- 데이터는 `model/`에 상수 또는 fetcher로 정의. 타입은 함께 export.
- 카드 컴포넌트는 props로 데이터를 받는 순수 함수형(Server Component 기본).
- 한 파일 200줄 이내.

## 디렉터리 구조
```
entities/<name>/
  index.ts        ← public export
  model/          ← types + static data / fetchers
  ui/             ← 카드, 배지 등 표시 컴포넌트
```
