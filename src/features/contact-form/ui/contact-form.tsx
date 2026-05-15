"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { CheckCircle2, Send } from "lucide-react";
import { Button, Input, Label, Textarea } from "@/shared/ui";
import { company } from "@/entities/company";
import {
  contactSchema,
  topicLabels,
  type ContactInput,
} from "../model/schema";
import { TopicChips } from "./topic-chips";

function buildMailto(data: ContactInput) {
  const subject = `[${topicLabels[data.topic]}] ${data.name}${
    data.company ? ` / ${data.company}` : ""
  } 문의`;
  const body = [
    `이름: ${data.name}`,
    `회사: ${data.company ?? "-"}`,
    `이메일: ${data.email}`,
    `유형: ${topicLabels[data.topic]}`,
    "",
    "─────",
    data.message,
  ].join("\n");
  return `mailto:${company.contact.email}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;
}

export function ContactForm() {
  const form = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      topic: "sales",
      name: "",
      company: "",
      email: "",
      message: "",
    },
    mode: "onSubmit",
  });

  const mutation = useMutation({
    mutationFn: async (data: ContactInput) => {
      await new Promise((r) => setTimeout(r, 300));
      if (typeof window !== "undefined") {
        window.location.href = buildMailto(data);
      }
      return data;
    },
  });

  if (mutation.isSuccess) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-[20px] border border-mint/40 bg-mint-pale p-10 text-center">
        <CheckCircle2 className="h-12 w-12 text-mint-deep" />
        <div>
          <h3 className="text-lg font-semibold text-ink">메일을 보내드렸어요.</h3>
          <p className="mt-2 text-sm text-muted">
            메일 앱이 열리지 않으면{" "}
            <a
              className="font-medium text-ink underline underline-offset-4"
              href={`mailto:${company.contact.email}`}
            >
              {company.contact.email}
            </a>
            로 직접 보내주세요.
          </p>
        </div>
        <Button variant="ghost" onClick={() => mutation.reset()}>
          새로 작성하기
        </Button>
      </div>
    );
  }

  return (
    <form
      noValidate
      onSubmit={form.handleSubmit((d) => mutation.mutate(d))}
      className="flex flex-col gap-6"
    >
      <TopicChips
        value={form.watch("topic")}
        onChange={(v) =>
          form.setValue("topic", v, {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true,
          })
        }
      />

      <div className="grid gap-6 sm:grid-cols-2">
        <Field
          label="이름"
          error={form.formState.errors.name?.message}
          required
        >
          <Input
            placeholder="홍길동"
            autoComplete="name"
            {...form.register("name")}
          />
        </Field>
        <Field
          label="회사명"
          error={form.formState.errors.company?.message}
        >
          <Input
            placeholder="(선택)"
            autoComplete="organization"
            {...form.register("company")}
          />
        </Field>
      </div>

      <Field
        label="이메일"
        error={form.formState.errors.email?.message}
        required
      >
        <Input
          type="email"
          placeholder="name@company.com"
          autoComplete="email"
          {...form.register("email")}
        />
      </Field>

      <Field
        label="문의 내용"
        error={form.formState.errors.message?.message}
        required
      >
        <Textarea
          rows={6}
          placeholder="어떤 도움이 필요하신가요? 도입 검토 단계, 사용 환경 등을 함께 적어주시면 빠르게 안내드릴 수 있어요."
          {...form.register("message")}
        />
      </Field>

      <Button
        type="submit"
        size="lg"
        variant="primary"
        disabled={mutation.isPending}
        className="self-start"
      >
        <Send className="h-4 w-4" />
        {mutation.isPending ? "전송 준비 중…" : "문의 보내기"}
      </Button>

      <p className="text-xs text-muted">
        제출 시 기본 메일 앱이 열리며, 입력하신 내용으로 자동 작성됩니다.
      </p>
    </form>
  );
}

function Field({
  label,
  required,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <Label>
        {label}
        {required && <span className="ml-1 text-mint-deep">*</span>}
      </Label>
      {children}
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
}
