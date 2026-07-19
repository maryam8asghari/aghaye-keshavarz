import { CheckCircle, Star, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import type { FinalOutcome, Feedback } from "@/data/cases";

interface OutcomeSectionProps {
  outcome: FinalOutcome | null;
  feedback: Feedback[];
}

const resolutionLabels: Record<string, string> = {
  open: "باز",
  monitoring: "در حال پایش",
  resolved: "حل شده",
};

const resolutionColors: Record<string, string> = {
  open: "bg-amber-100 text-amber-700",
  monitoring: "bg-blue-100 text-blue-700",
  resolved: "bg-green-100 text-green-700",
};

export function OutcomeSection({ outcome, feedback }: OutcomeSectionProps) {
  if (!outcome && feedback.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-green-50">
        <div className="flex items-center gap-2">
          <CheckCircle size={18} className="text-gray-400" />
          <h3 className="font-bold text-sm text-gray-400">نتیجه و بازخورد</h3>
        </div>
        <p className="text-xs text-gray-400 mt-2">هنوز نتیجه‌ای ثبت نشده</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {outcome && (
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-green-50">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <CheckCircle size={18} className="text-green-600" />
              <h3 className="font-bold text-sm">نتیجه پرونده</h3>
            </div>
            <span
              className={cn(
                "px-2.5 py-0.5 rounded-full text-xs font-medium",
                resolutionColors[outcome.resolutionStatus]
              )}
            >
              {resolutionLabels[outcome.resolutionStatus]}
            </span>
          </div>

          <p className="text-sm leading-relaxed text-gray-700 mb-3">
            {outcome.resultSummary}
          </p>

          {outcome.effectivenessRating && (
            <div className="flex items-center gap-2">
              <span className="text-xs text-earth-700">امتیاز اثربخشی:</span>
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={16}
                    className={
                      star <= outcome.effectivenessRating!
                        ? "fill-amber-500 text-amber-500"
                        : "fill-gray-200 text-gray-200"
                    }
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {feedback.length > 0 && (
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-green-50">
          <div className="flex items-center gap-2 mb-4">
            <MessageSquare size={18} className="text-green-600" />
            <h3 className="font-bold text-sm">بازخورد کشاورزان</h3>
          </div>

          <div className="space-y-3">
            {feedback.map((fb, i) => (
              <div key={i} className="bg-earth-50 rounded-xl p-3">
                <div className="flex items-center gap-2 mb-1">
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={12}
                        className={
                          star <= fb.rating
                            ? "fill-amber-500 text-amber-500"
                            : "fill-gray-200 text-gray-200"
                        }
                      />
                    ))}
                  </div>
                  <span className="text-xs text-earth-700">{fb.createdAt}</span>
                </div>
                <p className="text-sm text-gray-700">{fb.comment}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
