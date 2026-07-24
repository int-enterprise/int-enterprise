import { Hero } from "@/widgets/hero";
import { ClientLogos } from "@/widgets/clients";
import { WorkMarquee } from "@/widgets/work";
import { OfferingsBlock } from "@/widgets/offerings";
import { DecayGrid } from "@/widgets/decay";
import { TuringBlock } from "@/widgets/turing";
import { PullQuote } from "@/widgets/quote";
import { StrengthCards } from "@/widgets/strengths";
import { PressBlock } from "@/widgets/press";
import { FinalCta } from "@/widgets/cta";
import { founder } from "@/entities/company";

/**
 * 랜딩. 레퍼런스(spline.design)의 섹션 골격을 그대로 따른다.
 * 배경은 화이트 단색이고 섹션 구분은 여백으로만 만든다 — 배경 교차 없음.
 * 대형 인용구는 제품 블록 앞뒤에 끼워 호흡을 만드는 자리다.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <ClientLogos />
      <WorkMarquee />
      <OfferingsBlock />
      <PullQuote
        lead="AI 모델을 만드는 경쟁은 이미 평준화됐습니다. 다음 전장은"
        emphasis="만들어 둔 AI를 현장에서 흔들림 없이 굴려 내는 능력입니다."
        tail="그 규칙을 한국에서 가장 먼저 쓰려고 (주)인트를 시작했습니다."
        name={founder.name}
        role="Founder & CEO · 서강대 기술경영전문대학원 교수"
        initials={founder.initials}
      />
      <DecayGrid />
      <TuringBlock />
      <StrengthCards />
      <PressBlock />
      <FinalCta />
    </>
  );
}
