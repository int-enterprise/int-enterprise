import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .min(2, "이름을 2자 이상 입력해 주세요.")
    .max(40, "이름이 너무 깁니다."),
  company: z.string().max(80, "회사명이 너무 깁니다.").optional(),
  email: z.email("올바른 이메일 형식이 아닙니다."),
  topic: z.enum(["product", "partnership", "recruit", "press", "etc"], {
    error: "문의 유형을 선택해 주세요.",
  }),
  message: z
    .string()
    .min(10, "10자 이상 작성해 주세요.")
    .max(2000, "2000자 이내로 작성해 주세요."),
});

export type ContactInput = z.infer<typeof contactSchema>;
export type ContactTopic = ContactInput["topic"];

export const topicLabels: Record<ContactTopic, string> = {
  product: "제품 도입 문의",
  partnership: "파트너십·협업",
  recruit: "채용 지원",
  press: "취재·언론",
  etc: "기타",
};

/**
 * 폼 제출은 서버 없이 사용자의 메일 클라이언트로 넘긴다.
 * 백엔드가 생기면 이 함수 대신 Server Action을 붙이면 된다.
 */
export function buildMailto(to: string, data: ContactInput) {
  const subject = `[${topicLabels[data.topic]}] ${data.name}${
    data.company ? ` · ${data.company}` : ""
  }`;
  const body = [
    `이름: ${data.name}`,
    `회사: ${data.company || "-"}`,
    `이메일: ${data.email}`,
    `유형: ${topicLabels[data.topic]}`,
    "",
    "──────────",
    data.message,
  ].join("\n");

  return `mailto:${to}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;
}
