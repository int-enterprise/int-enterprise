import { company } from "./company";

/**
 * 팀 구성원.
 *
 * 출처: 연구개발계획서(PART2 본문) 창업기업 소개 슬라이드.
 * 이름·직책·약력·사진 전부 그 문서에서 가져왔다. **지어내지 않는다.**
 * 사진은 슬라이드 좌표로 이름과 짝지어 확인한 것이다(얼굴을 잘못 붙이면 사고다).
 *
 * ⚠️ **과거 이력을 넣지 않는다.** 학력·전공·전 직장 같은 항목은 팀 소개에 적지 않는다.
 * 이름과 지금 맡은 역할까지만 보여 준다.
 */
export interface Member {
  slug: string;
  name: string;
  nameEn?: string;
  title: string;
  /** public/about/team/<slug>.png */
  photo: string;
}

export const team: readonly Member[] = [
  {
    slug: "park-hyungyu",
    name: company.ceo,
    nameEn: company.ceoNameEn,
    title: "Founder & CEO",
    photo: "/about/team/park-hyungyu.png",
  },
  {
    slug: "park-nojun",
    name: "박노준",
    title: "AI 개발 팀장",
    photo: "/about/team/park-nojun.png",
  },
  {
    slug: "jo-jinwoo",
    name: "조진우",
    title: "AI 개발",
    photo: "/about/team/jo-jinwoo.png",
  },
  {
    slug: "kang-junghyun",
    name: "강정현",
    title: "AI 개발",
    photo: "/about/team/kang-junghyun.png",
  },
] as const;

/** 화면에서 "몇 명"을 말할 때 쓰는 값. 배열 길이와 어긋나지 않게 파생시킨다. */
export const teamSize = team.length;
