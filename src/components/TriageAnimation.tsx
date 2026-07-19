"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, CheckCircle, AlertTriangle } from "lucide-react";

interface TriageResult {
  disease: string;
  confidence: number;
  recommendation: string;
}

interface TriageAnimationProps {
  onComplete: (result: TriageResult) => void;
}

export function TriageAnimation({ onComplete }: TriageAnimationProps) {
  const [phase, setPhase] = useState<"loading" | "result">("loading");

  useEffect(() => {
    const timer = setTimeout(() => {
      setPhase("result");
      onComplete({
        disease: "زنگ زرد گندم",
        confidence: 92,
        recommendation:
          "ارجاع به مشاور محلی برای بازدید میدانی و تأیید تشخیص",
      });
    }, 2500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence mode="wait">
      {phase === "loading" ? (
        <motion.div
          key="loading"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="flex flex-col items-center justify-center py-12 gap-6"
        >
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
              <Brain size={36} className="text-green-700 animate-pulse" />
            </div>
            <div className="absolute inset-0 w-20 h-20 rounded-full bg-green-200 animate-pulse-ring" />
          </div>
          <div className="text-center">
            <p className="text-lg font-semibold text-green-800">
              تحلیل هوش مصنوعی
            </p>
            <p className="text-sm text-earth-700 mt-1">
              در حال بررسی تصویر و تحلیل علائم...
            </p>
          </div>
          <div className="w-48 h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-green-600 rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 2.4, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      ) : (
        <motion.div
          key="result"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-6 shadow-sm border border-green-100"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle size={24} className="text-green-600" />
            </div>
            <div>
              <h3 className="font-bold text-green-800">تحلیل تکمیل شد</h3>
              <p className="text-xs text-earth-700">
                نتیجه هوش مصنوعی
              </p>
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-4">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle size={18} className="text-amber-600" />
              <span className="font-semibold text-amber-800">
                ۹۲٪ احتمال زنگ زرد گندم
              </span>
            </div>
            <p className="text-sm text-amber-700">
              لکه‌های زرد روی برگ‌ها نشان‌دهنده قارچ زنگ زرد هستند.
              این بیماری در شرایط مرطوب و دمای ملایم گسترش می‌یابد.
            </p>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-xl p-4">
            <p className="text-sm font-medium text-green-800">
              اقدام توصیه شده:
            </p>
            <p className="text-sm text-green-700 mt-1">
              ارجاع به مشاور محلی برای بازدید میدانی و تأیید تشخیص.
              در صورت تأیید، استفاده از قارچ‌کش مناسب توصیه می‌شود.
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
