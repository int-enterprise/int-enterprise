# app/ — Next.js 라우트 레이어

Next.js App Router 진입점. 이 폴더의 책임은 **페이지 조립과 메타데이터**뿐이다.

## 규칙
- 비즈니스 로직 금지. widget을 import 해 배치만 한다.
- 라우트는 기본 Server Component.
- `layout.tsx`는 글로벌 폰트(Pretendard), QueryProvider, JSON-LD, Header, Footer, 스킵 링크를 담당.
- 전역 CSS는 `globals.css`. Tailwind v4 `@theme` 토큰은 여기서만 정의한다.
- 메타데이터는 각 페이지 파일에서 `buildMetadata({ title, description, path, keywords })`로 생성.
- 브레드크럼은 `<BreadcrumbJsonLd items={[...]} />`로 SEO 보강.

## 라우트 트리
```
app/
  layout.tsx
  page.tsx               ← / 랜딩
  globals.css
  sitemap.ts             ← /sitemap.xml
  robots.ts              ← /robots.txt
  services/page.tsx      ← /services  기업 맞춤 AI Agent 구축
  turing/page.tsx        ← /turing    AI 운영 자동화 turing.
  about/page.tsx         ← /about     회사 소개 (원칙·연혁·대표·파트너·오시는 길)
  careers/page.tsx       ← /careers   채용
  contact/page.tsx       ← /contact   문의
  privacy/page.tsx       ← /privacy
  terms/page.tsx         ← /terms
  delete-account/page.tsx ← /delete-account
```

## 절대 건드리면 안 되는 것
운영 중인 서비스가 참조하는 자산이다. 리팩터링 대상에서 제외한다.

- **`/delete-account`** — Apple App Store 심사가 참조하는 계정 삭제 안내(Donky Note). 경로·안내 문구를 바꾸지 않는다.
- **`/privacy`, `/terms`** — 앱·스토어가 링크하는 법적 고지. 경로 유지.
- **`layout.tsx`의 `metadata.verification`** — `siteConfig.googleSiteVerification` 토큰으로 Google Search Console 인증 메타태그를 주입한다. 토큰을 지우면 인증이 풀리고 `BrandMark`의 마침표도 사라진다.
- **`OrganizationJsonLd` / `WebSiteJsonLd`** — 루트 레이아웃에서 항상 주입.

## 구 IA 리다이렉트
IA 개편으로 사라진 주소는 `next.config.ts`의 `redirects()`가 308로 처리한다.
`/about/history` `/about/location` `/about/ceo` `/about/careers` `/clients` `/partners` `/insights`
→ 라우트를 새로 정리할 때 이 목록도 함께 갱신한다.

## 의존 방향
`app → widgets → features → entities → shared`. 역방향 금지.
