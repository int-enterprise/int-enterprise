import Link from "next/link";
import { ArrowUpRight, Briefcase, MapPin } from "lucide-react";
import { Button, Container, Section } from "@/shared/ui";
import {
  applicationGuide,
  hiringProcess,
  jobPostings,
} from "@/entities/careers";
import { company } from "@/entities/company";

const mailto = `mailto:${company.contact.email}?subject=${encodeURIComponent(
  applicationGuide.subject
)}`;

/**
 * 채용 공고 목록 + 절차 + 지원 안내.
 *
 * ⚠️ `jobPostings`가 비면 **"진행 중인 공고 없음"**을 그대로 보여 준다.
 * 자리를 채우려고 가짜 공고를 만들지 않는다. 공고가 열리면 데이터만 넣으면 된다.
 *
 * ⚠️ 이 페이지는 `/careers`를 거쳐 들어오는 자리다. 헤더 메뉴에 직접 걸지 않는다
 * (회사를 먼저 보고 공고로 넘어오는 순서를 지킨다).
 */
export function JobsBoard() {
  const open = jobPostings.length > 0;

  return (
    <>
      <Section rhythm="default" id="openings">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="text-[1.75rem] leading-[1.2] tracking-[-0.025em] text-display sm:text-[2.25rem]">
              모집 부문
            </h2>
            <span className="font-mono text-sm text-faint">
              {jobPostings.length}건
            </span>
          </div>

          {open ? (
            <ul className="mt-10 flex flex-col border-t border-line">
              {jobPostings.map((job) => (
                <li key={job.id} className="border-b border-line">
                  <Link
                    href={`/careers/jobs#${job.id}`}
                    className="group flex flex-col gap-3 py-7 transition-colors hover:bg-canvas-2 sm:flex-row sm:items-center sm:gap-8 sm:px-2"
                  >
                    <span className="font-mono text-sm text-accent sm:w-[140px] sm:shrink-0">
                      {job.track}
                    </span>
                    <span className="flex-1">
                      <span className="block text-xl font-semibold text-heading">
                        {job.title}
                      </span>
                      <span className="mt-1 block text-base font-light text-body">
                        {job.summary}
                      </span>
                    </span>
                    <span className="flex shrink-0 items-center gap-4 text-sm text-subtle">
                      <span className="inline-flex items-center gap-1.5">
                        <Briefcase className="h-4 w-4" aria-hidden />
                        {job.employment}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <MapPin className="h-4 w-4" aria-hidden />
                        {job.location}
                      </span>
                      <ArrowUpRight
                        className="h-5 w-5 text-faint transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        aria-hidden
                      />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className="mt-10 flex flex-col items-center gap-4 rounded-lg border border-dashed border-line-strong px-8 py-16 text-center">
              <span
                aria-hidden
                className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-canvas-2 text-faint"
              >
                <Briefcase className="h-5 w-5" />
              </span>
              <p className="text-xl font-semibold text-heading">
                현재 진행 중인 채용 공고가 없습니다
              </p>
              <p className="max-w-[46ch] text-base font-light leading-[1.75] text-body">
                공고가 열리면 이 자리에 올립니다. 관심 있는 직군이 있다면 상시
                지원으로 먼저 알려 주세요.
              </p>
            </div>
          )}
        </Container>
      </Section>

      <Section rhythm="default" soft id="process">
        <Container>
          <h2 className="text-[1.75rem] leading-[1.2] tracking-[-0.025em] text-display sm:text-[2.25rem]">
            채용 절차
          </h2>

          <ol className="mt-10 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {hiringProcess.map((p, i) => (
              <li key={p.step} className="flex flex-col gap-3">
                <span className="font-mono text-sm font-semibold text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="h-px w-full bg-line" aria-hidden />
                <span className="text-lg font-semibold text-heading">
                  {p.step}
                </span>
                <span className="text-base font-light leading-[1.7] text-body">
                  {p.detail}
                </span>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <Section rhythm="default" id="apply">
        <Container>
          <div className="flex flex-col gap-8 rounded-lg border border-line bg-canvas p-9 shadow-soft sm:p-12 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-col gap-4">
              <h2 className="text-2xl font-bold tracking-[-0.02em] text-heading">
                상시 지원
              </h2>
              <ol className="flex max-w-[52ch] flex-col gap-2.5">
                {applicationGuide.steps.map((step, i) => (
                  <li key={step} className="flex gap-3">
                    <span className="font-mono text-sm text-faint">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-base font-light leading-[1.7] text-body">
                      {step}
                    </span>
                  </li>
                ))}
              </ol>
            </div>

            <Button asChild size="lg" className="shrink-0">
              <a href={mailto}>{company.contact.email}로 지원</a>
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
