"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  Camera,
  MapPin,
  FileText,
  Leaf,
  Send,
  ArrowRight,
  CheckCircle,
  User,
  Users,
  AlertTriangle,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { TriageAnimation } from "@/components/TriageAnimation";
import { SponsorSelector } from "@/components/SponsorSelector";
import { useAppStore } from "@/store/useAppStore";
import { cn } from "@/lib/utils";
import type { Case, TimelineEvent } from "@/data/cases";

const cropTypes = ["گندم", "برنج", "جو", "ذرت", "سیب‌زمینی", "سیب", "انگور"];

const urgencyConfig: Record<string, { label: string; color: string }> = {
  low: { label: "عادی", color: "bg-green-100 text-green-800" },
  medium: { label: "متوسط", color: "bg-yellow-100 text-yellow-800" },
  high: { label: "فوری", color: "bg-orange-100 text-orange-800" },
  critical: { label: "بحرانی", color: "bg-red-100 text-red-800" },
};

export default function NewCasePage() {
  const router = useRouter();
  const { setCurrentCaseId, addCase } = useAppStore();

  const [description, setDescription] = useState("");
  const [cropType, setCropType] = useState("");
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [creatorRole, setCreatorRole] = useState<"farmer" | "local_guide">("farmer");
  const [sponsorId, setSponsorId] = useState<string | null>(null);
  const [phase, setPhase] = useState<"form" | "triaging" | "result">("form");
  const [triageResult, setTriageResult] = useState<{
    disease: string;
    confidence: number;
    recommendation: string;
  } | null>(null);
  const [urgency, setUrgency] = useState<"low" | "medium" | "high" | "critical">("medium");

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPhotoPreview(url);
    }
  };

  const captureLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        },
        () => {
          setLocation({ lat: 35.6892, lng: 51.389 });
        }
      );
    } else {
      setLocation({ lat: 35.6892, lng: 51.389 });
    }
  };

  const handleSubmit = () => {
    setPhase("triaging");
  };

  const handleTriageComplete = useCallback(
    (result: { disease: string; confidence: number; recommendation: string }) => {
      setTriageResult(result);
      // Map confidence to urgency
      if (result.confidence >= 85) setUrgency("high");
      else if (result.confidence >= 65) setUrgency("medium");
      else setUrgency("low");
      setPhase("result");
    },
    []
  );

  const handleRouteToAdvisor = () => {
    const caseId = `case-${Date.now()}`;
    const now = new Date().toLocaleDateString("fa-IR");

    const newCase: Case = {
      id: caseId,
      cropType,
      description,
      status: "triaged",
      advisorId: null,
      createdAt: now,
      location: location || { lat: 35.6892, lng: 51.389 },
      triageResult: triageResult?.recommendation || "",
      confidence: triageResult?.confidence || 0,
      createdByRole: creatorRole,
      creatorId: creatorRole === "farmer" ? "user-current" : "guide-current",
      sponsorId,
      aiUrgency: urgency,
      assignedLocalGuideId: null,
      fieldVisitStatus: "not_assigned",
      fieldVisitReport: null,
      specialistId: null,
      specialistStatus: "not_needed",
      specialistRecommendation: null,
      finalOutcome: null,
      feedback: [],
      timelineEvents: [
        {
          id: `te-new-1`,
          type: "created",
          label: "پرونده باز شد",
          time: now,
          actorName: creatorRole === "farmer" ? "کشاورز" : "راهبر محلی",
        },
        {
          id: `te-new-2`,
          type: "triaged",
          label: "تحلیل هوش مصنوعی تکمیل شد",
          time: now,
        },
      ],
    };

    addCase(newCase);
    setCurrentCaseId(caseId);
    router.push(`/case/${caseId}`);
  };

  const isFormValid = description.trim() && cropType;

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
          <div>
            <h1 className="font-bold text-lg">پرونده جدید</h1>
            <p className="text-xs text-earth-700">
              ثبت مشکل و دریافت تحلیل هوش مصنوعی
            </p>
          </div>
        </div>
      </div>

      <div className="px-5 py-6">
        {phase === "form" && (
          <div className="space-y-5">
            {/* Creator Role */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-green-50">
              <label className="flex items-center gap-2 text-sm font-medium text-earth-700 mb-3">
                <Users size={16} className="text-green-600" />
                ثبت‌کننده پرونده
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setCreatorRole("farmer")}
                  className={cn(
                    "flex items-center gap-3 p-3.5 rounded-xl border-2 transition-all",
                    creatorRole === "farmer"
                      ? "bg-green-700 text-white border-green-700"
                      : "bg-green-50 text-green-700 border-transparent hover:border-green-200"
                  )}
                >
                  <User size={20} />
                  <span className="text-sm font-medium">کشاورز</span>
                </button>
                <button
                  onClick={() => setCreatorRole("local_guide")}
                  className={cn(
                    "flex items-center gap-3 p-3.5 rounded-xl border-2 transition-all",
                    creatorRole === "local_guide"
                      ? "bg-green-700 text-white border-green-700"
                      : "bg-green-50 text-green-700 border-transparent hover:border-green-200"
                  )}
                >
                  <Users size={20} />
                  <span className="text-sm font-medium">راهبر محلی</span>
                </button>
              </div>
            </div>

            {/* Photo Upload */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-green-50">
              <label className="flex items-center gap-2 text-sm font-medium text-earth-700 mb-3">
                <Camera size={16} className="text-green-600" />
                عکس محصول
              </label>
              {photoPreview ? (
                <div className="relative">
                  <img
                    src={photoPreview}
                    alt="Preview"
                    className="w-full h-48 object-cover rounded-xl"
                  />
                  <button
                    onClick={() => setPhotoPreview(null)}
                    className="absolute top-2 left-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-sm"
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center h-40 border-2 border-dashed border-green-200 rounded-xl bg-green-50/50 cursor-pointer hover:bg-green-50 transition-colors">
                  <Camera size={32} className="text-green-400 mb-2" />
                  <span className="text-sm text-earth-700">
                    تصویر را انتخاب کنید
                  </span>
                  <span className="text-xs text-earth-700/60 mt-1">
                    JPG، PNG تا ۱۰ مگابایت
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                </label>
              )}
            </div>

            {/* Description */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-green-50">
              <label className="flex items-center gap-2 text-sm font-medium text-earth-700 mb-3">
                <FileText size={16} className="text-green-600" />
                توضیحات مشکل
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="مشکل مشاهده شده را شرح دهید..."
                rows={4}
                dir="rtl"
                className="w-full border border-green-100 rounded-xl p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent placeholder:text-gray-400"
              />
            </div>

            {/* Crop Type */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-green-50">
              <label className="flex items-center gap-2 text-sm font-medium text-earth-700 mb-3">
                <Leaf size={16} className="text-green-600" />
                نوع محصول
              </label>
              <div className="grid grid-cols-3 gap-2">
                {cropTypes.map((crop) => (
                  <button
                    key={crop}
                    onClick={() => setCropType(crop)}
                    className={cn(
                      "py-2.5 rounded-xl text-sm font-medium transition-all",
                      cropType === crop
                        ? "bg-green-700 text-white shadow-md"
                        : "bg-green-50 text-green-700 hover:bg-green-100"
                    )}
                  >
                    {crop}
                  </button>
                ))}
              </div>
            </div>

            {/* GPS Location */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-green-50">
              <label className="flex items-center gap-2 text-sm font-medium text-earth-700 mb-3">
                <MapPin size={16} className="text-green-600" />
                موقعیت مکانی
              </label>
              {location ? (
                <div className="flex items-center gap-3 bg-green-50 rounded-xl p-3">
                  <CheckCircle size={18} className="text-green-600 shrink-0" />
                  <div className="text-sm">
                    <p className="font-medium text-green-800">
                      موقعیت ثبت شد
                    </p>
                    <p className="text-xs text-earth-700 mt-0.5">
                      {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
                    </p>
                  </div>
                </div>
              ) : (
                <button
                  onClick={captureLocation}
                  className="w-full flex items-center justify-center gap-2 py-3 border-2 border-dashed border-green-200 rounded-xl text-sm text-green-700 hover:bg-green-50 transition-colors"
                >
                  <MapPin size={16} />
                  دریافت موقعیت فعلی
                </button>
              )}
            </div>

            {/* Sponsor Selector */}
            <SponsorSelector selectedId={sponsorId} onSelect={setSponsorId} />

            {/* Submit */}
            <button
              onClick={handleSubmit}
              disabled={!isFormValid}
              className={cn(
                "w-full py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 transition-all",
                isFormValid
                  ? "bg-green-700 text-white hover:bg-green-800 shadow-lg hover:shadow-xl active:scale-[0.98]"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              )}
            >
              <Send size={20} />
              تحلیل و ارسال
            </button>
          </div>
        )}

        {phase === "triaging" && (
          <TriageAnimation onComplete={handleTriageComplete} />
        )}

        {phase === "result" && (
          <div className="space-y-5">
            <TriageAnimation onComplete={handleTriageComplete} />

            {/* Urgency Badge */}
            {triageResult && (
              <div className="flex items-center justify-center gap-2">
                <AlertTriangle size={16} className="text-amber-600" />
                <span className="text-sm font-medium text-earth-700">
                  سطح فوریت:
                </span>
                <span
                  className={cn(
                    "px-3 py-1 rounded-full text-sm font-medium",
                    urgencyConfig[urgency].color
                  )}
                >
                  {urgencyConfig[urgency].label}
                </span>
              </div>
            )}

            <button
              onClick={handleRouteToAdvisor}
              className="w-full bg-green-700 text-white py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 hover:bg-green-800 transition-all shadow-lg hover:shadow-xl active:scale-[0.98]"
            >
              <Send size={20} />
              ثبت و ارسال به راهبر محلی
            </button>
          </div>
        )}
      </div>

      <Navbar />
    </main>
  );
}
