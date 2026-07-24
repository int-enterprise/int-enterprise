# Int Brand Guideline 요약

> 원본: `int._Brand_Style_Guide.pdf` (1~13페이지, Logo / Colors / Typography 섹션)
> 용도: 개발 시 참고할 브랜드 컬러 및 타이포그래피 토큰 정리

---

## 1. Logo

- 로고: `int.` (텍스트 로고, EN/KR 버전 모두 존재)
- 파일: `int._logo` (ai / png / svg)
  - 다크 모드 / 라이트 모드
  - 채색 모드 / 무채색 모드
- 배경 위 사용 예시
  - 다크 네이비 배경 위: 화이트 텍스트 + 틸 색상 점(.)
  - 라이트 그레이 배경 위: 블랙 텍스트 + 틸 색상 점(.)
  - 틸 배경 위: 블랙 텍스트 + 블랙 점(.)

---

## 2. Colors (사용 컬러)

### 2.1 Gray Scale (무채색 계열 — 배경, 경계선, 텍스트 등 UI 구조 컬러)

| 단계 | HEX |
|---|---|
| 00 (Background) | #FFFFFF |
| 10 (Surface) | #FBFCFF |
| 20 (Borders) | #E5E7E9 |
| 30 | #D4D8E8 |
| 40 | #97A0B8 |
| 50 (Body txt) | #75809A |
| 60 (Dark txt) | #6B7588 |
| 70 | #56607A |
| 75 | #39435A |
| 80 | #222A3D |
| 85 | #333333 |
| 90 | #1A1A1A |
| 95 | #0E1220 |
| 100 | #000000 |

### 2.2 Primary — int. Navy (메인 브랜드 컬러, 헤딩/강조 텍스트)

| 단계 | HEX |
|---|---|
| 10 | #EBF0FF |
| 20 | #D4E0FF |
| 30 (Sub) | #052699 |
| 40 (Main) | #04044A |

### 2.3 Accent — int. Teal (하이라이트, 알림, 진행 상태)

| 단계 | HEX |
|---|---|
| 10 (Main*) | #F0FDFB |
| 20 (Sub) | #40E0D0 (20%) |
| 30 | #CEFAF5 |
| 40 (Main) | #40E0D0 |

### 2.4 Alert — Yellow

| 단계 | HEX |
|---|---|
| 10 | #FDF3DF |
| 20 (Sub) | #F2AE00 (20%) |
| 30 (Main) | #F2AE00 |
| 40 | #D99016 (20%) |
| 50 | #D98F16 |

### 2.5 Alert — Red

| 단계 | HEX |
|---|---|
| 10 | #FBE6E6 |
| 20 | #F13E3E (20%) |
| 30 (Main) | #F13E3E |

---

## 3. Color System — Semantic Tokens (라이트 모드 기준, 컬러 사용 비율 포함)

| Token | 참조 색상 | HEX | 사용 비율(투명도) |
|---|---|---|---|
| Background | Gray 00 | #FFFFFF | 80% |
| Background (subtle) | Gray 10 | #F5F6F9 | 20% |
| Surface | Gray 20 | #EAECF3 | 100% |
| Surface (subtle) | Gray 30 | #EAECF3 | 30% |
| Border | Gray 30 | #D4D8E8 | 70% |
| Text / Muted | Gray 60 | #6B7588 | 100% |
| Text / Body | Gray 70 | #56607A | 100% |
| Text / Heading | 쿨 그레이 100 | #000000 | 100% |
| Primary | Navy 40 | #04044A | 100% |
| Accent | Teal 40 | #40E0D0 | 100% |
| Accent Hover | Teal 10 | #F0FDFB | 100% |
| High (default/hover) | Navy 30 | #052699 | 40% |
| High (subtle) | Navy 10 | #EBF0FF | 60% |
| Medium (default/hover) | Yellow 30 | #F2AE00 | 40% |
| Medium (subtle) | Yellow 10 | #FDF3DF | 60% |
| Low (default/hover) | Red 30 | #F13E3E | 40% |
| Low (subtle) | Red 10 | #FBE6E6 | 60% |

**사용 가이드**
- **Background**: 페이지/섹션의 기본 배경. 화이트와 라이트 그레이로 계층 표현
- **Surface**: 카드, 모달, 드롭다운 등 떠있는 요소의 배경
- **Border**: 테두리, 구분선, 입력 필드 테두리(70%), 미세한 구분선(30%)
- **Text**: 텍스트 계층 (Muted → Body → Heading) / Primary는 체크마크, 버튼에 사용
- **Interactive**: 완료 상태, 선택 요소, 링크 / Accent는 강조, 아이콘에 사용
- **Status**: 우수(High/틸), 보통(Medium/노랑), 미흡(Low/빨강), 정보(파랑) — 성능 지표 표시에 사용

---

## 4. Typography

- 기본 폰트: **Pretendard**
- 위계: Button / Heading / Subtitle / Body 4단계로 구분

### 4.1 Heading (7종, weight: Bold)

| 스타일 | size(rem) | line-height |
|---|---|---|
| Heading 40 | 40 / 2.5rem | 150% |
| Heading 36 | 36 / 2.25rem | 150% |
| Heading 28 | 28 / 1.75rem | 140% |
| Heading 24 | 24 / 1.5rem | 150% |
| Heading 22 | 22 / 1.375rem | 150% |
| Heading 20 | 20 / 1.25rem | 150% |
| Heading 18 | 18 / 1.125rem | 150% |

### 4.2 Subtitle (6종)

| 스타일 | size(rem) | line-height | weight |
|---|---|---|---|
| Subtitle 20 | 20 / 1.25rem | 140% | Medium |
| Subtitle 18 | 18 / 1.125rem | 150% | Semi Bold |
| Subtitle 16 Bold | 16 / 1rem | 150% | Bold |
| Subtitle 16 Semibold | 16 / 1rem | 150% | Semi Bold |
| Subtitle 16 Medium | 16 / 1rem | 150% | Medium |
| Subtitle 14 | 14 / 0.875rem | 150% | Semi Bold |

### 4.3 Body (8종)

| 스타일 | size(rem) | line-height | weight |
|---|---|---|---|
| Body 18 | 18 / 1.125rem | 170% | Regular |
| Body 16 Regular | 16 / 1rem | 170% | Regular |
| Body 16 Medium | 16 / 1rem | 170% | Medium |
| Body 14 Regular | 14 / 0.875rem | 170% | Regular |
| Body 14 Medium | 14 / 0.875rem | 170% | Medium |
| Body 13 | 13 / 0.8125rem | 170% | Regular |
| Body 12 Regular | 12 / 0.75rem | 170% | Regular |
| Body 12 Medium | 12 / 0.75rem | 170% | Medium |

### 4.4 Button (3종, weight: Semi Bold, line-height 100%)

| 스타일 | size(rem) |
|---|---|
| Button 16 | 16 / 1rem |
| Button 14 | 14 / 0.875rem |
| Button 13 | 13 / 0.8125rem |
