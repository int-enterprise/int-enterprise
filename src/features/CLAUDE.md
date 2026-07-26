# features/ — 사용자 인터랙션 단위

UI + 상태 + 사이드이펙트가 한 슬라이스에 모인 단위. widget이 import 해서 페이지에 배치한다.

## 슬라이스 목록
- `contact-form/` — 문의 폼. zod 스키마 + react-hook-form. 제출 시 `buildMailto()`로 메일 본문을 조립해 사용자의 메일 앱을 연다. 백엔드가 생기면 이 함수 자리에 Server Action을 붙이면 된다.
- `logo-marquee/` — 로고 무한 회전 마퀴. CSS keyframe 기반(Server Component 유지). 랜딩은 격자(`widgets/clients`)를 쓰고, 마퀴는 로고 수가 많아질 때 쓴다.
- `map/` — Kakao Maps JS SDK 로더 + `OfficeMap`. 키가 없거나 로드 실패면 주소 카드로 자동 대체된다.

## 주의
- React Compiler 린트 규칙이 켜져 있다.
  - effect 본문에서 `setState`를 동기 호출하지 않는다 (`react-hooks/set-state-in-effect`).
  - `window.location.href = ...` 대입은 막힌다. `window.location.assign()`을 쓴다.
  - react-hook-form의 `watch()` 대신 `useWatch({ control, name })`을 쓴다.

## 환경 변수
- `NEXT_PUBLIC_KAKAO_MAPS_KEY` — Kakao Developers JavaScript 키. 미설정 시 지도는 폴백 카드.

## 규칙
- feature는 다른 feature를 import 하지 않는다.
- 비즈니스 액션이 있으면 여기서 정의. Server Action 또는 `useMutation`.
- 표시만 하는 정적 컴포넌트는 feature가 아니라 `entities/` 또는 `widgets/`.
- 한 파일 200줄 이내.
