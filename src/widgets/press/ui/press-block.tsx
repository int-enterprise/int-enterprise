import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Button, Section, SectionHeader } from "@/shared/ui";
import { PressCard, hasPress, latestPress, pressItems } from "@/entities/press";

/**
 * 보도·기고.
 * 사진이 있는 기사를 앞에 세워 섹션 전체가 활자만으로 채워지지 않게 한다.
 *
 * 표기 주의: 기사들은 법인명이 아니라 "서강대 박현규 교수 연구팀" 명의로 나갔다.
 */
export function PressBlock() {
  if (!hasPress()) return null;

  const items = latestPress(5);
  const [featured, ...rest] = items;

  return (
    <Section rhythm="large" id="press">
      <SectionHeader
        eyebrow="보도·기고"
        title="연구실이 쓴 글과 현장이 실린 기사"
        description={`박현규 교수 연구팀의 공동연구와 기고가 ${pressItems.length}건 보도됐습니다.`}
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
