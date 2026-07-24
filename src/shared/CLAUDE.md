# shared/ — 프리미티브, 유틸, 설정, 자산, SEO

도메인 비종속 코드. 가장 아래 레이어. 디자인 SSOT는
[docs/brand-guideline.md](../../docs/brand-guideline.md)(값) + [docs/spline-style-design.md](../../docs/spline-style-design.md)(방향).

## 서브 폴더
- `ui/` — 프리미티브. `BrandMark` `Button` `Card`/`GlassCard`/`GlassCardDark` `CardTitle`/`CardText` `Field`(Input·Textarea·Label) `Container`/`Section`/`SectionHeader`/`Eyebrow`/`Blob` `Marquee` `DefinitionList`.
- `lib/` — 유틸 (`cn`).
- `config/` — `site.ts`(브랜드 메타데이터, `navItems`, `ctaNav`, `legalNav`).
- `assets/` — `fonts/PretendardVariable.woff2`.
- `providers/` — `QueryProvider`.
- `seo/` — JSON-LD, `buildMetadata`.

## 디자인 토큰 (`app/globals.css`)
스킬 방향을 토큰으로 굳혀 뒀다. 컴포넌트는 토큰만 참조한다.

- **색**: `gray-0…100`, `navy-10…40`, `teal-10/30/40`, `rose-30`(폼 검증). 시맨틱: `canvas` `canvas-2`(옅은 오프화이트) `card` `line`/`line-strong`, 텍스트 `heading`(거의 검정) `display`(Navy) `body` `subtle` `faint`, `primary` `accent` `link`.
- **타이포**: 헤딩 Bold(700)+자간 `-0.025em`(전역 base). 본문 `font-light`+`leading-[1.7]`. 수치·라벨엔 `font-mono`.
- **반경**: `radius-lg`(24) `radius-md`(16) `radius-sm`(12) `radius-pill`.
- **그림자**: `shadow-soft`(카드) `shadow-lift`(hover·강조) `shadow-glow`(틸 발광).
- **그라디언트**: `bg-brand-gradient`(Navy→Teal, 패널·CTA 배경) `bg-mist-gradient`. **텍스트 위에 쓰지 않는다.**
- **글래스**: `glass`/`glass-dark` — 그라디언트/이미지 위에서만. 흰 배경 위에선 안 보인다.
- **모션**: `animate-blob`(12s) `animate-blob-slow`(18s) `animate-float` `animate-marquee`. 전부 ease. bounce 금지.

## 프리미티브 규약
- **Section**: `rhythm="tight|default|large"`(80/120/150px 여백). 배경색으로 리듬을 만들지 않는다 — 여백으로.
- **SectionHeader**: 헤딩은 크게(Bold display). `align="center"` 기본.
- **Blob**: 배경 그라디언트 도형. `absolute`로 섹션에 깔고 `overflow-hidden` 섹션 안에 둔다.
- **Card**: 흰 배경 위 소프트 섀도우 카드. `GlassCard`는 그라디언트/이미지 위.
- **Button**: 기본 `rounded-sm`(12px), `pill` prop으로 알약. hover 시 살짝 떠오름.
- **Teal 텍스트 금지** — 흰 위 대비 미달. 강조는 `text-link`.

## BrandMark
- 로고는 Pretendard가 아니라 **별도 지오메트릭 워드마크 이미지**다(`public/brand/int-logo.png` / `-white.png`).
  CSS로 글자를 그려 흉내 내지 않는다. 원본 크롭·화이트 변환은 `scripts/prepare-logo.mjs`.
- `siteConfig.googleSiteVerification`이 비면 로고의 마침표(=인증 신호)도 함께 사라진다는 관계는 이제 없다
  (로고가 이미지라 항상 마침표 포함). 인증 토큰 자체는 계속 보존한다.
