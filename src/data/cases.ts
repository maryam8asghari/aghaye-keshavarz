export type CaseStatus =
  | "open"
  | "triaged"
  | "assigned"
  | "field-visit"
  | "escalated"
  | "specialist-review"
  | "recommendation"
  | "monitoring"
  | "resolved";

export interface FieldVisitReport {
  summary: string;
  observations: string[];
  photos: string[];
  recommendedEscalation: boolean;
  escalationReason?: string;
}

export interface SpecialistRecommendation {
  summary: string;
  actions: string[];
  productsOrMethods?: string[];
  followUpNeeded: boolean;
}

export interface FinalOutcome {
  resolutionStatus: "open" | "monitoring" | "resolved";
  resultSummary: string;
  effectivenessRating?: number;
}

export interface Feedback {
  byUserId: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface TimelineEvent {
  id: string;
  type:
    | "created"
    | "triaged"
    | "assigned"
    | "field-visit"
    | "escalated"
    | "specialist-review"
    | "recommendation"
    | "outcome"
    | "feedback";
  label: string;
  time: string;
  actorName?: string;
  icon?: string;
}

export interface Case {
  id: string;
  cropType: string;
  description: string;
  status: CaseStatus;
  advisorId: string | null;
  createdAt: string;
  photoUrl?: string;
  location: { lat: number; lng: number };
  triageResult?: string;
  confidence?: number;

