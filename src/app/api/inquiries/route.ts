import { NextResponse } from "next/server";
import { contactSchema } from "@/features/contact-form";

/**
 * 문의 접수 엔드포인트 — **목업이다.**
 *
 * 지금은 받은 값을 검증하고 서버 로그에만 남긴다. 어디에도 저장하지 않는다.
 * 실제로 쓰려면 아래 TODO 자리에 저장/알림을 붙인다.
 *
 * TODO(백엔드):
 *   1) 저장 — DB(예: Postgres `inquiries` 테이블) 또는 시트/CRM
 *   2) 알림 — 담당자 메일 또는 슬랙 웹훅
 *   3) 스팸 방지 — 레이트 리밋 + 허니팟(또는 캡차)
 *
 * ⚠️ 저장을 붙이는 순간 개인정보를 보관하게 된다.
 * 그때 `/privacy`의 수집 항목·보유 기간을 함께 고쳐야 한다. 지금 문구는 "저장하지 않음" 기준이다.
 */
export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "본문을 읽을 수 없습니다." },
      { status: 400 }
    );
  }

  const parsed = contactSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error: "입력값을 다시 확인해 주세요.",
        issues: parsed.error.issues.map((i) => ({
          path: i.path.join("."),
          message: i.message,
        })),
      },
      { status: 422 }
    );
  }

  // 목업이므로 저장하지 않는다. 이메일은 로그에도 남기지 않는다.
  console.info("[inquiry] 접수", {
    topic: parsed.data.topic,
    company: parsed.data.company || "-",
    length: parsed.data.message.length,
  });

  return NextResponse.json({ ok: true }, { status: 202 });
}
