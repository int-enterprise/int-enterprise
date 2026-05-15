import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .min(2, "이름을 2자 이상 입력해 주세요.")
    .max(40, "이름이 너무 깁니다."),
  company: z.string().max(80, "회사명이 너무 깁니다.").optional(),
  email: z.string().email("올바른 이메일 형식이 아닙니다."),
  topic: z.enum(["sales", "partnership", "press", "etc"], {
    error: "문의 유형을 선택해 주세요.",
  }),
  message: z
    .string()
    .min(10, "10자 이상 작성해 주세요.")
    .max(2000, "2000자 이내로 작성해 주세요."),
});

export type ContactInput = z.infer<typeof contactSchema>;

export const topicLabels: Record<ContactInput["topic"], string> = {
  sales: "도입/제품 문의",
  partnership: "파트너십·협업",
  press: "취재/언론",
  etc: "기타",
};
