export interface Review {
  id: string;
  advisorId: string;
  farmerName: string;
  rating: number;
  text: string;
  date: string;
  cropType: string;
}

export const reviews: Review[] = [
  {
    id: "rev-001",
    advisorId: "adv-001",
    farmerName: "رضا احمدی",
    rating: 5,
    text: "دکتر محمدی خیلی سریع مشکل زنگ زرد گندم من را تشخیص دادند. راهکارهای عملی ارائه دادند و ظرف یک هفته مشکل حل شد.",
    date: "۱۴۰۴/۰۴/۱۰",
    cropType: "گندم",
  },
  {
    id: "rev-002",
    advisorId: "adv-001",
    farmerName: "فاطمه کاظمی",
    rating: 5,
    text: "مشاوره بسیار عالی بود. پس از بازدید میدانی، برنامه کوددهی مناسبی تنظیم کردند.",
    date: "۱۴۰۴/۰۴/۰۵",
    cropType: "جو",
  },
  {
    id: "rev-003",
    advisorId: "adv-002",
    farmerName: "محمد رحیمی",
    rating: 4,
    text: "مهندس احمدی در شناسایی آفت کمک زیادی کردند. فقط کمی دیرتر از حد انتظار رسیدند.",
    date: "۱۴۰۴/۰۳/۲۸",
    cropType: "سیب‌زمینی",
  },
  {
    id: "rev-004",
    advisorId: "adv-003",
    farmerName: "علی جعفری",
    rating: 5,
    text: "دکتر رضایی بهترین مشاوری هستند که تا حالا دیده‌ام. تخصص بالا و برخورد عالی.",
    date: "۱۴۰۴/۰۴/۱۲",
    cropType: "سیب‌زمینی",
  },
  {
    id: "rev-005",
    advisorId: "adv-003",
    farmerName: "مریم نوری",
    rating: 5,
    text: "گلخانه من مشکل پژمردگی داشت. دکتر رضایی با دقت بررسی کردند و راه حل مناسب ارائه دادند.",
    date: "۱۴۰۴/۰۴/۰۸",
    cropType: "سبزیجات",
  },
  {
    id: "rev-006",
    advisorId: "adv-004",
    farmerName: "حسن ملکی",
    rating: 4,
    text: "مهندس کریمی تحلیل خاک بسیار دقیقی انجام دادند. برنامه کوددهی‌شان مؤثر بود.",
    date: "۱۴۰۴/۰۴/۰۱",
    cropType: "گندم",
  },
  {
    id: "rev-007",
    advisorId: "adv-005",
    farmerName: "رضا تقوی",
    rating: 5,
    text: "دکتر نوری در کوتاه‌ترین زمان ممکن به مزرعه رسیدند و مشکل برنج من را حل کردند.",
    date: "۱۴۰۴/۰۴/۱۱",
    cropType: "برنج",
  },
  {
    id: "rev-008",
    advisorId: "adv-006",
    farmerName: "زینب سعادت",
    rating: 4,
    text: "مهندس شریفی اطلاعات خوبی درباره گیاهان دارویی دارند. کاشت زعفران من بهتر شد.",
    date: "۱۴۰۴/۰۳/۲۰",
    cropType: "زعفران",
  },
  {
    id: "rev-009",
    advisorId: "adv-007",
    farmerName: "کاظم رستمی",
    rating: 4,
    text: "دکتر صادقی در زمینه دامپروری بسیار حرفه‌ای هستند. خوراک دام را بهینه کردند.",
    date: "۱۴۰۴/۰۴/۰۳",
    cropType: "دامپروری",
  },
  {
    id: "rev-010",
    advisorId: "adv-008",
    farmerName: "امیر حسینی",
    rating: 5,
    text: "مهندس شریفی با استفاده از پهپاد، بیماری را در مزرعه من شناسایی کردند. فناوری عالی!",
    date: "۱۴۰۴/۰۴/۱۳",
    cropType: "گندم",
  },
  {
    id: "rev-011",
    advisorId: "adv-001",
    farmerName: "سعید محمدی",
    rating: 5,
    text: "مشاوره تلفنی هم بسیار مفید بود. نیازی به مراجعه حضوری نبود و مشکل از راه دور حل شد.",
    date: "۱۴۰۴/۰۳/۱۵",
    cropType: "گندم",
  },
  {
    id: "rev-012",
    advisorId: "adv-003",
    farmerName: "نسرین عباسی",
    rating: 4,
    text: "دکتر رضایی بهترین توصیه‌ها را برای آبیاری قطره‌ای ارائه دادند. مصرف آب ۴۰٪ کاهش یافت.",
    date: "۱۴۰۴/۰۴/۰۶",
    cropType: "سبزیجات",
  },
];

export function getReviewsByAdvisor(advisorId: string): Review[] {
  return reviews.filter((r) => r.advisorId === advisorId);
}
