import { Stethoscope, CheckCircle, Clock, ListChecks, Pill } from "lucide-react";
import { cn } from "@/lib/utils";
import { getAdvisorById } from "@/data/advisors";
import type { SpecialistRecommendation } from "@/data/cases";

interface SpecialistSectionProps {
  specialistId: string | null;
  specialistStatus: "not_needed" | "pending" | "assigned" | "reviewed";
  recommendation: SpecialistRecommendation | null;
}

const statusConfig: Record<string, { label: string; color: string; icon: typeof Clock }> = {
  not_needed: { label: "نیاز نیست", color: "bg-gray-100 text-gray-600", icon: Clock },
  pending: { label: "در انتظار بررسی", color: "bg-amber-100 text-amber-700", icon: Clock },
  assigned: { label: "تخصیص شده", color: "bg-blue-100 text-blue-700", icon: Stethoscope },
  reviewed: { label: "بررسی شده", color: "bg-green-100 text-green-700", icon: CheckCircle },
};

export function SpecialistSection({
  specialistId,
  specialistStatus,
  recommendation,
}: SpecialistSectionProps) {
  const config = statusConfig[specialistStatus];
  const specialist = specialistId ? getAdvisorById(specialistId) : null;

  if (specialistStatus === "not_needed") {
    return (
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-green-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Stethoscope size={18} className="text-gray-400" />
            <h3 className="font-bold text-sm text-gray-400">ارجاع به متخصص</h3>
          </div>
          <span className={cn("px-2.5 py-0.5 rounded-full text-xs font-medium", config.color)}>
            {config.label}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-green-50">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Stethoscope size={18} className="text-indigo-600" />
          <h3 className="font-bold text-sm">ارجاع به متخصص</h3>
        </div>
        <span className={cn("px-2.5 py-0.5 rounded-full text-xs font-medium", config.color)}>
          {config.label}
        </span>
      </div>

      {specialist && (
        <div className="flex items-center gap-3 bg-indigo-50 rounded-xl p-3 mb-4">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
            style={{ backgroundColor: specialist.avatarColor + "20" }}
          >
            <Stethoscope size={18} style={{ color: specialist.avatarColor }} />
          </div>
          <div>
            <p className="text-sm font-medium">{specialist.name}</p>
            <p className="text-xs text-earth-700">{specialist.title}</p>
          </div>
        </div>
      )}

      {recommendation && (
        <div className="space-y-3">
          <p className="text-sm leading-relaxed text-gray-700">{recommendation.summary}</p>

          {recommendation.actions.length > 0 && (
            <div>
              <div className="flex items-center gap-1.5 mb-2">
                <ListChecks size={14} className="text-teal-600" />
                <p className="text-xs font-medium text-earth-700">اقدامات پیشنهادی:</p>
              </div>
              <ul className="space-y-1.5">
                {recommendation.actions.map((action, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                    <CheckCircle size={14} className="text-teal-500 mt-0.5 shrink-0" />
                    {action}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {recommendation.productsOrMethods &&
            recommendation.productsOrMethods.length > 0 && (
              <div>
                <div className="flex items-center gap-1.5 mb-2">
                  <Pill size={14} className="text-blue-600" />
                  <p className="text-xs font-medium text-earth-700">محصولات/روش‌ها:</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {recommendation.productsOrMethods.map((item, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            )}

          {recommendation.followUpNeeded && (
            <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-xl p-3">
              <Clock size={16} className="text-amber-600 shrink-0" />
              <p className="text-sm text-amber-700">پیگیری مجدد نیاز است</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