  createdByRole: "farmer" | "local_guide";
  creatorId: string;
  sponsorId: string | null;
  aiUrgency: "low" | "medium" | "high" | "critical";
  assignedLocalGuideId: string | null;
  fieldVisitStatus:
    | "not_assigned"
    | "assigned"
    | "scheduled"
    | "visited"
    | "reported";
  fieldVisitReport: FieldVisitReport | null;
  specialistId: string | null;
  specialistStatus: "not_needed" | "pending" | "assigned" | "reviewed";
  specialistRecommendation: SpecialistRecommendation | null;
  finalOutcome: FinalOutcome | null;
  feedback: Feedback[];
  timelineEvents: TimelineEvent[];
}

export const caseStatusLabels: Record<CaseStatus, string> = {
  open: "باز",
  triaged: "تحلیل شده",
  assigned: "تخصیص داده شده",
  "field-visit": "بازدید میدانی",
  escalated: "ارجاع شده",
  "specialist-review": "بررسی متخصص",
  recommendation: "توصیه ارائه شده",
  monitoring: "پایش نتیجه",
  resolved: "حل شده",
};

export const caseStatusColors: Record<CaseStatus, string> = {
  open: "bg-blue-100 text-blue-800",
  triaged: "bg-amber-100 text-amber-800",
  assigned: "bg-green-100 text-green-800",
  "field-visit": "bg-purple-100 text-purple-800",
  escalated: "bg-red-100 text-red-800",
  "specialist-review": "bg-indigo-100 text-indigo-800",
  recommendation: "bg-teal-100 text-teal-800",
  monitoring: "bg-orange-100 text-orange-800",
  resolved: "bg-gray-100 text-gray-800",
};

export const urgencyLabels: Record<string, string> = {
  low: "عادی",
  medium: "متوسط",
  high: "فوری",
  critical: "بحرانی",
};

export const urgencyColors: Record<string, string> = {
  low: "bg-green-100 text-green-800",
  medium: "bg-yellow-100 text-yellow-800",
  high: "bg-orange-100 text-orange-800",
  critical: "bg-red-100 text-red-800",
};

export const cases: Case[] = [
  {
    id: "case-001",
    cropType: "گندم",
    description:
      "لکه‌های زرد روی برگ‌های گندم مشاهده شده. محصول در مرحله ساقه‌روی است.",
    status: "field-visit",
    advisorId: "adv-001",
    createdAt: "۱۴۰۴/۰۴/۱۵",
    location: { lat: 35.65, lng: 51.42 },
    triageResult: "۹۲٪ احتمال زنگ زرد گندم",
    confidence: 92,
    createdByRole: "farmer",
    creatorId: "user-001",
    sponsorId: "sp-001",
    aiUrgency: "high",
    assignedLocalGuideId: "adv-001",
    fieldVisitStatus: "scheduled",
    fieldVisitReport: null,
    specialistId: null,
    specialistStatus: "not_needed",
    specialistRecommendation: null,
    finalOutcome: null,
    feedback: [],
    timelineEvents: [
      { id: "te-001", type: "created", label: "پرونده باز شد", time: "۱۴۰۴/۰۴/۱۵ - ۱۰:۳۰", actorName: "رضا احمدی" },
      { id: "te-002", type: "triaged", label: "تحلیل هوش مصنوعی تکمیل شد", time: "۱۴۰۴/۰۴/۱۵ - ۱۰:۳۲" },
      { id: "te-003", type: "assigned", label: "راهبر محلی تخصیص داده شد", time: "۱۴۰۴/۰۴/۱۵ - ۱۱:۰۰", actorName: "دکتر علی محمدی" },
      { id: "te-004", type: "field-visit", label: "بازدید میدانی برنامه‌ریزی شد", time: "۱۴۰۴/۰۴/۱۶ - ۰۹:۰۰" },
    ],
  },
  {
    id: "case-002",
    cropType: "برنج",
    description:
      "پژمردگی بوته‌های برنج در بخش شمالی مزرعه. آبیاری منظم انجام می‌شود.",
    status: "assigned",
    advisorId: "adv-005",
    createdAt: "۱۴۰۴/۰۴/۱۴",
    location: { lat: 35.31, lng: 51.67 },
    triageResult: "۷۸٪ احتمال پوسیدگی ریشه",
    confidence: 78,
    createdByRole: "local_guide",
    creatorId: "adv-002",
    sponsorId: null,
    aiUrgency: "medium",
    assignedLocalGuideId: "adv-005",
    fieldVisitStatus: "not_assigned",
    fieldVisitReport: null,
    specialistId: null,
    specialistStatus: "not_needed",
    specialistRecommendation: null,
    finalOutcome: null,
    feedback: [],
    timelineEvents: [
      { id: "te-005", type: "created", label: "پرونده باز شد", time: "۱۴۰۴/۰۴/۱۴ - ۱۴:۲۰", actorName: "مهندس سارا احمدی" },
      { id: "te-006", type: "triaged", label: "تحلیل هوش مصنوعی تکمیل شد", time: "۱۴۰۴/۰۴/۱۴ - ۱۴:۲۲" },
      { id: "te-007", type: "assigned", label: "راهبر محلی تخصیص داده شد", time: "۱۴۰۴/۰۴/۱۴ - ۱۵:۰۰", actorName: "دکتر محمد نوری" },
    ],
  },
  {
    id: "case-003",
    cropType: "سیب‌زمینی",
    description:
      "لکه‌های تیره روی غده‌های سیب‌زمینی. قبلاً مشکلی مشاهده نشده بود.",
    status: "resolved",
    advisorId: "adv-004",
    createdAt: "۱۴۰۴/۰۴/۱۰",
    location: { lat: 35.7, lng: 51.35 },
    triageResult: "۸۵٪ احتمال لکه سیاه",
    confidence: 85,
    createdByRole: "farmer",
    creatorId: "user-003",
    sponsorId: "sp-003",
    aiUrgency: "medium",
    assignedLocalGuideId: "adv-004",
    fieldVisitStatus: "reported",
    fieldVisitReport: {
      summary: "لکه سیاه تأیید شد. میزان آلودگی ۱۵٪ غده‌ها.",
      observations: [
        "لکه‌های تیره و فرورفته روی پوست غده",
        "بدون بوی نامطبوع",
        "عمق لکه‌ها حداکثر ۲ میلی‌متر",
      ],
      photos: [],
      recommendedEscalation: false,
    },
    specialistId: "adv-009",
    specialistStatus: "reviewed",
    specialistRecommendation: {
      summary: "استفاده از قارچ‌کش مانکوزب + بهبود زهکشی خاک",
      actions: [
        " محلول‌پاشی قارچ‌کش مانکوزب ۲ گرم در لیتر",
        " بهبود زهکشی ردیف‌ها",
        "حذف غده‌های آلوده از مزرعه",
      ],
      productsOrMethods: ["مانکوزب ۸۰٪ WP", "زهکشی بهبود یافته"],
      followUpNeeded: true,
    },
    finalOutcome: {
      resolutionStatus: "resolved",
      resultSummary: "آلودگی با قارچ‌کش کنترل شد. محصول سالم برداشت شد.",
      effectivenessRating: 5,
    },
    feedback: [
      { byUserId: "user-003", rating: 5, comment: "خیلی ممنون از راهنمایی عالی. مشکل کاملاً حل شد.", createdAt: "۱۴۰۴/۰۴/۲۰" },
    ],
    timelineEvents: [
      { id: "te-008", type: "created", label: "پرونده باز شد", time: "۱۴۰۴/۰۴/۱۰ - ۰۸:۱۵", actorName: "حسن ملکی" },
      { id: "te-009", type: "triaged", label: "تحلیل هوش مصنوعی تکمیل شد", time: "۱۴۰۴/۰۴/۱۰ - ۰۸:۱۷" },
      { id: "te-010", type: "assigned", label: "راهبر محلی تخصیص داده شد", time: "۱۴۰۴/۰۴/۱۰ - ۰۹:۰۰", actorName: "مهندس مریم کریمی" },
      { id: "te-011", type: "field-visit", label: "بازدید میدانی انجام شد", time: "۱۴۰۴/۰۴/۱۱ - ۱۰:۰۰", actorName: "مهندس مریم کریمی" },
      { id: "te-012", type: "escalated", label: "ارجاع به متخصص", time: "۱۴۰۴/۰۴/۱۱ - ۱۴:۰۰" },
      { id: "te-013", type: "specialist-review", label: "متخصص بررسی کرد", time: "۱۴۰۴/۰۴/۱۲ - ۰۹:۰۰", actorName: "دکتر احمد صادقی" },
      { id: "te-014", type: "recommendation", label: "توصیه درمانی ارائه شد", time: "۱۴۰۴/۰۴/۱۲ - ۱۰:۰۰" },
      { id: "te-015", type: "outcome", label: "پرونده حل شد", time: "۱۴۰۴/۰۴/۱۸ - ۱۴:۰۰" },
    ],
  },
  {
    id: "case-004",
    cropType: "ذرت",
    description:
      "رشد نامتوازن بوته‌های ذرت. برخی بوته‌ها کوتاه‌تر از حد معمول هستند.",
    status: "triaged",
    advisorId: null,
    createdAt: "۱۴۰۴/۰۴/۱۶",
    location: { lat: 35.55, lng: 51.5 },
    triageResult: "۷۰٪ احتمال کمبود نیتروژن",
    confidence: 70,
    createdByRole: "farmer",
    creatorId: "user-004",
    sponsorId: null,
    aiUrgency: "medium",
    assignedLocalGuideId: null,
    fieldVisitStatus: "not_assigned",
    fieldVisitReport: null,
    specialistId: null,
    specialistStatus: "not_needed",
    specialistRecommendation: null,
    finalOutcome: null,
    feedback: [],
    timelineEvents: [
      { id: "te-016", type: "created", label: "پرونده باز شد", time: "۱۴۰۴/۰۴/۱۶ - ۱۱:۰۰", actorName: "کاظم رستمی" },
      { id: "te-017", type: "triaged", label: "تحلیل هوش مصنوعی تکمیل شد", time: "۱۴۰۴/۰۴/۱۶ - ۱۱:۰۲" },
    ],
  },
  {
    id: "case-005",
    cropType: "گندم",
    description:
      "پرندگان در حال خوردن دانه‌های گندم هستند. خسارت قابل توجهی وارد شده.",
    status: "open",
    advisorId: null,
    createdAt: "۱۴۰۴/۰۴/۱۷",
    location: { lat: 35.68, lng: 51.4 },
    createdByRole: "farmer",
    creatorId: "user-005",
    sponsorId: "sp-005",
    aiUrgency: "low",
    assignedLocalGuideId: null,
    fieldVisitStatus: "not_assigned",
    fieldVisitReport: null,
    specialistId: null,
    specialistStatus: "not_needed",
    specialistRecommendation: null,
    finalOutcome: null,
    feedback: [],
    timelineEvents: [
      { id: "te-018", type: "created", label: "پرونده باز شد", time: "۱۴۰۴/۰۴/۱۷ - ۰۸:۳۰", actorName: "سعید محمدی" },
    ],
  },
];

export function getCaseByIdStatic(id: string): Case | undefined {
  return cases.find((c) => c.id === id);
}

export function getCasesByAdvisor(advisorId: string): Case[] {
  return cases.filter((c) => c.advisorId === advisorId);
}
