"use client";

import * as React from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button, Field, Input, Textarea } from "@/shared/ui";
import { company } from "@/entities/company";
import {
  buildMailto,
  contactSchema,
  topicLabels,
  type ContactInput,
  type ContactTopic,
} from "../model/schema";

const topics = Object.entries(topicLabels) as [ContactTopic, string][];

export function ContactForm() {
  const [sent, setSent] = React.useState(false);

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
      topic: "product",
      name: "",
      company: "",
      email: "",
      message: "",
    },
  });

  const topic = useWatch({ control, name: "topic" });

  const onSubmit = (data: ContactInput) => {
    // location.href 직접 대입은 React Compiler의 불변성 규칙에 걸린다. assign()을 쓴다.
    window.location.assign(buildMailto(company.contact.email, data));
    setSent(true);
  };

  if (sent) {
    return (
      <div className="flex flex-col items-start gap-4 rounded-lg bg-canvas-2 p-8">
        <CheckCircle2 className="h-10 w-10 text-navy-40" aria-hidden />
        <h3 className="text-xl">메일 앱으로 내용을 넘겼습니다</h3>
        <p className="text-sm leading-[1.7] text-body">
          메일 앱이 열리지 않았다면{" "}
          <a
            href={`mailto:${company.contact.email}`}
            className="font-medium text-link underline underline-offset-4"
          >
            {company.contact.email}
          </a>
          로 직접 보내주세요. 영업일 기준 1–2일 안에 회신드립니다.
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
        <Button type="submit" size="lg" disabled={isSubmitting} className="self-start">
          문의 보내기
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Button>
        <p className="text-sm text-subtle">
          제출하면 기본 메일 앱이 열리고, 입력하신 내용이 자동으로 작성됩니다.
          별도의 개인정보 저장은 하지 않습니다.
        </p>
      </div>
    </form>
  );
}
