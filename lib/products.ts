export type Product = {
  name: string;
  shortDesc: string;
  contains: string;
  spec: string;
  description: string;
};

export type Category = {
  id: string;
  label: string;
  desc: string;
  products: Product[];
};

export const CATEGORIES: Category[] = [
  {
    id: "kimchi",
    label: "김치",
    desc: "전통 김치를 비건으로 재해석한 간편식 시리즈",
    products: [
      {
        name: "비건 볶음김치",
        shortDesc: "칼칼한 국내산 김치 81% — 불에 볶아 깊어진 맛",
        contains: "배추 81.4%, 무 17.2%",
        spec: "김치 멸균 제품 / 160g / 실온 보관 / 2년",
        description: "칼칼한 국내산 김치 81% — 불에 볶아 깊어진 맛",
      },
      {
        name: "비건 김치볶음밥",
        shortDesc: "간편하게 즐기는 비건 김치볶음밥",
        contains: "배추 81.4%, 무 17.2%",
        spec: "김치 멸균 제품 / 160g / 실온 보관 / 2년",
        description: "간편하게 즐기는 비건 김치볶음밥",
      },
      {
        name: "비건 김치전",
        shortDesc: "바삭한 겉면, 쫀득한 속 — 비건 김치전",
        contains: "배추 81.4%, 무 17.2%",
        spec: "김치 멸균 제품 / 160g / 실온 보관 / 2년",
        description: "바삭한 겉면, 쫀득한 속 — 비건 김치전",
      },
      {
        name: "비건 김치 칼국수 키트",
        shortDesc: "칼국수 3인분 키트, 100% 식물성",
        contains: "볶음김치 3개 + 건면 3개 + 소스 90g ×3",
        spec: "김치 멸균 제품 / 1,200g / 실온 보관 / 12개월",
        description: "칼국수 3인분 키트, 100% 식물성",
      },
    ],
  },
  {
    id: "bakery",
    label: "베이커리",
    desc: "100% 식물성 원료로 만든 케이크와 밀키트",
    products: [
      {
        name: "비건 말차 케이크",
        shortDesc: "녹차 파우더 15% — 은은한 말차 비건 케이크",
        contains: "녹차 파우더 15%",
        spec: "냉동 베이커리 / 300g / 냉동 -18°C 이하 / 1년",
        description: "녹차 파우더 15% — 은은한 말차 비건 케이크",
      },
      {
        name: "비건 단호박 초콜릿 케이크",
        shortDesc: "단호박 30% + 초콜릿, 의외의 완벽한 조합",
        contains: "단호박 30%",
        spec: "냉동 베이커리 / 300g / 냉동 -18°C 이하 / 1년",
        description: "단호박 30% + 초콜릿, 의외의 완벽한 조합",
      },
      {
        name: "바질 잠봉뵈르 키트",
        shortDesc: "바게트 + 비건 잠봉 + 바질 페스토 밀키트",
        contains: "바게트 100g + 비건 잠봉 60g + 비건 버터 20g + 바질 페스토 10g",
        spec: "잠봉뵈르 밀키트 / 160g / 냉동 보관 / 9개월",
        description: "바게트 + 비건 잠봉 + 바질 페스토 밀키트",
      },
      {
        name: "루꼴라 잠봉뵈르 키트",
        shortDesc: "바게트 + 비건 잠봉 + 루꼴라 페스토 밀키트",
        contains: "바게트 100g + 비건 잠봉 60g + 비건 버터 20g + 루꼴라 페스토 10g",
        spec: "잠봉뵈르 밀키트 / 160g / 냉동 보관 / 9개월",
        description: "바게트 + 비건 잠봉 + 루꼴라 페스토 밀키트",
      },
    ],
  },
  {
    id: "pizza",
    label: "피자",
    desc: "두부 치즈와 식물성 토핑의 비건 피자",
    products: [
      {
        name: "비건 페퍼로니 피자",
        shortDesc: "두부 기반 비건 페퍼로니 — 스모키한 한 판",
        contains: "두부 기반 비건 페퍼로니",
        spec: "피자 제품 / 160g / 실온 보관 / 2년",
        description: "두부 기반 비건 페퍼로니 — 스모키한 한 판",
      },
      {
        name: "비건 슬라이스 피자",
        shortDesc: "소프트 두부 치즈 32% — 한 조각으로 충분한 피자",
        contains: "소프트 두부 32%",
        spec: "냉동 보관 / 230g / 냉동 -18°C 이하 / 1년",
        description: "소프트 두부 치즈 32% — 한 조각으로 충분한 피자",
      },
    ],
  },
  {
    id: "pasta",
    label: "파스타",
    desc: "수제 뇨끼와 소스가 함께 들어간 밀키트",
    products: [
      {
        name: "시금치 뇨끼 밀키트",
        shortDesc: "시금치 뇨끼 + 크림 화이트 소스, 냉동 2인분",
        contains: "시금치 뇨끼 110g ×2 + 화이트 소스 110g ×2",
        spec: "시금치 뇨끼 / 330g / 냉동 보관 / 12개월",
        description: "시금치 뇨끼 + 크림 화이트 소스, 냉동 2인분",
      },
      {
        name: "감자 뇨끼 밀키트",
        shortDesc: "감자 뇨끼 + 토마토 소스, 냉동 2인분",
        contains: "감자 뇨끼 110g ×2 + 토마토 소스 110g ×2",
        spec: "감자 뇨끼 / 330g / 냉동 보관 / 12개월",
        description: "감자 뇨끼 + 토마토 소스, 냉동 2인분",
      },
    ],
  },
  {
    id: "riceball",
    label: "주먹밥",
    desc: "전자레인지 3분, 5가지 맛 비건 주먹밥",
    products: [
      {
        name: "비건 김치 주먹밥",
        shortDesc: "칼칼한 볶음김치가 가득, 한 입에 터지는 김치 맛",
        contains: "볶음김치",
        spec: "냉동 간편식 / 100g / 냉동 -18°C 이하 / 12개월",
        description: "칼칼한 볶음김치가 가득, 한 입에 터지는 김치 맛",
      },
      {
        name: "비건 간장버터 주먹밥",
        shortDesc: "고소한 간장버터가 밥알 사이사이에 스며든 맛",
        contains: "간장버터 소스",
        spec: "냉동 간편식 / 100g / 냉동 -18°C 이하 / 12개월",
        description: "고소한 간장버터가 밥알 사이사이에 스며든 맛",
      },
      {
        name: "비건 불고기 주먹밥",
        shortDesc: "달콤 짭조름한 식물성 불고기 소스, 밥이랑 딱",
        contains: "식물성 불고기 소스",
        spec: "냉동 간편식 / 100g / 냉동 -18°C 이하 / 12개월",
        description: "달콤 짭조름한 식물성 불고기 소스, 밥이랑 딱",
      },
      {
        name: "비건 참치마요 주먹밥",
        shortDesc: "고소하고 크리미한 비건 참치마요 필링",
        contains: "비건 참치마요",
        spec: "냉동 간편식 / 100g / 냉동 -18°C 이하 / 12개월",
        description: "고소하고 크리미한 비건 참치마요 필링",
      },
      {
        name: "비건 버섯 주먹밥",
        shortDesc: "구수하게 볶은 버섯이 가득, 깊고 담백한 맛",
        contains: "볶은 버섯",
        spec: "냉동 간편식 / 100g / 냉동 -18°C 이하 / 12개월",
        description: "구수하게 볶은 버섯이 가득, 깊고 담백한 맛",
      },
    ],
  },
  {
    id: "dessert",
    label: "디저트",
    desc: "과일 타르트부터 초코바까지, 달콤한 비건 디저트",
    products: [
      {
        name: "비건 자두 타르트",
        shortDesc: "국내산 자두 68% — 새콤달콤한 비건 타르트",
        contains: "국내산 자두 68%",
        spec: "비건 디저트 / 160g / 냉동 (냉장 7-14일) / 12개월",
        description: "국내산 자두 68% — 새콤달콤한 비건 타르트",
      },
      {
        name: "비건 복숭아 타르트",
        shortDesc: "황도 복숭아 30% — 화사하고 부드러운 타르트",
        contains: "황도 복숭아 30%",
        spec: "비건 디저트 / 160g / 냉동 (냉장 7-14일) / 12개월",
        description: "황도 복숭아 30% — 화사하고 부드러운 타르트",
      },
      {
        name: "비건 블루베리 타르트",
        shortDesc: "블루베리·라즈베리·크랜베리 믹스 32%",
        contains: "블루베리, 라즈베리, 크랜베리 32%",
        spec: "비건 디저트 / 160g / 냉동 (냉장 7-14일) / 12개월",
        description: "블루베리·라즈베리·크랜베리 믹스 32%",
      },
      {
        name: "비건 땅콩버터 초코바",
        shortDesc: "고소한 땅콩버터 + 진한 초콜릿, 비건 에너지바",
        contains: "땅콩버터, 초콜릿",
        spec: "비건 디저트 / 160g / 냉동 (냉장 7-14일) / 2년",
        description: "고소한 땅콩버터 + 진한 초콜릿, 비건 에너지바",
      },
    ],
  },
  {
    id: "sauce",
    label: "소스",
    desc: "샐러드부터 그레인볼까지 어디든 어울리는 비건 소스",
    products: [
      {
        name: "슬런치 샐러드 드레싱 5종 테스터",
        shortDesc: "5가지 드레싱을 소량으로 맛보는 테스터 세트",
        contains: "오리엔탈 / 분짜 / 레몬 드레싱 / 비건 랜치 / 발사믹",
        spec: "소스 멸균 제품 / 각 30ml / 냉장 보관 / 제조일로부터 6개월 이내 섭취 권장",
        description: "5가지 드레싱을 소량으로 맛보는 테스터 세트",
      },
      {
        name: "오리엔탈 소스",
        shortDesc: "달콤하고 감칠맛 나는 드레싱, 샐러드와 찰떡",
        contains: "오리엔탈 드레싱",
        spec: "소스 멸균 제품 / 300ml / 냉장 보관 / 제조일로부터 6개월 이내 섭취 권장",
        description: "달콤하고 감칠맛 나는 드레싱, 샐러드와 찰떡",
      },
      {
        name: "분짜 소스",
        shortDesc: "애니멀 프리 슬런치 시그니처 소스, 어디에나 잘 어울리는 만능 소스",
        contains: "분짜 소스",
        spec: "소스 멸균 제품 / 300ml / 냉장 보관 / 제조일로부터 6개월 이내 섭취 권장",
        description: "애니멀 프리 슬런치 시그니처 소스, 어디에나 잘 어울리는 만능 소스",
      },
      {
        name: "레몬 드레싱",
        shortDesc: "상큼한 레몬향, 그린 샐러드와 해산물 요리에 잘 맞음",
        contains: "레몬 드레싱",
        spec: "소스 멸균 제품 / 300ml / 냉장 보관 / 제조일로부터 6개월 이내 섭취 권장",
        description: "상큼한 레몬향, 그린 샐러드와 해산물 요리에 잘 맞음",
      },
      {
        name: "비건 랜치",
        shortDesc: "고소하고 크리미한 비건 랜치, 찍어먹어도 뿌려먹어도 맛있음",
        contains: "비건 랜치 소스",
        spec: "소스 멸균 제품 / 300ml / 냉장 보관 / 제조일로부터 6개월 이내 섭취 권장",
        description: "고소하고 크리미한 비건 랜치, 찍어먹어도 뿌려먹어도 맛있음",
      },
      {
        name: "발사믹 소스",
        shortDesc: "진하고 새콤달콤한 발사믹, 마무리 드리즐로 완성",
        contains: "발사믹 소스",
        spec: "소스 멸균 제품 / 300ml / 냉장 보관 / 제조일로부터 6개월 이내 섭취 권장",
        description: "진하고 새콤달콤한 발사믹, 마무리 드리즐로 완성",
      },
    ],
  },
  {
    id: "seaweed",
    label: "해조류",
    desc: "완도 매생이와 감태로 만든 프리미엄 해조류 식품",
    products: [
      {
        name: "매생이 트러플 리조또 키트",
        shortDesc: "완도 매생이 + 블랙 트러플, 바다의 감칠맛",
        contains: "리조또 2팩",
        spec: "멸균 제품 / 290g 또는 520g / 냉동 (냉장 7-14일) / 24개월",
        description: "완도 매생이 + 블랙 트러플, 바다의 감칠맛",
      },
      {
        name: "매생이 크림 펜네",
        shortDesc: "매생이 크림소스 + 펜네, 바다 향 크림 파스타",
        contains: "펜네 1팩 + 매생이 크림소스 1팩",
        spec: "멸균 제품 / 290g / 냉동 (냉장 7-14일) / 24개월",
        description: "매생이 크림소스 + 펜네, 바다 향 크림 파스타",
      },
      {
        name: "매생이 떡국",
        shortDesc: "매생이 떡국, 한국의 설날 전통을 담다",
        contains: "떡 1팩 + 건매생이 ×2 + 채소 육수 1포",
        spec: "멸균 제품 / 520g / 냉동 (냉장 7-14일) / 24개월",
        description: "매생이 떡국, 한국의 설날 전통을 담다",
      },
      {
        name: "매생이 페스토",
        shortDesc: "매생이 30% — 파스타·토스트·딥 소스로",
        contains: "국내산 매생이 30%",
        spec: "멸균 제품 / 140g / 냉장 보관 / 12개월",
        description: "매생이 30% — 파스타·토스트·딥 소스로",
      },
      {
        name: "감태 버터",
        shortDesc: "감태 30% — 감칠맛 가득한 비건 버터",
        contains: "국내산 감태 30%",
        spec: "감태 버터 / 140g / 냉장 보관 / 12개월",
        description: "감태 30% — 감칠맛 가득한 비건 버터",
      },
    ],
  },
];

export const CATEGORY_SLUGS = CATEGORIES.map((c) => c.id);

export function getCategoryBySlug(slug: string) {
  return CATEGORIES.find((c) => c.id === slug);
}

/** spec 문자열에서 "제품유형 / 용량 / 보관 / 소비기한" 중 용량·보관·소비기한만 추출 */
export function shortSpec(spec: string) {
  const parts = spec.split(" / ");
  return parts.length >= 4 ? parts.slice(1).join(" / ") : spec;
}
