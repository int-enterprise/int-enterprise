# app/ — Next.js 라우트 레이어

Next.js App Router 진입점. 이 폴더의 책임은 **페이지 조립과 메타데이터**뿐이다.

## 규칙
- 비즈니스 로직 금지. widget을 import 해 배치만 한다.
- 라우트는 기본 Server Component.
- `layout.tsx`는 글로벌 폰트(Pretendard), Providers, JSON-LD, Header, Footer를 담당.
- 전역 CSS는 `globals.css`. Tailwind v4 `@theme` 토큰은 여기서 정의.
- 메타데이터는 각 페이지 파일에서 `buildMetadata({ title, description, path, keywords })`로 생성.
- 브레드크럼은 `<BreadcrumbJsonLd items={[...]} />`로 SEO 보강.

## 라우트 트리
```
app/
  layout.tsx
  page.tsx               ← /
  sitemap.ts             ← /sitemap.xml
  robots.ts              ← /robots.txt
  globals.css
  about/
    page.tsx             ← /about (회사 개요)
    history/page.tsx     ← /about/history
    location/page.tsx    ← /about/location
    ceo/page.tsx         ← /about/ceo
    careers/page.tsx     ← /about/careers
  turing/page.tsx        ← /turing
  clients/page.tsx       ← /clients
  partners/page.tsx      ← /partners
  insights/page.tsx      ← /insights
  contact/page.tsx       ← /contact
```

## 의존 방향
`app → widgets → features → entities → shared`. 역방향 금지.

## SEO 책임
- 루트 `layout.tsx`: `Organization` + `WebSite` JSON-LD를 항상 주입, 글로벌 `metadata` 기본값.
- 각 페이지: `metadata` export로 `title/description/canonical/og` 개별 지정.
- 페이지 컴포넌트 최상단에 `BreadcrumbJsonLd`로 브레드크럼 구조화.
