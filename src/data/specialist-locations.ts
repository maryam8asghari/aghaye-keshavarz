export type SpecialistLocationType =
  | "آزمایشگاه خاک"
  | "آزمایشگاه گیاه"
  | "نهالستان"
  | "فروشگاه کود"
  | "فروشگاه سم"
  | "شرکت کشاورزی";

export interface SpecialistLocation {
  id: string;
  name: string;
  type: SpecialistLocationType;
  description: string;
  lat: number;
  lng: number;
  phone?: string;
  address?: string;
  avatarColor: string;
}

export const specialistLocationLabels: Record<SpecialistLocationType, string> = {
  "آزمایشگاه خاک": "آزمایشگاه خاک",
  "آزمایشگاه گیاه": "آزمایشگاه گیاه",
  "نهالستان": "نهالستان",
  "فروشگاه کود": "فروشگاه کود",
  "فروشگاه سم": "فروشگاه سم",
  "شرکت کشاورزی": "شرکت کشاورزی",
};

export const specialistLocationColors: Record<SpecialistLocationType, string> = {
  "آزمایشگاه خاک": "#8B4513",
  "آزمایشگاه گیاه": "#228B22",
  "نهالستان": "#32CD32",
  "فروشگاه کود": "#FFA500",
  "فروشگاه سم": "#DC143C",
  "شرکت کشاورزی": "#4169E1",
};

export const specialistLocations: SpecialistLocation[] = [
  {
    id: "sl-001",
    name: "آزمایشگاه خاک تهران",
    type: "آزمایشگاه خاک",
    description: "تحلیل تخصصی خاک و تعیین نیازهای غذایی گیاه",
    lat: 35.695,
    lng: 51.39,
    phone: "021-88776655",
    address: "تهران، خیابان انقلاب",
    avatarColor: "#8B4513",
  },
  {
    id: "sl-002",
    name: "آزمایشگاه خاک ورامین",
    type: "آزمایشگاه خاک",
    description: "آزمایشگاه مجهز خاک با امکان تحلیل کامل",
    lat: 35.32,
    lng: 51.67,
    phone: "021-88990011",
    address: "ورامین، خیابان امام",
    avatarColor: "#A0522D",
  },
  {
    id: "sl-003",
    name: "آزمایشگاه گیاه پردیس",
    type: "آزمایشگاه گیاه",
    description: "تشخیص بیماری‌ها و آفات گیاهی",
    lat: 35.74,
    lng: 51.43,
    phone: "021-88334455",
    address: "پردیس، فاز ۱۱",
    avatarColor: "#228B22",
  },
  {
    id: "sl-004",
    name: "نهالستان البرز",
    type: "نهالستان",
    description: "تولید و عرضه نهال‌های میوه و زینتی",
    lat: 35.71,
    lng: 51.35,
    phone: "026-44556677",
    address: "کرج، جاده چالوس",
    avatarColor: "#32CD32",
  },
  {
    id: "sl-005",
    name: "نهالستان سبز قشم",
    type: "نهالستان",
    description: "نهال‌های مرکبات و گرمسیری",
    lat: 35.58,
    lng: 51.45,
    phone: "021-88223344",
    address: "ورامین، جاده قم",
    avatarColor: "#00FF00",
  },
  {
    id: "sl-006",
    name: "فروشگاه کود و سم ایران",
    type: "فروشگاه کود",
    description: "عرضه انواع کودهای شیمیایی و ارگانیک",
    lat: 35.65,
    lng: 51.42,
    phone: "021-88112233",
    address: "تهران، بازار کشاورزی",
    avatarColor: "#FFA500",
  },
  {
    id: "sl-007",
    name: "فروشگاه سموم کشاورزی",
    type: "فروشگاه سم",
    description: "انواع سموم دفع آفات و قارچ‌کش‌ها",
    lat: 35.68,
    lng: 51.44,
    phone: "021-88445566",
    address: "تهران، خیابان آیت‌الله سعیدی",
    avatarColor: "#DC143C",
  },
  {
    id: "sl-008",
    name: "شرکت کشاورزی سبز ایرانیان",
    type: "شرکت کشاورزی",
    description: "مشاوره و تأمین نهاده‌های کشاورزی",
    lat: 35.63,
    lng: 51.39,
    phone: "021-88778899",
    address: "تهران، شهرک صنعتی",
    avatarColor: "#4169E1",
  },
];

export function getSpecialistLocationById(id: string): SpecialistLocation | undefined {
  return specialistLocations.find((l) => l.id === id);
}

export function getSpecialistLocationsByType(type: SpecialistLocationType): SpecialistLocation[] {
  return specialistLocations.filter((l) => l.type === type);
}