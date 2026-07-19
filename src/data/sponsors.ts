export interface Sponsor {
  id: string;
  name: string;
  type: "تعاونی" | "بیمه" | "بانک" | "شرکت کشت و صنعت" | "خریدار محصول" | "واحد صنعتی";
  description: string;
  initials: string;
  city: string;
}

export const sponsors: Sponsor[] = [
  {
    id: "sp-001",
    name: "تعاونی کشاورزان ورامین",
    type: "تعاونی",
    description: "hamayesh-e keshavarzan-e Varamin — حمایت از کشاورزان خرد",
    initials: "تعاون",
    city: "ورامین",
  },
  {
    id: "sp-002",
    name: "بیمه کشاورزی ایران",
    type: "بیمه",
    description: "پوشش بیمه‌ای محصولات کشاورزی در برابر بلایای طبیعی",
    initials: "بیمه",
    city: "تهران",
  },
  {
    id: "sp-003",
    name: "بانک کشاورزی",
    type: "بانک",
    description: "ارائه تسهیلات کم‌بهره به کشاورزان",
    initials: "بانک",
    city: "تهران",
  },
  {
    id: "sp-004",
    name: "شرکت کشت و صنعت نیشکر",
    type: "شرکت کشت و صنعت",
    description: "خرید تضمینی نیشکر و تأمین نهاده",
    initials: "نیشکر",
    city: "اهواز",
  },
  {
    id: "sp-005",
    name: "خریداران مرکزی گندم",
    type: "خریدار محصول",
    description: "شبکه خرید گندم از کشاورزان سراسر کشور",
    initials: "گندم",
    city: "تهران",
  },
  {
    id: "sp-006",
    name: "واحد دامداری صنعتی البرز",
    type: "واحد صنعتی",
    description: "دامداری صنعتی با ظرفیت ۵۰۰ رأس دام سبک",
    initials: "دام",
    city: "کرج",
  },
];

export function getSponsorById(id: string): Sponsor | undefined {
  return sponsors.find((s) => s.id === id);
}
