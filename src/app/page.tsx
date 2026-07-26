import { Hero } from "@/widgets/hero";
import { ProductDuo } from "@/widgets/products";
import { LogoWall } from "@/widgets/logo-wall";
import { PressBlock } from "@/widgets/press";
import { FinalCta } from "@/widgets/cta";

/**
 * 랜딩. 담백하게 간다 — 슬로건 하나와 두 사업(BM)만 짚고 넘어간다.
 *
 * ⚠️ 여기에 제품(turing.) 상세를 늘어놓지 않는다. 성능열화 6개 축, 5개 Agent 루프,
 * 수행 과제 목록은 전부 제품 페이지(/products/*)의 몫이다.
 * 랜딩이 한 제품 소개서처럼 읽히면 사업이 두 개인 회사를 잘못 그린 것이다.
 *
 * 고객사와 파트너는 LogoWall 한 구간으로 합쳐 보여 준다(로고가 곧 시각 요소다).
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <ProductDuo />
      <LogoWall />
      <PressBlock />
      <FinalCta />
    </>
  );
}
