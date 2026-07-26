import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Button, Section, SectionHeader } from "@/shared/ui";
import { PressCard, hasPress, latestPress, pressItems } from "@/entities/press";

/**
 * 보도·기고.
 * 사진이 있는 기사를 앞에 세워 섹션 전체가 활자만으로 채워지지 않게 한다.
 *
 * 표기 주의: 기사 제목은 원문 그대로 옮긴다(entities/press). 우리 카피에서
 * 연구실 출신이라는 서사를 덧붙이지 않는다 — 그 이야기는 /about#team 한 곳뿐이다.
 */
export function PressBlock() {
  if (!hasPress()) return null;

  const items = latestPress(5);

  // 대표 자리(lg)는 세로로 크게 늘어나므로 **사진이 있는 기사**를 앞에 세운다.
  // 최신순으로만 뽑으면 사진 없는 기사가 걸려 큰 패널이 통째로 비어 보인다.
  const featured = items.find((i) => i.image) ?? items[0];
  const rest = items.filter((i) => i.url !== featured.url);

  return (
    <Section rhythm="large" id="press">
      <SectionHeader
        eyebrow="보도·기고"
        title="언론 보도"
        description={`고객사와의 공동연구, 그리고 AI 평가에 대한 기고가 ${pressItems.length}건 보도됐습니다.`}
        action={
          <Button asChild variant="ghost" size="md">
            <Link href="/press">
              전체 보기
              <ArrowUpRight className="h-4 w-4" aria-hidden />
            </Link>
          </Button>
        }
      />

      <div className="mt-16 grid gap-6 lg:grid-cols-[1.35fr_1fr]">
        <PressCard item={featured} size="lg" />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1 lg:grid-rows-2">
          {rest.slice(0, 2).map((item) => (
            <PressCard key={item.url} item={item} />
          ))}
        </div>
      </div>

      {rest.length > 2 ? (
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rest.slice(2).map((item) => (
            <PressCard key={item.url} item={item} />
          ))}
        </div>
      ) : null}
    </Section>
  );
}
