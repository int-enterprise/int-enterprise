import Image from "next/image";
import { Section, SectionHeader } from "@/shared/ui";
import { team } from "@/entities/company";

/**
 * 팀 소개.
 *
 * ⚠️ 서강대학교를 언급하지 않는다(대표 지시로 사이트 전체에서 뺐다).
 *
 * 사진은 인물 위주로 크게 잡는다. 카드에 작게 넣으면 아무도 얼굴을 안 본다.
 */
export function TeamSection() {
  return (
    <Section rhythm="large" id="team">
      <SectionHeader
        eyebrow="Team"
        title="팀 소개"
        description="한 사람이 하나의 축을 온전히 맡습니다."
      />

      <ul className="mt-14 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
        {team.map((member) => (
          <li key={member.slug} className="flex flex-col gap-5">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-lg bg-canvas-2">
              {/* ⚠️ quality를 지정한다. next/image 기본값 75는 인물 사진에서
                  원본보다 눈에 띄게 뭉개진다. sizes도 실제 렌더 폭(4열 ≈ 300px)에 맞춘다. */}
              <Image
                src={member.photo}
                alt={`${member.name} ${member.title}`}
                fill
                quality={92}
                sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 300px"
                className="object-cover object-top"
              />
            </div>

            {/* ⚠️ 학력·전공·전 직장을 적지 않는다. 이름과 지금 역할까지만. */}
            <div className="flex flex-col gap-1 border-t border-line pt-4">
              <p className="text-xl font-bold tracking-[-0.02em] text-heading">
                {member.name}
              </p>
              <p className="font-mono text-xs text-accent">{member.title}</p>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}
