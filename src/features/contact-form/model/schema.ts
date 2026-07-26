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
 * 문의를 서버로 보낸다.
 *
 * ⚠️ 예전엔 `mailto:`로 사용자의 메일 앱을 열었다. 메일 앱이 없는 환경에서는
 * 아무 일도 일어나지 않고, 보냈는지 확인할 방법도 없어서 접수 경로로는 부적절했다.
 * 지금은 `/api/inquiries`로 POST 한다(그 라우트는 아직 목업이다).
 */
export async function submitInquiry(data: ContactInput) {
  const res = await fetch("/api/inquiries", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const body = (await res.json().catch(() => null)) as
      | { error?: string }
      | null;
    throw new Error(body?.error ?? "전송에 실패했습니다.");
  }
}
