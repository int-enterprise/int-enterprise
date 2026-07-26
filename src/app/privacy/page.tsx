import { buildMetadata, BreadcrumbJsonLd } from "@/shared/seo";
import { PageHero } from "@/widgets/page-hero";
import { LegalDoc, type LegalSection } from "@/widgets/legal";
import { company } from "@/entities/company";

export const metadata = buildMetadata({
  title: "개인정보처리방침",
  description:
    "(주)인트는 정보주체의 개인정보를 중요시하며, 「개인정보 보호법」을 준수합니다. 수집 항목·이용 목적·보유 기간·권리 행사 방법을 안내합니다.",
  path: "/privacy",
  keywords: ["(주)인트 개인정보처리방침", "Int Corp privacy", "intcorp 개인정보"],
});

const sections: LegalSection[] = [
  {
    heading: "총칙",
    bodies: [
      `${company.legalNameKo}(이하 "회사")는 정보주체의 자유와 권리를 보호하기 위해 「개인정보 보호법」 및 관계 법령에서 정한 의무를 준수하며, 본 개인정보처리방침을 통해 회사가 수집·처리하는 개인정보의 항목, 목적, 보유 및 이용 기간, 처리 방법 등을 안내합니다.`,
    ],
  },
  {
    heading: "수집하는 개인정보 항목",
    bodies: [
      "회사는 서비스 도입 문의, 채용 지원, 파트너십 검토 등의 목적을 위해 아래와 같은 최소한의 개인정보를 수집합니다.",
    ],
    items: [
      "필수: 이름, 이메일 주소, 소속(회사명), 문의 내용",
      "선택: 직책, 연락처(전화번호), 직무 분야",
      "자동 수집: 접속 로그(IP, 접속 시점), 쿠키, 브라우저 정보 등 서비스 이용 기록",
    ],
  },
  {
    heading: "개인정보의 수집 및 이용 목적",
    items: [
      "도입·PoC·파트너십 문의 응대 및 후속 커뮤니케이션",
      "취재·인터뷰 등 언론 관련 요청 응대",
      "채용 지원 검토 및 채용 프로세스 진행",
      "서비스·웹사이트 운영 및 개선, 보안 사고 대응",
      "법령상 의무 이행 및 분쟁 대응",
    ],
  },
  {
    heading: "개인정보의 보유 및 이용 기간",
    bodies: [
      "회사는 정보주체로부터 동의받은 보유·이용 기간 또는 관계 법령에 따른 보유·이용 기간이 종료되면 지체 없이 해당 개인정보를 파기합니다.",
    ],
    items: [
      "문의 응대: 응대 종료 후 3년",
      "채용 지원: 채용 절차 종료 후 1년 (단, 입사 시 인사관리 목적으로 별도 보관)",
      "관계 법령에 따라 보존이 필요한 정보: 해당 법령에서 정한 기간",
    ],
  },
  {
    heading: "개인정보의 제3자 제공",
    bodies: [
      "회사는 정보주체의 동의, 법률의 특별한 규정 등 「개인정보 보호법」 제17조에 해당하는 경우 외에는 개인정보를 제3자에게 제공하지 않습니다.",
    ],
  },
  {
    heading: "개인정보 처리의 위탁",
    bodies: [
      "회사는 서비스 운영을 위해 일부 업무를 외부 전문 업체에 위탁할 수 있으며, 위탁 시 위탁받는 자, 위탁 업무 내용을 공개하고 「개인정보 보호법」에 따라 안전하게 관리될 수 있도록 필요한 사항을 규정합니다.",
    ],
  },
  {
    heading: "정보주체의 권리와 행사 방법",
    bodies: [
      "정보주체는 언제든지 자신의 개인정보 열람·정정·삭제·처리 정지를 회사에 요청할 수 있습니다. 본 권리는 정보주체의 법정대리인이나 위임을 받은 자 등 대리인을 통해 행사하실 수 있습니다.",
    ],
    items: [
      `요청 채널: 이메일 ${company.contact.email}`,
      "회사는 요청을 받은 날로부터 10일 이내에 처리 결과를 알려드립니다.",
    ],
  },
  {
    heading: "개인정보의 안전성 확보 조치",
    items: [
      "관리적 조치: 내부 관리 계획 수립·시행, 직원 정기 교육",
      "기술적 조치: 접근 권한 관리, 접근 통제 시스템 설치, 고유 식별 정보 등의 암호화",
      "물리적 조치: 자료 보관 장소의 접근 통제",
    ],
  },
  {
    heading: "개인정보 보호책임자",
    items: [
      `개인정보 보호책임자: ${company.ceo} (대표)`,
      `연락처: ${company.contact.email} · ${company.contact.phone}`,
    ],
  },
  {
    heading: "개인정보처리방침의 변경",
    bodies: [
      "본 개인정보처리방침의 내용이 추가·삭제 및 수정되는 경우, 변경 사항의 시행 7일 전부터 공지사항을 통해 안내드립니다. 다만, 정보주체의 권리에 중대한 변경이 발생하는 경우에는 최소 30일 전에 공지합니다.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "홈", url: "/" },
          { name: "개인정보처리방침", url: "/privacy" },
        ]}
      />
      <PageHero
        crumbs={[{ label: "개인정보처리방침" }]}
        eyebrow="Legal"
        title="개인정보처리방침"
        description="(주)인트는 정보주체의 권리와 자유를 존중하며, 「개인정보 보호법」 및 관계 법령을 준수합니다."
      />
      <LegalDoc effectiveDate="2026년 5월 1일" sections={sections} />
    </>
  );
}
