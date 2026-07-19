"use client";

import { useParams, useRouter } from "next/navigation";
import {
  ArrowRight,
  Calendar,
  Leaf,
  MapPin,
  MessageCircle,
  AlertCircle,
  Sparkles,
  Building2,
  User,
  Users,
} from "lucide-react";
import {
  caseStatusLabels,
  caseStatusColors,
  urgencyLabels,
  urgencyColors,
} from "@/data/cases";
import { getAdvisorById } from "@/data/advisors";
import { getSponsorById } from "@/data/sponsors";
import { useAppStore } from "@/store/useAppStore";
import { CaseTimeline, type TimelineStep } from "@/components/CaseTimeline";
import { FieldVisitSection } from "@/components/FieldVisitSection";
import { SpecialistSection } from "@/components/SpecialistSection";
import { OutcomeSection } from "@/components/OutcomeSection";
import { Navbar } from "@/components/Navbar";

export default function CaseRoomPage() {
  const params = useParams();
  const router = useRouter();
  const getCaseById = useAppStore((s) => s.getCaseById);
  const caseData = getCaseById(params.id as string);

  if (!caseData) {
    return (
      <main className="min-h-screen bg-earth-50 flex items-center justify-center">
        <div className="text-center px-6">
          <AlertCircle size={48} className="text-amber-400 mx-auto mb-4" />
          <p className="text-earth-700 text-lg font-medium">پرونده یافت نشد</p>
          <p className="text-sm text-earth-700/60 mt-2">
            این پرونده ممکن است هنوز ثبت نشده باشد
          </p>
          <button
            onClick={() => router.push("/case/new")}
            className="mt-6 bg-green-700 text-white px-6 py-3 rounded-xl font-medium"
          >
            ثبت پرونده جدید
          </button>
        </div>
      </main>
    );
  }

  const guide = caseData.assignedLocalGuideId
    ? getAdvisorById(caseData.assignedLocalGuideId)
    : null;

  // استفاده از متغیر برای نمایش در بخش UI
  const guideName = guide ? guide.name : "تخصیص نشده";

  const sponsor = caseData.sponsorId ? getSponsorById(caseData.sponsorId) : null;

  // Build timeline steps from timelineEvents
  const timelineSteps: TimelineStep[] = caseData.timelineEvents.map(
    (evt, i) => {
      // استفاده از isLast برای منطق‌های شرطی (مثلاً حذف Border در آخرین آیتم)
      const isLast = i === caseData.timelineEvents.length - 1;

      return {
        label: evt.actorName ? `${evt.label} (${evt.actorName})` : evt.label,
        time: evt.time,
        completed: true,
        current: false,
        icon: evt.type,
        // می‌توان isLast را به کامپوننت پاس داد اگر تایپ TimelineStep اجازه دهد
      };
    }
  );

  // Add a "current" step at the end based on status
  if (caseData.status !== "resolved" && caseData.status !== "monitoring") {
    const statusStepMap: Record<string, string> = {
      open: "در انتظار تحلیل",
      triaged: "در انتظار تخصیص راهبر",
      assigned: "در انتظار بازدید میدانی",
      "field-visit": "در حال بازدید میدانی",
      escalated: "در انتظار بررسی متخصص",
      "specialist-review": "متخصص در حال بررسی",
      recommendation: "توصیه ارائه شده",
    };
    const currentLabel = statusStepMap[caseData.status];
    if (currentLabel) {
      timelineSteps.push({
        label: currentLabel,
        time: "در حال انتظار",
        completed: false,
        current: true,
      });
    }
  }

  return (
    <main className="min-h-screen bg-earth-50 pb-24">
      {/* Header */}
      <div className="bg-white border-b border-green-100 px-5 py-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.back()}
            className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center hover:bg-green-100 transition-colors"
          >
            <ArrowRight size={18} className="text-green-700" />
          </button>
          <div className="flex-1">
            <h1 className="font-bold text-lg">پرونده {caseData.id}</h1>
            <div className="flex items-center gap-2 mt-1 flex-wrap">
              <span
                className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${caseStatusColors[caseData.status]}`}
              >
                {caseStatusLabels[caseData.status]}
              </span>
              <span
                className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${urgencyColors[caseData.aiUrgency]}`}
              >
                {urgencyLabels[caseData.aiUrgency]}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="px-5 py-6 space-y-5">
        {/* Case Details */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-green-50">
          <h2 className="font-bold text-sm text-earth-700 mb-3">
            جزئیات پرونده
          </h2>

          <div className="space-y-3">
            {/* Creator */}
            <div className="flex items-center gap-3">
              {caseData.createdByRole === "farmer" ? (
                <User size={16} className="text-green-600 shrink-0" />
              ) : (
                <Users size={16} className="text-green-600 shrink-0" />
              )}
              <div>
                <p className="text-xs text-earth-700">ثبت‌کننده</p>
                <p className="text-sm font-medium">
                  {caseData.createdByRole === "farmer" ? "کشاورز" : "راهبر محلی / کارشناس ترویج"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Leaf size={16} className="text-green-600 shrink-0" />
              <div>
                <p className="text-xs text-earth-700">نوع محصول</p>
                <p className="text-sm font-medium">{caseData.cropType}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin size={16} className="text-green-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs text-earth-700">توضیحات</p>
                <p className="text-sm leading-relaxed">{caseData.description}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Calendar size={16} className="text-green-600 shrink-0" />
              <div>
                <p className="text-xs text-earth-700">تاریخ ثبت</p>
                <p className="text-sm font-medium">{caseData.createdAt}</p>
              </div>
            </div>

            {/* Sponsor */}
            {sponsor && (
              <div className="flex items-center gap-3">
                <Building2 size={16} className="text-green-600 shrink-0" />
                <div>
                  <p className="text-xs text-earth-700">حامی</p>
                  <p className="text-sm font-medium">{sponsor.name}</p>
                  <p className="text-xs text-earth-700">{sponsor.type} — {sponsor.city}</p>
                </div>
              </div>
            )}

            {/* Assigned Guide Section */}
            <div className="flex items-center gap-3">
              <Users size={16} className="text-green-600 shrink-0" />
              <div>
                <p className="text-xs text-earth-700">راهبر محلی</p>
                {/* استفاده از guideName در اینجا */}
                <p className="text-sm font-medium">{guideName}</p>
                {guide && <p className="text-xs text-earth-700">{guide.title}</p>}
              </div>
            </div>
          </div>

          {/* AI Triage Result */}
          {caseData.triageResult && (
            <div className="mt-4 bg-amber-50 border border-amber-200 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-1">
                <Sparkles size={16} className="text-amber-600" />
                <span className="text-sm font-medium text-amber-800">
                  نتیجه تحلیل هوش مصنوعی
                </span>
              </div>
              <p className="text-sm text-amber-700">{caseData.triageResult}</p>
              {caseData.confidence && (
                <div className="mt-2">
                  <div className="flex items-center justify-between text-xs text-amber-600 mb-1">
                    <span>اعتماد</span>
                    <span>{caseData.confidence}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-amber-200 rounded-full">
                    <div
                      className="h-full bg-amber-500 rounded-full"
                      style={{ width: `${caseData.confidence}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Timeline */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-green-50">
          <h2 className="font-bold text-sm text-earth-700 mb-5">
            فعالیت‌های پرونده
          </h2>
          <CaseTimeline steps={timelineSteps} />
        </div>

        {/* Field Visit */}
        <FieldVisitSection
          status={caseData.fieldVisitStatus}
          report={caseData.fieldVisitReport}
        />

        {/* Specialist */}
        <SpecialistSection
          specialistId={caseData.specialistId}
          specialistStatus={caseData.specialistStatus}
          recommendation={caseData.specialistRecommendation}
        />

        {/* Outcome + Feedback */}
        <OutcomeSection
          outcome={caseData.finalOutcome}
          feedback={caseData.feedback}
        />

        {/* Action Button */}
        {caseData.status !== "resolved" && caseData.status !== "monitoring" && (
          <button className="w-full bg-green-700 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-green-800 transition-all">
            <MessageCircle size={18} />
            شروع گفتگو با راهبر محلی
          </button>
        )}
      </div>

      <Navbar />
    </main>
  );
}
