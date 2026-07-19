"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Send,
  Mail,
  Camera,
  BriefcaseBusiness,
} from "lucide-react";

export default function AboutPage() {
  const creatorInfo = {
    name: "مریم اصغری",
    role: "کارشناس ترویج و فعال رسانه ای کشاورزی",
bio : "سلام، من مریم اصغری هستم؛ دانشجوی رشته ترویج کشاورزی و فعال رسانه‌ای در حوزه کشاورزی. علاقه‌مند به بهره‌گیری از فناوری‌های نوین برای ارتقای فرآیندهای کشاورزی، افزایش بهره‌وری، و توانمندسازی کشاورزان هستم.هدف من طراحی و تقویت یک سازوکار هوشمند برای مشاوره، ارجاع پرونده، پیگیری میدانی و اتصال حلقه‌های مفقوده زنجیره کشاورزی است؛ سازوکاری که هم به بهبود تصمیم‌گیری کشاورزان کمک کند و هم زمینه‌ای برای اشتغال‌زایی، استفاده مؤثر از ظرفیت‌های انسانی موجود و توسعه خدمات ترویجی هدفمند فراهم آورد."   ,
 avatar: "/images/creator-profile.png",
  };

  const socials = [
    {
      name: "تلگرام",
      icon: <Send size={20} />,
      link: "https://t.me/maryam8asghari",
      color: "bg-blue-500",
    },
    {
      name: "اینستاگرام",
      icon: <Camera size={20} />,
      link: "https://instagram.com/maryam8asghari",
      color: "bg-pink-600",
    },
    {
      name: "ایمیل",
      icon: <Mail size={20} />,
      link: "mailto:maryam8asghari@gmail.com",
      color: "bg-red-500",
    },
    {
      name: "لینکدین",
      icon: <BriefcaseBusiness size={20} />,
      link: "https://linkedin.com/in/maryam8asghari",
      color: "bg-blue-700",
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-green-800 via-green-700 to-green-600 text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg width="100%" height="100%" viewBox="0 0 400 400">
          <pattern id="grain" width="40" height="40" patternUnits="userSpaceOnUse">
            <circle cx="20" cy="20" r="1.5" fill="white" />
            <circle cx="5" cy="5" r="1" fill="white" />
            <circle cx="35" cy="35" r="1" fill="white" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grain)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-8 flex flex-col min-h-screen">
        <header className="flex items-center justify-between mb-12 pb-4 border-b border-white/20">
          <div className="flex items-center gap-3">
            <span className="text-3xl">👨‍💻</span>
            <h1 className="text-xl font-bold">درباره من</h1>
          </div>
          <Link
            href="/"
            className="flex items-center gap-1.5 text-sm bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-xl transition-all"
          >
            <span>بازگشت به خانه</span>
            <ArrowRight size={18} />
          </Link>
        </header>

        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-2xl">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="relative">
              <div className="w-40 h-40 md:w-48 md:h-48 rounded-2xl overflow-hidden border-4 border-white/20 shadow-xl">
                <Image
                  src={creatorInfo.avatar}
                  alt={creatorInfo.name}
                  width={200}
                  height={200}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-green-500 p-2 rounded-lg shadow-lg">
                <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
              </div>
            </div>

            <div className="flex-1 text-center md:text-right">
              <h2 className="text-3xl font-extrabold mb-2">{creatorInfo.name}</h2>
              <h3 className="text-green-300 font-medium mb-4">{creatorInfo.role}</h3>
              <p className="text-green-50/80 leading-relaxed mb-6 text-sm md:text-base">
                {creatorInfo.bio}
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {socials.map((social, index) => (
                  <a
                    key={index}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-white/5 hover:bg-white/20 border border-white/10 transition-all group"
                  >
                    <div
                      className={`${social.color} p-2 rounded-xl text-white shadow-lg group-hover:scale-110 transition-transform`}
                    >
                      {social.icon}
                    </div>
                    <span className="text-xs font-semibold">{social.name}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

             </div>
    </main>
  );
}
