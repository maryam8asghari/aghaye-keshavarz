import { ClipboardCheck, AlertTriangle, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { FieldVisitReport } from "@/data/cases";

interface FieldVisitSectionProps {
  status: "not_assigned" | "assigned" | "scheduled" | "visited" | "reported";
  report: FieldVisitReport | null;
}

const statusConfig: Record<string, { label: string; color: string }> = {
  not_assigned: { label: "تخصیص نشده", color: "bg-gray-100 text-gray-600" },
  assigned: { label: "تخصیص شده", color: "bg-blue-100 text-blue-700" },
  scheduled: { label: "برنامه‌ریزی شده", color: "bg-purple-100 text-purple-700" },
  visited: { label: "انجام شده", color: "bg-green-100 text-green-700" },
  reported: { label: "گزارش ثبت شده", color: "bg-teal-100 text-teal-700" },
};

export function FieldVisitSection({ status, report }: FieldVisitSectionProps) {
  const config = statusConfig[status];

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-green-50">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <ClipboardCheck size={18} className="text-purple-600" />
          <h3 className="font-bold text-sm">بازدید میدانی</h3>
        </div>
        <span className={cn("px-2.5 py-0.5 rounded-full text-xs font-medium", config.color)}>
          {config.label}
        </span>
      </div>

      {report && (
        <div className="space-y-3">
          <p className="text-sm leading-relaxed text-gray-700">{report.summary}</p>

          {report.observations.length > 0 && (
            <div>
              <p className="text-xs font-medium text-earth-700 mb-2">مشاهدات:</p>
              <ul className="space-y-1.5">
                {report.observations.map((obs, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-1.5 shrink-0" />
                    {obs}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {report.recommendedEscalation && (
            <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-xl p-3">
              <AlertTriangle size={16} className="text-amber-600 mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-medium text-amber-800">ارجاع به متخصص توصیه شده</p>
                {report.escalationReason && (
                  <p className="text-xs text-amber-700 mt-1">{report.escalationReason}</p>
                )}
              </div>
            </div>
          )}

          {!report.recommendedEscalation && status === "reported" && (
            <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-xl p-3">
              <CheckCircle size={16} className="text-green-600 shrink-0" />
              <p className="text-sm text-green-700">نیازی به ارجاع به متخصص نیست</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
