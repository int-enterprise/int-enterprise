"use client";

import * as React from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button, Field, Input, Textarea } from "@/shared/ui";
import { company } from "@/entities/company";
import {
  contactSchema,
  submitInquiry,
  topicLabels,
  type ContactInput,
  type ContactTopic,
} from "../model/schema";

const topics = Object.entries(topicLabels) as [ContactTopic, string][];

/**
 * 문의 폼.
 *
 * ⚠️ 제출은 서버(`/api/inquiries`)로 간다. 메일 앱을 여는 방식으로 되돌리지 않는다.
 * `defaultTopic`으로 문의 유형을 미리 골라 둘 수 있다 —
 * 제품 페이지의 "구축 문의"·"제품 문의" 버튼이 이 값을 넘긴다.
 */
export function ContactForm({
  defaultTopic = "product",
}: {
  defaultTopic?: ContactTopic;
}) {
  const [sent, setSent] = React.useState(false);
  const [failed, setFailed] = React.useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      topic: defaultTopic,
      name: "",
      company: "",
      email: "",
      message: "",
    },
  });

  const topic = useWatch({ control, name: "topic" });

  const onSubmit = async (data: ContactInput) => {
    setFailed(null);
    try {
      await submitInquiry(data);
      setSent(true);
    } catch (e) {
      setFailed(e instanceof Error ? e.message : "전송에 실패했습니다.");
    }
  };

  if (sent) {
    return (
      <div className="flex flex-col items-start gap-4 rounded-lg bg-canvas-2 p-8">
        <CheckCircle2 className="h-10 w-10 text-navy-40" aria-hidden />
        <h3 className="text-xl">문의가 접수됐습니다</h3>
        <p className="text-sm leading-[1.7] text-body">
          확인 후 연락드리겠습니다. 급한 건이라면{" "}
          <a
            href={`mailto:${company.contact.email}`}
            className="font-medium text-link underline underline-offset-4"
          >
            {company.contact.email}
          </a>
          로도 연락하실 수 있습니다.
        </p>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            reset();
            setSent(false);
          }}
        >
          새로 작성하기
        </Button>
      </div>
    );
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-6"
    >
      <fieldset className="flex flex-col gap-3">
        <legend className="mb-3 text-sm font-medium text-heading">
          문의 유형
        </legend>
        <div className="flex flex-wrap gap-2">
          {topics.map(([key, label]) => {
            const active = topic === key;
            return (
              <button
                key={key}
                type="button"
                aria-pressed={active}
                onClick={() => setValue("topic", key, { shouldValidate: true })}
                className={
                  active
                    ? "rounded-pill bg-primary px-4 py-2 text-sm font-medium text-gray-0"
                    : "rounded-pill border border-line px-4 py-2 text-sm font-medium text-body transition-colors hover:border-primary"
                }
              >
                {label}
              </button>
            );
          })}
        </div>
      </fieldset>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field
          label="이름"
          htmlFor="contact-name"
          required
          error={errors.name?.message}
        >
          <Input
            id="contact-name"
            autoComplete="name"
            placeholder="홍길동"
            aria-invalid={Boolean(errors.name)}
            {...register("name")}
          />
        </Field>
        <Field
          label="회사명"
          htmlFor="contact-company"
          error={errors.company?.message}
        >
          <Input
            id="contact-company"
            autoComplete="organization"
            placeholder="선택 입력"
            aria-invalid={Boolean(errors.company)}
            {...register("company")}
          />
        </Field>
      </div>

      <Field
        label="이메일"
        htmlFor="contact-email"
        required
        error={errors.email?.message}
      >
        <Input
          id="contact-email"
          type="email"
          autoComplete="email"
          placeholder="name@company.com"
          aria-invalid={Boolean(errors.email)}
          {...register("email")}
        />
      </Field>

      <Field
        label="문의 내용"
        htmlFor="contact-message"
        required
        error={errors.message?.message}
        hint="현재 운영 중인 AI 서비스와 겪고 있는 문제를 적어주시면 더 정확히 답변드릴 수 있습니다."
      >
        <Textarea
          id="contact-message"
          rows={7}
          placeholder="예) 사내 문서 검색 챗봇을 6개월째 운영 중인데, 최근 답변 품질이 떨어졌다는 피드백이 늘고 있습니다."
          aria-invalid={Boolean(errors.message)}
          {...register("message")}
        />
      </Field>

      <div className="flex flex-col gap-3">
        {failed ? (
          <p role="alert" className="text-sm text-rose-30">
            {failed} 잠시 후 다시 시도해 주세요.
          </p>
        ) : null}
        <Button type="submit" size="lg" disabled={isSubmitting} className="self-start">
          {isSubmitting ? "보내는 중…" : "문의 보내기"}
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Button>

      </div>
    </form>
  );
}
