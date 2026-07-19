export interface Advisor {
  id: string;
  name: string;
  title: string;
  role: "local_guide" | "specialist";
  specialties: string[];
  rating: number;
  reviewCount: number;
  solvedCases: number;
  yearsExperience: number;
  badges: Badge[];
  lat: number;
  lng: number;
  coverageRadius: number; // km
  avatarColor: string;
}

export type BadgeType = "verified" | "local-hero" | "fast-responder";

export interface Badge {
  type: BadgeType;
  label: string;
}

export const advisors: Advisor[] = [
  {
    id: "adv-001",
    name: "دکتر علی محمدی",
    title: "مشاور ارشد زراعت",
    role: "local_guide",
    specialties: ["گندم", "جو", "مدیریت آب", "خاک‌شناسی"],
    rating: 4.8,
    reviewCount: 124,
    solvedCases: 89,
    yearsExperience: 15,
    badges: [
      { type: "verified", label: "تایید شده" },
      { type: "local-hero", label: "قهرمان محلی" },
    ],
    lat: 35.6892,
    lng: 51.389,
    coverageRadius: 12,
    avatarColor: "#2D6A4F",
  },
  {
    id: "adv-002",
    name: "مهندس سارا احمدی",
    title: "کارشناس آفات و بیماری‌ها",
    role: "local_guide",
    specialties: ["آفات", "بیماری‌های گیاهی", "قلمه‌زنی", "برنامه مدیریت تلفیقی"],
    rating: 4.6,
    reviewCount: 98,
    solvedCases: 72,
    yearsExperience: 10,
    badges: [
      { type: "verified", label: "تایید شده" },
      { type: "fast-responder", label: "پاسخ‌ده سریع" },
    ],
    lat: 35.7219,
    lng: 51.4214,
    coverageRadius: 10,
    avatarColor: "#40916C",
  },
  {
    id: "adv-003",
    name: "دکتر حسن رضایی",
    title: "متخصص باغبانی",
    role: "local_guide",
    specialties: ["میوه‌جات", "سبزیجات", "گلخانه", "آبیاری قطره‌ای"],
    rating: 4.9,
    reviewCount: 156,
    solvedCases: 112,
    yearsExperience: 20,
    badges: [
      { type: "verified", label: "تایید شده" },
      { type: "local-hero", label: "قهرمان محلی" },
      { type: "fast-responder", label: "پاسخ‌ده سریع" },
    ],
    lat: 35.3253,
    lng: 51.6566,
    coverageRadius: 15,
    avatarColor: "#1B4332",
  },
  {
    id: "adv-004",
    name: "مهندس مریم کریمی",
    title: "کارشناس خاک و کود",
    role: "local_guide",
    specialties: ["تحلیل خاک", "کوددهی", "اصلاح خاک", "کمپوست"],
    rating: 4.5,
    reviewCount: 67,
    solvedCases: 45,
    yearsExperience: 8,
    badges: [{ type: "verified", label: "تایید شده" }],
    lat: 35.6544,
    lng: 51.3867,
    coverageRadius: 11,
    avatarColor: "#52B788",
  },
  {
    id: "adv-005",
    name: "دکتر محمد نوری",
    title: "مشاور ارشد زراعت",
    role: "local_guide",
    specialties: [" برنج", "پنبه", "آبیاری", "مدیریت منابع آب"],
    rating: 4.7,
    reviewCount: 89,
    solvedCases: 63,
    yearsExperience: 12,
    badges: [
      { type: "verified", label: "تایید شده" },
      { type: "fast-responder", label: "پاسخ‌ده سریع" },
    ],
    lat: 35.2983,
    lng: 51.682,
    coverageRadius: 13,
    avatarColor: "#E9A23B",
  },
  {
    id: "adv-006",
    name: "مهندس زهرا حسینی",
    title: "کارشناس گیاهان دارویی",
    role: "local_guide",
    specialties: ["گیاهان دارویی", "گل محمدی", "زعفران", "گیاهان معطر"],
    rating: 4.4,
    reviewCount: 54,
    solvedCases: 38,
    yearsExperience: 7,
    badges: [{ type: "local-hero", label: "قهرمان محلی" }],
    lat: 35.7456,
    lng: 51.3989,
    coverageRadius: 10,
    avatarColor: "#6B4226",
  },
  {
    id: "adv-007",
    name: "دکتر احمد صادقی",
    title: "مشاور ارشد دامپروری",
    role: "local_guide",
    specialties: ["دامپروری", "خوراک دام", "بهداشت دام", "دام سبک"],
    rating: 4.3,
    reviewCount: 42,
    solvedCases: 31,
    yearsExperience: 14,
    badges: [
      { type: "verified", label: "تایید شده" },
    ],
    lat: 35.5167,
    lng: 51.4833,
    coverageRadius: 14,
    avatarColor: "#40916C",
  },
  {
    id: "adv-008",
    name: "مهندس نیلوفر شریفی",
    title: "کارشناس کشاورزی دقیق",
    role: "local_guide",
    specialties: ["کشاورزی دقیق", "سامانه‌های اطلاعاتی", "پهپاد", "حسگرها"],
    rating: 4.8,
    reviewCount: 73,
    solvedCases: 51,
    yearsExperience: 6,
    badges: [
      { type: "verified", label: "تایید شده" },
      { type: "fast-responder", label: "پاسخ‌ده سریع" },
    ],
    lat: 35.6348,
    lng: 51.4415,
    coverageRadius: 12,
    avatarColor: "#1B4332",
  },
  {
    id: "adv-009",
    name: "دکتر احمد صادقی",
    title: "متخصص بیماری‌های گیاهی",
    role: "specialist",
    specialties: ["قارچ‌شناسی", "بیماری‌های ویروسی", "باکتری‌شناسی"],
    rating: 4.9,
    reviewCount: 88,
    solvedCases: 67,
    yearsExperience: 18,
    badges: [
      { type: "verified", label: "تایید شده" },
      { type: "local-hero", label: "قهرمان محلی" },
    ],
    lat: 35.68,
    lng: 51.41,
    coverageRadius: 20,
    avatarColor: "#7C3AED",
  },
  {
    id: "adv-010",
    name: "دکتر لیلا فتحی",
    title: "متخصص خاک و کود",
    role: "specialist",
    specialties: ["تحلیل پیشرفته خاک", "تغذیه گیاه", "اصلاح زمین‌های شور"],
    rating: 4.7,
    reviewCount: 52,
    solvedCases: 41,
    yearsExperience: 14,
    badges: [
      { type: "verified", label: "تایید شده" },
    ],
    lat: 35.71,
    lng: 51.39,
    coverageRadius: 18,
    avatarColor: "#2563EB",
  },
  {
    id: "adv-011",
    name: "دکتر رضا کاظمی",
    title: "متخصص آفات",
    role: "specialist",
    specialties: ["حشره‌شناسی", "مدیریت تلفیقی آفات", " سموم کشاورزی"],
    rating: 4.8,
    reviewCount: 71,
    solvedCases: 55,
    yearsExperience: 16,
    badges: [
      { type: "verified", label: "تایید شده" },
      { type: "fast-responder", label: "پاسخ‌ده سریع" },
    ],
    lat: 35.64,
    lng: 51.45,
    coverageRadius: 22,
    avatarColor: "#DC2626",
  },
];

export function getAdvisorById(id: string): Advisor | undefined {
  return advisors.find((a) => a.id === id);
}
