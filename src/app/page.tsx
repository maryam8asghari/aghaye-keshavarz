"use client";

import { useRouter } from "next/navigation";
import { Tractor, UserCheck, ChevronLeft, Stethoscope } from "lucide-react";
import { useAppStore } from "@/store/useAppStore";

export default function HomePage() {
  const router = useRouter();
  const setRole = useAppStore((s) => s.setRole);

  const handleSelect = (role: "farmer" | "local_guide" | "specialist") => {
    setRole(role);
    router.push("/map");
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-green-800 via-green-700 to-green-600 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%" viewBox="0 0 400 400">
          <pattern id="grain" width="40" height="40" patternUnits="userSpaceOnUse">
            <circle cx="20" cy="20" r="1.5" fill="white" />
            <circle cx="5" cy="5" r="1" fill="white" />
            <circle cx="35" cy="35" r="1" fill="white" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grain)" />
        </svg>
      </div>

      <div className="relative z-10 flex flex-col min-h-screen px-6 py-12">
        {/* Hero */}
        <div className="flex-1 flex flex-col justify-center items-center text-center text-white gap-8">
          <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center border border-white/30">
            <span className="text-5xl">🌾</span>
          </div>

          <div>
            <h1 className="text-4xl font-bold mb-3">آقای کشاورز</h1>
            <p className="text-green-100 text-lg leading-relaxed">
              پلتفرم مدیریت پرونده
              <br />
              و مشاوره کشاورزی هوشمند
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 w-full max-w-sm">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-3 border border-white/20">
              <p className="text-2xl font-bold">۸</p>
              <p className="text-xs text-green-100">مشاور فعال</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-3 border border-white/20">
              <p className="text-2xl font-bold">۵</p>
              <p className="text-xs text-green-100">پرونده باز</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-3 border border-white/20">
              <p className="text-2xl font-bold">۴۰۰+</p>
              <p className="text-xs text-green-100">مشاوره موفق</p>
            </div>
          </div>
        </div>

        {/* Role Selection */}
        <div className="space-y-3 pb-8">
          <p className="text-center text-green-100 text-sm mt-4 mb-4">
            نقش خود را انتخاب کنید
          </p>

          <button
            onClick={() => handleSelect("farmer")}
            className="w-full bg-white text-green-800 rounded-2xl p-5 flex items-center gap-4 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
          >
            <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center shrink-0">
              <Tractor size={28} className="text-green-700" />
            </div>
            <div className="flex-1 text-right">
              <h3 className="font-bold text-lg">ورود به عنوان کشاورز</h3>
              <p className="text-sm text-green-600 mt-0.5">
                ثبت پرونده و دریافت مشاوره
              </p>
            </div>
            <ChevronLeft size={20} className="text-green-400" />
          </button>

          <button
            onClick={() => handleSelect("local_guide")}
            className="w-full bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 rounded-2xl p-5 flex items-center gap-4 hover:bg-white/20 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
          >
            <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center shrink-0">
              <UserCheck size={28} />
            </div>
            <div className="flex-1 text-right">
              <h3 className="font-bold text-lg">ورود به عنوان راهبر محلی</h3>
              <p className="text-sm text-green-100 mt-0.5">
                کارشناس ترویج و مدیریت پرونده
              </p>
            </div>
            <ChevronLeft size={20} className="text-green-300" />
          </button>

          <button
            onClick={() => handleSelect("specialist")}
            className="w-full bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 rounded-2xl p-5 flex items-center gap-4 hover:bg-white/20 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
          >
            <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center shrink-0">
              <Stethoscope size={28} />
            </div>
            <div className="flex-1 text-right">
              <h3 className="font-bold text-lg">ورود به عنوان متخصص</h3>
              <p className="text-sm text-green-100 mt-0.5">
                بررسی پرونده‌های ارجاعی و توصیه تخصصی
              </p>
            </div>
            <ChevronLeft size={20} className="text-green-300" />
          </button>
        </div>
      </div>
    </main>
  );
}
