import { Card, CardText, CardTitle, Section, SectionHeader } from "@/shared/ui";

/**
 * 연구실 창업 서사.
 * 보도 7건 전부가 "서강대 박현규 교수 연구팀" 명의라는 사실을 근거로 쓴다.
 */
const facts = [
  {
    no: "01",
    title: "연구실이 먼저 알려졌습니다",
    body: "지금까지 나간 보도는 모두 법인명이 아니라 서강대 기술경영전문대학원 박현규 교수 연구팀 명의였습니다. 회사는 그 연구를 계속하기 위해 만든 그릇입니다.",
  },
  {
    no: "02",
    title: "평가 방법론이 출발점입니다",
    body: "AI를 얼마나 잘 만들었는지 재는 기준을 연구로 다뤄 왔습니다. 그 방법론이 지금 turing.의 평가 지표 체계가 됐습니다.",
  },
  {
    no: "03",
    title: "논문으로 검증받습니다",
    body: "LG CNS와의 1년 공동연구 결과는 국제 학술지에 논문으로 등재됐습니다. 주장이 아니라 심사를 통과한 결과입니다.",
  },
];

export function OriginSection() {
  return (
    <Section rhythm="large" id="origin">
      <SectionHeader
        eyebrow="Origin"
        title="서강대 연구실에서 시작한 회사입니다"
        description="대학 실험실의 연구가 기업 현장으로 나가는 과정에서 만난 문제가 (주)인트의 출발점입니다. 만들어 주고 끝나는 것이 아니라, 만든 AI가 계속 제 성능을 내게 하는 일까지가 연구 주제였습니다."
      />

      <div className="mt-14 grid gap-6 lg:grid-cols-3">
        {facts.map((f) => (
          <Card key={f.no} className="flex flex-col gap-3 p-8" interactive>
            <span className="font-mono text-sm font-semibold text-accent">
              {f.no}
            </span>
            <CardTitle>{f.title}</CardTitle>
            <CardText>{f.body}</CardText>
          </Card>
        ))}
      </div>
    </Section>
  );
}
