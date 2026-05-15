# features/ — 사용자 인터랙션 단위

UI + 상태 + 사이드이펙트가 한 슬라이스에 모인 단위. widget이 import 해서 페이지에 배치한다.

## 슬라이스 목록
- `contact-form/` — 문의 폼. zod 스키마 + react-hook-form + mutation. 제출 시 mailto로 자동 작성.
- `logo-marquee/` — 고객사·파트너 무한 회전 마퀴. CSS keyframe 기반(motion 사용 안 함, 모션-리듀스 대응).
- `map/` — Kakao Maps JS SDK 로더 + `OfficeMap` 컴포넌트. 키 없으면 정적 폴백 카드 표시.

## 환경 변수
- `NEXT_PUBLIC_KAKAO_MAPS_KEY` — Kakao Developers JavaScript 키. 미설정 시 지도는 폴백 카드.

## 규칙
- feature는 다른 feature를 import 하지 않는다.
- 비즈니스 액션이 있으면 여기서 정의. Server Action 또는 `useMutation`.
- 표시만 하는 정적 컴포넌트는 feature가 아니라 `entities/` 또는 `widgets/`.
- 한 파일 200줄 이내.
