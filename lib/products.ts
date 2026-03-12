export type LocaleText = { ko: string; en: string; ru: string };

export type Product = {
  name: LocaleText;
  shortDesc: LocaleText;
  contains: LocaleText;
  spec: LocaleText;
  description: string | LocaleText;
};

export type Category = {
  id: string;
  label: string;
  desc: string | LocaleText;
  products: Product[];
};

/** locale에 맞는 문구 선택 (문자열이면 그대로, 객체면 lang → en → ko 순 fallback) */
export function getLocalizedText(
  val: string | LocaleText,
  lang: string
): string {
  if (typeof val === "string") return val;
  const L = val as LocaleText;
  return L[lang as keyof LocaleText] ?? L.en ?? L.ko;
}

export const CATEGORIES: Category[] = [
  {
    id: "kimchi",
    label: "김치",
    desc: {
      ko: "전통 김치를 비건으로 재해석한 간편식 시리즈",
      en: "Vegan convenience food series reinterpreting traditional kimchi",
      ru: "Серия веганских полуфабрикатов — переосмысление традиционного кимчи",
    },
    products: [
      {
        name: { ko: "비건 볶음김치", en: "Vegan Stir-Fried Kimchi", ru: "Веганское жареное кимчи" },
        shortDesc: { ko: "칼칼한 국내산 김치 81% — 불에 볶아 깊어진 맛", en: "81% domestic stir-fried kimchi — deeper flavor from the pan", ru: "81% жареное кимчи — насыщенный вкус с огня" },
        contains: { ko: "배추 81.4%, 무 17.2%", en: "Napa cabbage 81.4%, radish 17.2%", ru: "Пекинская капуста 81,4%, редис 17,2%" },
        spec: { ko: "김치 멸균 제품 / 160g / 실온 보관 / 2년", en: "Kimchi sterilized / 160g / Room temp / 2 years", ru: "Кимчи стерилизованный / 160г / Комнатная температура / 2 года" },
        description: {
          ko: "칼칼한 국내산 김치 81% — 불에 볶아 깊어진 맛",
          en: "81% domestic stir-fried kimchi — deeper flavor from the pan",
          ru: "81% жареное кимчи — насыщенный вкус с огня",
        },
      },
      {
        name: { ko: "비건 김치볶음밥", en: "Vegan Kimchi Fried Rice", ru: "Веганский жареный рис с кимчи" },
        shortDesc: { ko: "간편하게 즐기는 비건 김치볶음밥", en: "Easy vegan kimchi fried rice", ru: "Веганский жареный рис с кимчи" },
        contains: { ko: "배추 81.4%, 무 17.2%", en: "Napa cabbage 81.4%, radish 17.2%", ru: "Пекинская капуста 81,4%, редис 17,2%" },
        spec: { ko: "김치 멸균 제품 / 160g / 실온 보관 / 2년", en: "Kimchi sterilized / 160g / Room temp / 2 years", ru: "Кимчи стерилизованный / 160г / Комнатная температура / 2 года" },
        description: {
          ko: "간편하게 즐기는 비건 김치볶음밥",
          en: "Easy vegan kimchi fried rice",
          ru: "Веганский жареный рис с кимчи",
        },
      },
      {
        name: { ko: "비건 김치전", en: "Vegan Kimchi Pancake", ru: "Веганский блин с кимчи" },
        shortDesc: { ko: "바삭한 겉면, 쫀득한 속 — 비건 김치전", en: "Crispy outside, chewy inside — vegan kimchi pancake", ru: "Хрустящий снаружи, мягкий внутри — веганский блин с кимчи" },
        contains: { ko: "배추 81.4%, 무 17.2%", en: "Napa cabbage 81.4%, radish 17.2%", ru: "Пекинская капуста 81,4%, редис 17,2%" },
        spec: { ko: "김치 멸균 제품 / 160g / 실온 보관 / 2년", en: "Kimchi sterilized / 160g / Room temp / 2 years", ru: "Кимчи стерилизованный / 160г / Комнатная температура / 2 года" },
        description: {
          ko: "바삭한 겉면, 쫀득한 속 — 비건 김치전",
          en: "Crispy outside, chewy inside — vegan kimchi pancake",
          ru: "Хрустящий снаружи, мягкий внутри — веганский блин с кимчи",
        },
      },
      {
        name: { ko: "비건 김치 칼국수 키트", en: "Vegan Kimchi Kalguksu Kit", ru: "Веганский набор Кальгуксу с кимчи" },
        shortDesc: { ko: "칼국수 3인분 키트, 100% 식물성", en: "Knife-cut noodle kit for 3, 100% plant-based", ru: "Набор лапши на 3 порции, 100% растительный" },
        contains: { ko: "볶음김치 3개 + 건면 3개 + 소스 90g ×3", en: "Stir-fried kimchi ×3 + dried noodles ×3 + sauce 90g ×3", ru: "Жареное кимчи ×3 + сухая лапша ×3 + соус 90г ×3" },
        spec: { ko: "김치 멸균 제품 / 1,200g / 실온 보관 / 12개월", en: "Kimchi sterilized / 1,200g / Room temp / 12 months", ru: "Кимчи стерилизованный / 1200г / Комнатная температура / 12 месяцев" },
        description: {
          ko: "칼국수 3인분 키트, 100% 식물성",
          en: "Knife-cut noodle kit for 3, 100% plant-based",
          ru: "Набор лапши на 3 порции, 100% растительный",
        },
      },
    ],
  },
  {
    id: "bakery",
    label: "베이커리",
    desc: {
      ko: "100% 식물성 원료로 만든 케이크와 밀키트",
      en: "100% plant-based cakes and meal kits",
      ru: "100% растительные торты и наборы блюд",
    },
    products: [
      {
        name: { ko: "비건 말차 케이크", en: "Vegan Matcha Cake", ru: "Веганский торт матча" },
        shortDesc: { ko: "녹차 파우더 15% — 은은한 말차 비건 케이크", en: "Green tea powder 15% — subtle matcha vegan cake", ru: "Зелёный чай 15% — нежный веганский торт с матча" },
        contains: { ko: "녹차 파우더 15%", en: "Matcha powder 15%", ru: "Порошок матча 15%" },
        spec: { ko: "냉동 베이커리 / 300g / 냉동 -18°C 이하 / 1년", en: "Frozen bakery / 300g / Frozen -18°C or below / 1 year", ru: "Замороженная выпечка / 300г / Заморозка -18°C и ниже / 1 год" },
        description: {
          ko: "녹차 파우더 15% — 은은한 말차 비건 케이크",
          en: "Green tea powder 15% — subtle matcha vegan cake",
          ru: "Зелёный чай 15% — нежный веганский торт с матча",
        },
      },
      {
        name: { ko: "비건 단호박 초콜릿 케이크", en: "Vegan Pumpkin Chocolate Cake", ru: "Веганский тыквенно-шоколадный торт" },
        shortDesc: { ko: "단호박 30% + 초콜릿, 의외의 완벽한 조합", en: "30% pumpkin + chocolate, an unexpectedly perfect match", ru: "30% тыква + шоколад — неожиданно идеальное сочетание" },
        contains: { ko: "단호박 30%", en: "Pumpkin 30%", ru: "Тыква 30%" },
        spec: { ko: "냉동 베이커리 / 300g / 냉동 -18°C 이하 / 1년", en: "Frozen bakery / 300g / Frozen -18°C or below / 1 year", ru: "Замороженная выпечка / 300г / Заморозка -18°C и ниже / 1 год" },
        description: {
          ko: "단호박 30% + 초콜릿, 의외의 완벽한 조합",
          en: "30% pumpkin + chocolate, an unexpectedly perfect match",
          ru: "30% тыква + шоколад — неожиданно идеальное сочетание",
        },
      },
      {
        name: { ko: "바질 잠봉뵈르 키트", en: "Basil Jambon-Beurre Kit", ru: "Набор базилик–жамбон-беар" },
        shortDesc: { ko: "바게트 + 비건 잠봉 + 바질 페스토 밀키트", en: "Baguette + vegan jambon + basil pesto meal kit", ru: "Багет + веганская ветчина + песто с базиликом, набор" },
        contains: { ko: "바게트 100g + 비건 잠봉 60g + 비건 버터 20g + 바질 페스토 10g", en: "Baguette 100g + vegan jambon 60g + vegan butter 20g + basil pesto 10g", ru: "Багет 100г + веганский жамбон 60г + веганское масло 20г + песто базилик 10г" },
        spec: { ko: "잠봉뵈르 밀키트 / 160g / 냉동 보관 / 9개월", en: "Jambon-beurre kit / 160g / Frozen / 9 months", ru: "Набор жамбон-беар / 160г / Заморозка / 9 месяцев" },
        description: {
          ko: "바게트 + 비건 잠봉 + 바질 페스토 밀키트",
          en: "Baguette + vegan jambon + basil pesto meal kit",
          ru: "Багет + веганская ветчина + песто с базиликом, набор",
        },
      },
      {
        name: { ko: "루꼴라 잠봉뵈르 키트", en: "Rucola Jambon-Beurre Kit", ru: "Набор руккола–жамбон-беар" },
        shortDesc: { ko: "바게트 + 비건 잠봉 + 루꼴라 페스토 밀키트", en: "Baguette + vegan jambon + rucola pesto meal kit", ru: "Багет + веганская ветчина + руккола песто, набор" },
        contains: { ko: "바게트 100g + 비건 잠봉 60g + 비건 버터 20g + 루꼴라 페스토 10g", en: "Baguette 100g + vegan jambon 60g + vegan butter 20g + rucola pesto 10g", ru: "Багет 100г + веганский жамбон 60г + веганское масло 20г + песто руккола 10г" },
        spec: { ko: "잠봉뵈르 밀키트 / 160g / 냉동 보관 / 9개월", en: "Jambon-beurre kit / 160g / Frozen / 9 months", ru: "Набор жамбон-беар / 160г / Заморозка / 9 месяцев" },
        description: {
          ko: "바게트 + 비건 잠봉 + 루꼴라 페스토 밀키트",
          en: "Baguette + vegan jambon + rucola pesto meal kit",
          ru: "Багет + веганская ветчина + руккола песто, набор",
        },
      },
    ],
  },
  {
    id: "pizza",
    label: "피자",
    desc: {
      ko: "두부 치즈와 식물성 토핑의 비건 피자",
      en: "Vegan pizza with tofu cheese and plant-based toppings",
      ru: "Веганская пицца с тофу-сыром и растительными топпингами",
    },
    products: [
      {
        name: { ko: "비건 페퍼로니 피자", en: "Vegan Pepperoni Pizza", ru: "Веганская пицца пепперони" },
        shortDesc: { ko: "두부 기반 비건 페퍼로니 — 스모키한 한 판", en: "Tofu-based vegan pepperoni — one smoky pie", ru: "Веганский пепперони на тофу — копчёная пицца" },
        contains: { ko: "두부 기반 비건 페퍼로니", en: "Tofu-based vegan pepperoni", ru: "Веганский пепперони на тофу" },
        spec: { ko: "피자 제품 / 160g / 실온 보관 / 2년", en: "Pizza product / 160g / Room temp / 2 years", ru: "Пицца / 160г / Комнатная температура / 2 года" },
        description: {
          ko: "두부 기반 비건 페퍼로니 — 스모키한 한 판",
          en: "Tofu-based vegan pepperoni — one smoky pie",
          ru: "Веганский пепперони на тофу — копчёная пицца",
        },
      },
      {
        name: { ko: "비건 슬라이스 피자", en: "Vegan Slice Pizza", ru: "Веганская пицца кусочками" },
        shortDesc: { ko: "소프트 두부 치즈 32% — 한 조각으로 충분한 피자", en: "Soft tofu cheese 32% — one slice is enough", ru: "Мягкий тофу-сыр 32% — одного куска достаточно" },
        contains: { ko: "소프트 두부 32%", en: "Soft tofu 32%", ru: "Мягкий тофу 32%" },
        spec: { ko: "냉동 보관 / 230g / 냉동 -18°C 이하 / 1년", en: "Frozen / 230g / -18°C or below / 1 year", ru: "Заморозка / 230г / -18°C и ниже / 1 год" },
        description: {
          ko: "소프트 두부 치즈 32% — 한 조각으로 충분한 피자",
          en: "Soft tofu cheese 32% — one slice is enough",
          ru: "Мягкий тофу-сыр 32% — одного куска достаточно",
        },
      },
    ],
  },
  {
    id: "pasta",
    label: "파스타",
    desc: {
      ko: "수제 뇨끼와 소스가 함께 들어간 밀키트",
      en: "Meal kits with handmade gnocchi and sauce",
      ru: "Наборы с домашней ньокки и соусом",
    },
    products: [
      {
        name: { ko: "시금치 뇨끼 밀키트", en: "Spinach Gnocchi Meal Kit", ru: "Набор ньокки со шпинатом" },
        shortDesc: { ko: "시금치 뇨끼 + 크림 화이트 소스, 냉동 2인분", en: "Spinach gnocchi + cream white sauce, frozen 2 servings", ru: "Ньокки со шпинатом + сливочный соус, 2 порции заморозка" },
        contains: { ko: "시금치 뇨끼 110g ×2 + 화이트 소스 110g ×2", en: "Spinach gnocchi 110g ×2 + white sauce 110g ×2", ru: "Ньокки со шпинатом 110г ×2 + белый соус 110г ×2" },
        spec: { ko: "시금치 뇨끼 / 330g / 냉동 보관 / 12개월", en: "Spinach gnocchi / 330g / Frozen / 12 months", ru: "Ньокки со шпинатом / 330г / Заморозка / 12 месяцев" },
        description: {
          ko: "시금치 뇨끼 + 크림 화이트 소스, 냉동 2인분",
          en: "Spinach gnocchi + cream white sauce, frozen 2 servings",
          ru: "Ньокки со шпинатом + сливочный соус, 2 порции заморозка",
        },
      },
      {
        name: { ko: "감자 뇨끼 밀키트", en: "Potato Gnocchi Meal Kit", ru: "Набор картофельных ньокки" },
        shortDesc: { ko: "감자 뇨끼 + 토마토 소스, 냉동 2인분", en: "Potato gnocchi + tomato sauce, frozen 2 servings", ru: "Картофельные ньокки + томатный соус, 2 порции заморозка" },
        contains: { ko: "감자 뇨끼 110g ×2 + 토마토 소스 110g ×2", en: "Potato gnocchi 110g ×2 + tomato sauce 110g ×2", ru: "Картофельные ньокки 110г ×2 + томатный соус 110г ×2" },
        spec: { ko: "감자 뇨끼 / 330g / 냉동 보관 / 12개월", en: "Potato gnocchi / 330g / Frozen / 12 months", ru: "Картофельные ньокки / 330г / Заморозка / 12 месяцев" },
        description: {
          ko: "감자 뇨끼 + 토마토 소스, 냉동 2인분",
          en: "Potato gnocchi + tomato sauce, frozen 2 servings",
          ru: "Картофельные ньокки + томатный соус, 2 порции заморозка",
        },
      },
    ],
  },
  {
    id: "riceball",
    label: "주먹밥",
    desc: {
      ko: "전자레인지 3분, 5가지 맛 비건 주먹밥",
      en: "Microwave 3 min, 5 flavors vegan rice balls",
      ru: "3 мин в микроволновке, 5 вкусов веганских рисовых шариков",
    },
    products: [
      {
        name: { ko: "비건 김치 주먹밥", en: "Vegan Kimchi Rice Ball", ru: "Веганский рисовый шарик с кимчи" },
        shortDesc: { ko: "칼칼한 볶음김치가 가득, 한 입에 터지는 김치 맛", en: "Loaded with stir-fried kimchi, bursting with flavor", ru: "Много жареного кимчи, насыщенный вкус" },
        contains: { ko: "볶음김치", en: "Stir-fried kimchi", ru: "Жареное кимчи" },
        spec: { ko: "냉동 간편식 / 100g / 냉동 -18°C 이하 / 12개월", en: "Frozen meal / 100g / Frozen -18°C or below / 12 months", ru: "Замороженный продукт / 100г / -18°C и ниже / 12 месяцев" },
        description: {
          ko: "칼칼한 볶음김치가 가득, 한 입에 터지는 김치 맛",
          en: "Loaded with stir-fried kimchi, bursting with flavor",
          ru: "Много жареного кимчи, насыщенный вкус",
        },
      },
      {
        name: { ko: "비건 간장버터 주먹밥", en: "Vegan Soy Butter Rice Ball", ru: "Веганский рисовый шарик соевый масляный" },
        shortDesc: { ko: "고소한 간장버터가 밥알 사이사이에 스며든 맛", en: "Savory soy butter seeping through every grain", ru: "Пряный соевый масляный соус между зёрнами риса" },
        contains: { ko: "간장버터 소스", en: "Soy butter sauce", ru: "Соево-масляный соус" },
        spec: { ko: "냉동 간편식 / 100g / 냉동 -18°C 이하 / 12개월", en: "Frozen meal / 100g / Frozen -18°C or below / 12 months", ru: "Замороженный продукт / 100г / -18°C и ниже / 12 месяцев" },
        description: {
          ko: "고소한 간장버터가 밥알 사이사이에 스며든 맛",
          en: "Savory soy butter seeping through every grain",
          ru: "Пряный соевый масляный соус между зёрнами риса",
        },
      },
      {
        name: { ko: "비건 불고기 주먹밥", en: "Vegan Bulgogi Rice Ball", ru: "Веганский рисовый шарик бульгоги" },
        shortDesc: { ko: "달콤 짭조름한 식물성 불고기 소스, 밥이랑 딱", en: "Sweet-salty plant-based bulgogi sauce, perfect with rice", ru: "Сладко-солёный растительный соус бульгоги, с рисом" },
        contains: { ko: "식물성 불고기 소스", en: "Plant-based bulgogi sauce", ru: "Растительный соус бульгоги" },
        spec: { ko: "냉동 간편식 / 100g / 냉동 -18°C 이하 / 12개월", en: "Frozen meal / 100g / Frozen -18°C or below / 12 months", ru: "Замороженный продукт / 100г / -18°C и ниже / 12 месяцев" },
        description: {
          ko: "달콤 짭조름한 식물성 불고기 소스, 밥이랑 딱",
          en: "Sweet-salty plant-based bulgogi sauce, perfect with rice",
          ru: "Сладко-солёный растительный соус бульгоги, с рисом",
        },
      },
      {
        name: { ko: "비건 참치마요 주먹밥", en: "Vegan Tuna Mayo Rice Ball", ru: "Веганский рисовый шарик тунец-майонез" },
        shortDesc: { ko: "고소하고 크리미한 비건 참치마요 필링", en: "Savory, creamy vegan tuna mayo filling", ru: "Кремовая веганская начинка тунец-майонез" },
        contains: { ko: "비건 참치마요", en: "Vegan tuna mayo", ru: "Веганский тунец-майонез" },
        spec: { ko: "냉동 간편식 / 100g / 냉동 -18°C 이하 / 12개월", en: "Frozen meal / 100g / Frozen -18°C or below / 12 months", ru: "Замороженный продукт / 100г / -18°C и ниже / 12 месяцев" },
        description: {
          ko: "고소하고 크리미한 비건 참치마요 필링",
          en: "Savory, creamy vegan tuna mayo filling",
          ru: "Кремовая веганская начинка тунец-майонез",
        },
      },
      {
        name: { ko: "비건 버섯 주먹밥", en: "Vegan Mushroom Rice Ball", ru: "Веганский рисовый шарик с грибами" },
        shortDesc: { ko: "구수하게 볶은 버섯이 가득, 깊고 담백한 맛", en: "Hearty stir-fried mushrooms, deep and mild", ru: "Много обжаренных грибов, глубокий и мягкий вкус" },
        contains: { ko: "볶은 버섯", en: "Stir-fried mushrooms", ru: "Обжаренные грибы" },
        spec: { ko: "냉동 간편식 / 100g / 냉동 -18°C 이하 / 12개월", en: "Frozen meal / 100g / Frozen -18°C or below / 12 months", ru: "Замороженный продукт / 100г / -18°C и ниже / 12 месяцев" },
        description: {
          ko: "구수하게 볶은 버섯이 가득, 깊고 담백한 맛",
          en: "Hearty stir-fried mushrooms, deep and mild",
          ru: "Много обжаренных грибов, глубокий и мягкий вкус",
        },
      },
    ],
  },
  {
    id: "dessert",
    label: "디저트",
    desc: {
      ko: "과일 타르트부터 초코바까지, 달콤한 비건 디저트",
      en: "From fruit tarts to chocolate bars, sweet vegan desserts",
      ru: "От фруктовых тартов до шоколадных батончиков — веганские десерты",
    },
    products: [
      {
        name: { ko: "비건 자두 타르트", en: "Vegan Plum Tart", ru: "Веганский тарт со сливой" },
        shortDesc: { ko: "국내산 자두 68% — 새콤달콤한 비건 타르트", en: "68% domestic plum — sweet-tart vegan tart", ru: "68% местная слива — кисло-сладкий веганский тарт" },
        contains: { ko: "국내산 자두 68%", en: "Domestic plum 68%", ru: "Местная слива 68%" },
        spec: { ko: "비건 디저트 / 160g / 냉동 (냉장 7-14일) / 12개월", en: "Vegan dessert / 160g / Frozen (fridge 7-14 days) / 12 months", ru: "Веганский десерт / 160г / Заморозка (холодильник 7-14 дней) / 12 месяцев" },
        description: {
          ko: "국내산 자두 68% — 새콤달콤한 비건 타르트",
          en: "68% domestic plum — sweet-tart vegan tart",
          ru: "68% местная слива — кисло-сладкий веганский тарт",
        },
      },
      {
        name: { ko: "비건 복숭아 타르트", en: "Vegan Peach Tart", ru: "Веганский тарт с персиком" },
        shortDesc: { ko: "황도 복숭아 30% 함유, 비건 타르트 800g", en: "Yellow peach 30% vegan tart 800g", ru: "Веганский тарт с жёлтым персиком 30%, 800г" },
        contains: { ko: "황도 복숭아 30%", en: "Yellow peach 30%", ru: "Жёлтый персик 30%" },
        spec: { ko: "비건 디저트 / 800g / 냉동 (냉장 7-14일) / 12개월", en: "Vegan dessert / 800g / Frozen (fridge 7-14 days) / 12 months", ru: "Веганский десерт / 800г / Заморозка (холодильник 7-14 дней) / 12 месяцев" },
        description: {
          ko: "황도 복숭아 30% 함유, 비건 타르트 800g",
          en: "Yellow peach 30% vegan tart 800g",
          ru: "Веганский тарт с жёлтым персиком 30%, 800г",
        },
      },
      {
        name: { ko: "비건 블루베리 타르트", en: "Vegan Blueberry Tart", ru: "Веганский тарт с черникой" },
        shortDesc: { ko: "블루베리·라즈베리·크랜베리 32% 함유 타르트 800g", en: "Blueberry·raspberry·cranberry 32% tart 800g", ru: "Тарт с черникой·малиной·клюквой 32%, 800г" },
        contains: { ko: "블루베리, 라즈베리, 크랜베리 32%", en: "Blueberry, raspberry, cranberry 32%", ru: "Черника, малина, клюква 32%" },
        spec: { ko: "비건 디저트 / 800g / 냉동 (냉장 7-14일) / 12개월", en: "Vegan dessert / 800g / Frozen (fridge 7-14 days) / 12 months", ru: "Веганский десерт / 800г / Заморозка (холодильник 7-14 дней) / 12 месяцев" },
        description: {
          ko: "블루베리·라즈베리·크랜베리 32% 함유 타르트 800g",
          en: "Blueberry·raspberry·cranberry 32% tart 800g",
          ru: "Тарт с черникой·малиной·клюквой 32%, 800г",
        },
      },
      {
        name: { ko: "비건 땅콩버터 초코바", en: "Vegan Peanut Butter Chocolate Bar", ru: "Веганский батончик арахис-шоколад" },
        shortDesc: { ko: "고소한 땅콩버터 + 진한 초콜릿, 비건 에너지바", en: "Savory peanut butter + dark chocolate, vegan energy bar", ru: "Арахисовая паста + тёмный шоколад, веганский батончик" },
        contains: { ko: "땅콩버터, 초콜릿", en: "Peanut butter, chocolate", ru: "Арахисовая паста, шоколад" },
        spec: { ko: "비건 디저트 / 160g / 냉동 (냉장 7-14일) / 2년", en: "Vegan dessert / 160g / Frozen (fridge 7-14 days) / 2 years", ru: "Веганский десерт / 160г / Заморозка (холодильник 7-14 дней) / 2 года" },
        description: {
          ko: "고소한 땅콩버터 + 진한 초콜릿, 비건 에너지바",
          en: "Savory peanut butter + dark chocolate, vegan energy bar",
          ru: "Арахисовая паста + тёмный шоколад, веганский батончик",
        },
      },
    ],
  },
  {
    id: "sauce",
    label: "소스",
    desc: {
      ko: "샐러드부터 그레인볼까지 어디든 어울리는 비건 소스",
      en: "Vegan sauces for salad, grain bowls and more",
      ru: "Веганские соусы для салатов, боулзов и не только",
    },
    products: [
      {
        name: { ko: "슬런치 샐러드 드레싱 5종 테스터", en: "Slunch Salad Dressing 5-Pack Tester", ru: "Тестер 5 видов дрессинга Slunch" },
        shortDesc: { ko: "5가지 드레싱을 소량으로 맛보는 테스터 세트", en: "Taster set of 5 dressings in small portions", ru: "Тестер-набор из 5 соусов в малых объёмах" },
        contains: { ko: "오리엔탈 / 분짜 / 레몬 드레싱 / 비건 랜치 / 발사믹", en: "Oriental / Buncha / Lemon / Vegan Ranch / Balsamic", ru: "Ориентал / Бунча / Лимон / Веганский ранч / Бальзамик" },
        spec: { ko: "소스 멸균 제품 / 각 30ml / 냉장 보관 / 제조일로부터 6개월 이내 섭취 권장", en: "Sauce sterilized / 30ml each / Refrigerated / Consume within 6 months", ru: "Соус стерилизованный / по 30мл / Холодильник / Употребить в течение 6 месяцев" },
        description: {
          ko: "5가지 드레싱을 소량으로 맛보는 테스터 세트",
          en: "Taster set of 5 dressings in small portions",
          ru: "Тестер-набор из 5 соусов в малых объёмах",
        },
      },
      {
        name: { ko: "오리엔탈 소스", en: "Oriental Sauce", ru: "Ориентал соус" },
        shortDesc: { ko: "달콤하고 감칠맛 나는 드레싱, 샐러드와 찰떡", en: "Sweet, umami dressing, perfect with salad", ru: "Сладкий умами-дрессинг, идеален к салату" },
        contains: { ko: "오리엔탈 드레싱", en: "Oriental dressing", ru: "Ориентал дрессинг" },
        spec: { ko: "소스 멸균 제품 / 300ml / 냉장 보관 / 제조일로부터 6개월 이내 섭취 권장", en: "Sauce sterilized / 300ml / Refrigerated / Consume within 6 months", ru: "Соус стерилизованный / 300мл / Холодильник / Употребить в течение 6 месяцев" },
        description: {
          ko: "달콤하고 감칠맛 나는 드레싱, 샐러드와 찰떡",
          en: "Sweet, umami dressing, perfect with salad",
          ru: "Сладкий умами-дрессинг, идеален к салату",
        },
      },
      {
        name: { ko: "분짜 소스", en: "Buncha Sauce", ru: "Соус бунча" },
        shortDesc: { ko: "애니멀 프리 슬런치 시그니처 소스, 어디에나 잘 어울리는 만능 소스", en: "Slunch signature animal-free sauce, goes with everything", ru: "Фирменный соус Slunch без животных продуктов, универсальный" },
        contains: { ko: "분짜 소스", en: "Buncha sauce", ru: "Соус бунча" },
        spec: { ko: "소스 멸균 제품 / 300ml / 냉장 보관 / 제조일로부터 6개월 이내 섭취 권장", en: "Sauce sterilized / 300ml / Refrigerated / Consume within 6 months", ru: "Соус стерилизованный / 300мл / Холодильник / Употребить в течение 6 месяцев" },
        description: {
          ko: "애니멀 프리 슬런치 시그니처 소스, 어디에나 잘 어울리는 만능 소스",
          en: "Slunch signature animal-free sauce, goes with everything",
          ru: "Фирменный соус Slunch без животных продуктов, универсальный",
        },
      },
      {
        name: { ko: "레몬 드레싱", en: "Lemon Dressing", ru: "Лимонный дрессинг" },
        shortDesc: { ko: "상큼한 레몬향, 그린 샐러드와 해산물 요리에 잘 맞음", en: "Fresh lemon dressing for green salad and seafood", ru: "Лимонный дрессинг для зелёного салата и морепродуктов" },
        contains: { ko: "레몬 드레싱", en: "Lemon dressing", ru: "Лимонный дрессинг" },
        spec: { ko: "소스 멸균 제품 / 300ml / 냉장 보관 / 제조일로부터 6개월 이내 섭취 권장", en: "Sauce sterilized / 300ml / Refrigerated / Consume within 6 months", ru: "Соус стерилизованный / 300мл / Холодильник / Употребить в течение 6 месяцев" },
        description: {
          ko: "상큼한 레몬향, 그린 샐러드와 해산물 요리에 잘 맞음",
          en: "Fresh lemon dressing for green salad and seafood",
          ru: "Лимонный дрессинг для зелёного салата и морепродуктов",
        },
      },
      {
        name: { ko: "비건 랜치", en: "Vegan Ranch", ru: "Веганский ранч" },
        shortDesc: { ko: "고소하고 크리미한 비건 랜치, 찍어먹어도 뿌려먹어도 맛있음", en: "Savory, creamy vegan ranch — dip or drizzle", ru: "Кремовый веганский ранч — макать или поливать" },
        contains: { ko: "비건 랜치 소스", en: "Vegan ranch sauce", ru: "Соус веганский ранч" },
        spec: { ko: "소스 멸균 제품 / 300ml / 냉장 보관 / 제조일로부터 6개월 이내 섭취 권장", en: "Sauce sterilized / 300ml / Refrigerated / Consume within 6 months", ru: "Соус стерилизованный / 300мл / Холодильник / Употребить в течение 6 месяцев" },
        description: {
          ko: "고소하고 크리미한 비건 랜치, 찍어먹어도 뿌려먹어도 맛있음",
          en: "Savory, creamy vegan ranch — dip or drizzle",
          ru: "Кремовый веганский ранч — макать или поливать",
        },
      },
      {
        name: { ko: "발사믹 소스", en: "Balsamic Sauce", ru: "Бальзамический соус" },
        shortDesc: { ko: "진하고 새콤달콤한 발사믹, 마무리 드리즐로 완성", en: "Rich, tangy-sweet balsamic, finish with a drizzle", ru: "Густой бальзамик, финиш каплей" },
        contains: { ko: "발사믹 소스", en: "Balsamic sauce", ru: "Бальзамический соус" },
        spec: { ko: "소스 멸균 제품 / 300ml / 냉장 보관 / 제조일로부터 6개월 이내 섭취 권장", en: "Sauce sterilized / 300ml / Refrigerated / Consume within 6 months", ru: "Соус стерилизованный / 300мл / Холодильник / Употребить в течение 6 месяцев" },
        description: {
          ko: "진하고 새콤달콤한 발사믹, 마무리 드리즐로 완성",
          en: "Rich, tangy-sweet balsamic, finish with a drizzle",
          ru: "Густой бальзамик, финиш каплей",
        },
      },
    ],
  },
  {
    id: "seaweed",
    label: "해조류",
    desc: {
      ko: "완도 매생이와 감태로 만든 프리미엄 해조류 식품",
      en: "Premium seaweed products with Wando maesaengi and gamtae",
      ru: "Премиум продукты из водорослей — мэсэнги и камтэ",
    },
    products: [
      {
        name: { ko: "매생이 트러플 리조또 키트", en: "Maesaengi Truffle Risotto Kit", ru: "Набор ризотто мэсэнги с трюфелем" },
        shortDesc: { ko: "완도 매생이 + 블랙 트러플, 바다의 감칠맛", en: "Wando maesaengi + black truffle, ocean umami", ru: "Мэсэнги Вандо + чёрный трюфель, океанический умами" },
        contains: { ko: "리조또 2팩", en: "Risotto 2 packs", ru: "Ризотто 2 упаковки" },
        spec: { ko: "멸균 제품 / 290g 또는 520g / 냉동 (냉장 7-14일) / 24개월", en: "Sterilized / 290g or 520g / Frozen (fridge 7-14 days) / 24 months", ru: "Стерилизованный / 290г или 520г / Заморозка (холодильник 7-14 дней) / 24 месяца" },
        description: {
          ko: "완도 매생이 + 블랙 트러플, 바다의 감칠맛",
          en: "Wando maesaengi + black truffle, ocean umami",
          ru: "Мэсэнги Вандо + чёрный трюфель, океанический умами",
        },
      },
      {
        name: { ko: "매생이 크림 펜네", en: "Maesaengi Cream Penne", ru: "Пенне с кремом мэсэнги" },
        shortDesc: { ko: "매생이 크림소스 + 펜네, 바다 향 크림 파스타", en: "Maesaengi cream sauce + penne, sea cream pasta", ru: "Кремовый соус из мэсэнги + пенне, сливочная паста" },
        contains: { ko: "펜네 1팩 + 매생이 크림소스 1팩", en: "Penne 1 pack + maesaengi cream sauce 1 pack", ru: "Пенне 1 упак. + кремовый соус мэсэнги 1 упак." },
        spec: { ko: "멸균 제품 / 290g / 냉동 (냉장 7-14일) / 24개월", en: "Sterilized / 290g / Frozen (fridge 7-14 days) / 24 months", ru: "Стерилизованный / 290г / Заморозка (холодильник 7-14 дней) / 24 месяца" },
        description: {
          ko: "매생이 크림소스 + 펜네, 바다 향 크림 파스타",
          en: "Maesaengi cream sauce + penne, sea cream pasta",
          ru: "Кремовый соус из мэсэнги + пенне, сливочная паста",
        },
      },
      {
        name: { ko: "매생이 떡국", en: "Maesaengi Tteokguk", ru: "Суп ттоккук с мэсэнги" },
        shortDesc: { ko: "매생이 떡국, 한국의 설날 전통을 담다", en: "Maesaengi tteokguk, Korean New Year tradition", ru: "Суп ттоккук с мэсэнги — корейский новогодний обычай" },
        contains: { ko: "떡 1팩 + 건매생이 ×2 + 채소 육수 1포", en: "Rice cake 1 pack + dried maesaengi ×2 + vegetable stock 1 sachet", ru: "Рисовые лепёшки 1 упак. + сушёный мэсэнги ×2 + овощной бульон 1 пакетик" },
        spec: { ko: "멸균 제품 / 520g / 냉동 (냉장 7-14일) / 24개월", en: "Sterilized / 520g / Frozen (fridge 7-14 days) / 24 months", ru: "Стерилизованный / 520г / Заморозка (холодильник 7-14 дней) / 24 месяца" },
        description: {
          ko: "매생이 떡국, 한국의 설날 전통을 담다",
          en: "Maesaengi tteokguk, Korean New Year tradition",
          ru: "Суп ттоккук с мэсэнги — корейский новогодний обычай",
        },
      },
      {
        name: { ko: "매생이 페스토", en: "Maesaengi Pesto", ru: "Песто мэсэнги" },
        shortDesc: { ko: "매생이 30% — 파스타·토스트·딥 소스로", en: "30% maesaengi — for pasta, toast, dip", ru: "30% мэсэнги — для пасты, тоста, соуса" },
        contains: { ko: "국내산 매생이 30%", en: "Domestic maesaengi 30%", ru: "Мэсэнги местный 30%" },
        spec: { ko: "멸균 제품 / 140g / 냉장 보관 / 12개월", en: "Sterilized / 140g / Refrigerated / 12 months", ru: "Стерилизованный / 140г / Холодильник / 12 месяцев" },
        description: {
          ko: "매생이 30% — 파스타·토스트·딥 소스로",
          en: "30% maesaengi — for pasta, toast, dip",
          ru: "30% мэсэнги — для пасты, тоста, соуса",
        },
      },
      {
        name: { ko: "감태 버터", en: "Gamtae Butter", ru: "Масло камтэ" },
        shortDesc: { ko: "감태 30% — 감칠맛 가득한 비건 버터", en: "30% gamtae — umami-rich vegan butter", ru: "30% камтэ — веганское масло с умами" },
        contains: { ko: "국내산 감태 30%", en: "Domestic gamtae 30%", ru: "Камтэ местный 30%" },
        spec: { ko: "감태 버터 / 140g / 냉장 보관 / 12개월", en: "Gamtae butter / 140g / Refrigerated / 12 months", ru: "Масло камтэ / 140г / Холодильник / 12 месяцев" },
        description: {
          ko: "감태 30% — 감칠맛 가득한 비건 버터",
          en: "30% gamtae — umami-rich vegan butter",
          ru: "30% камтэ — веганское масло с умами",
        },
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
