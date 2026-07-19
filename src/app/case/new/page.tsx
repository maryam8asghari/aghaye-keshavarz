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
import type { Case } from "@/data/cases";

const cropTypes = [
  "گندم",
  "برنج",
  "جو",
  "ذرت",
  "سیب‌زمینی",
  "سیب",
  "انگور",
];

type Urgency = "low" | "medium" | "high" | "critical";
type CreatorRole = "farmer" | "local_guide";
type PagePhase = "form" | "triaging" | "result";

interface TriageResult {
  disease: string;
  confidence: number;
  recommendation: string;
}

const urgencyConfig: Record<
  Urgency,
  {
    label: string;
    color: string;
  }
> = {
  low: {
    label: "عادی",
    color: "bg-green-100 text-green-800",
  },
  medium: {
    label: "متوسط",
    color: "bg-yellow-100 text-yellow-800",
  },
  high: {
    label: "فوری",
    color: "bg-orange-100 text-orange-800",
  },
  critical: {
    label: "بحرانی",
    color: "bg-red-100 text-red-800",
  },
};

export default function NewCasePage() {
  const router = useRouter();

  const setCurrentCaseId = useAppStore((state) => state.setCurrentCaseId);
  const addCase = useAppStore((state) => state.addCase);

  const [description, setDescription] = useState("");
  const [cropType, setCropType] = useState("");
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const [location, setLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  const [creatorRole, setCreatorRole] =
    useState<CreatorRole>("farmer");

  const [sponsorId, setSponsorId] = useState<string | null>(null);
  const [phase, setPhase] = useState<PagePhase>("form");
  const [triageResult, setTriageResult] =
    useState<TriageResult | null>(null);

  const [urgency, setUrgency] = useState<Urgency>("medium");

  const handlePhotoUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setPhotoPreview((previousUrl) => {
      if (previousUrl) {
        URL.revokeObjectURL(previousUrl);
      }

      return URL.createObjectURL(file);
    });
  };

  const removePhoto = () => {
    setPhotoPreview((previousUrl) => {
      if (previousUrl) {
        URL.revokeObjectURL(previousUrl);
      }

      return null;
    });
  };

  const captureLocation = () => {
    const fallbackLocation = {
      lat: 35.6892,
      lng: 51.389,
    };

    if (!navigator.geolocation) {
      setLocation(fallbackLocation);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      () => {
        setLocation(fallbackLocation);
      }
    );
  };

  const handleSubmit = () => {
    if (!description.trim() || !cropType) {
      return;
    }

    setPhase("triaging");
  };

  const handleTriageComplete = useCallback(
    (result: TriageResult) => {
      setTriageResult(result);

      if (result.confidence >= 95) {
        setUrgency("critical");
      } else if (result.confidence >= 85) {
        setUrgency("high");
      } else if (result.confidence >= 65) {
        setUrgency("medium");
      } else {
        setUrgency("low");
      }

      setPhase("result");
    },
    []
  );

  const handleRouteToAdvisor = () => {
    if (!triageResult) {
      return;
    }

    const timestamp = Date.now();
    const caseId = `case-${timestamp}`;
    const now = new Date().toLocaleString("fa-IR");

    const newCase: Case = {
      id: caseId,
      cropType,
      description: description.trim(),
      status: "triaged",
      advisorId: null,
      createdAt: now,
      photoUrl: photoPreview ?? undefined,
      location: location ?? {
        lat: 35.6892,
        lng: 51.389,
      },
      triageResult: triageResult.recommendation,
      confidence: triageResult.confidence,
      createdByRole: creatorRole,
      creatorId:
        creatorRole === "farmer"
          ? "user-current"
          : "guide-current",
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
          id: `te-${timestamp}-created`,
          type: "created",
          label: "پرونده باز شد",
          time: now,
          actorName:
            creatorRole === "farmer"
              ? "کشاورز"
              : "راهبر محلی",
        },
        {
          id: `te-${timestamp}-triaged`,
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

  const isFormValid =
    description.trim().length > 0 && cropType.length > 0;

  return (
    <main className="min-h-screen bg-earth-50 pb-24">
      {/* Header */}
      <div className="border-b border-green-100 bg-white px-5 py-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => router.back()}
            aria-label="بازگشت"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-green-50 transition-colors hover:bg-green-100"
          >
            <ArrowRight size={18} className="text-green-700" />
          </button>

          <div>
            <h1 className="text-lg font-bold">پرونده جدید</h1>

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
            <div className="rounded-2xl border border-green-50 bg-white p-5 shadow-sm">
              <div className="mb-3 flex items-center gap-2 text-sm font-medium text-earth-700">
                <Users size={16} className="text-green-600" />
                <span>ثبت‌کننده پرونده</span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setCreatorRole("farmer")}
                  className={cn(
                    "flex items-center gap-3 rounded-xl border-2 p-3.5 transition-all",
                    creatorRole === "farmer"
                      ? "border-green-700 bg-green-700 text-white"
                      : "border-transparent bg-green-50 text-green-700 hover:border-green-200"
                  )}
                >
                  <User size={20} />
                  <span className="text-sm font-medium">
                    کشاورز
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setCreatorRole("local_guide")}
                  className={cn(
                    "flex items-center gap-3 rounded-xl border-2 p-3.5 transition-all",
                    creatorRole === "local_guide"
                      ? "border-green-700 bg-green-700 text-white"
                      : "border-transparent bg-green-50 text-green-700 hover:border-green-200"
                  )}
                >
                  <Users size={20} />
                  <span className="text-sm font-medium">
                    راهبر محلی
                  </span>
                </button>
              </div>
            </div>

            {/* Photo Upload */}
            <div className="rounded-2xl border border-green-50 bg-white p-5 shadow-sm">
              <div className="mb-3 flex items-center gap-2 text-sm font-medium text-earth-700">
                <Camera size={16} className="text-green-600" />
                <span>عکس محصول</span>
              </div>

              {photoPreview ? (
                <div className="relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={photoPreview}
                    alt="پیش‌نمایش تصویر محصول"
                    className="h-48 w-full rounded-xl object-cover"
                  />

                  <button
                    type="button"
                    onClick={removePhoto}
                    aria-label="حذف تصویر"
                    className="absolute left-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-red-500 text-sm text-white transition-colors hover:bg-red-600"
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <label className="flex h-40 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-green-200 bg-green-50/50 transition-colors hover:bg-green-50">
                  <Camera
                    size={32}
                    className="mb-2 text-green-400"
                  />

                  <span className="text-sm text-earth-700">
                    تصویر را انتخاب کنید
                  </span>

                  <span className="mt-1 text-xs text-earth-700/60">
                    JPG، PNG تا ۱۰ مگابایت
                  </span>

                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                </label>
              )}
            </div>

            {/* Description */}
            <div className="rounded-2xl border border-green-50 bg-white p-5 shadow-sm">
              <label
                htmlFor="case-description"
                className="mb-3 flex items-center gap-2 text-sm font-medium text-earth-700"
              >
                <FileText size={16} className="text-green-600" />
                توضیحات مشکل
              </label>

              <textarea
                id="case-description"
                value={description}
                onChange={(event) =>
                  setDescription(event.target.value)
                }
                placeholder="مشکل مشاهده شده را شرح دهید..."
                rows={4}
                dir="rtl"
                className="w-full resize-none rounded-xl border border-green-100 p-3 text-sm placeholder:text-gray-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Crop Type */}
            <div className="rounded-2xl border border-green-50 bg-white p-5 shadow-sm">
              <div className="mb-3 flex items-center gap-2 text-sm font-medium text-earth-700">
                <Leaf size={16} className="text-green-600" />
                <span>نوع محصول</span>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {cropTypes.map((crop) => (
                  <button
                    type="button"
                    key={crop}
                    onClick={() => setCropType(crop)}
                    className={cn(
                      "rounded-xl py-2.5 text-sm font-medium transition-all",
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
            <div className="rounded-2xl border border-green-50 bg-white p-5 shadow-sm">
              <div className="mb-3 flex items-center gap-2 text-sm font-medium text-earth-700">
                <MapPin size={16} className="text-green-600" />
                <span>موقعیت مکانی</span>
              </div>

              {location ? (
                <div className="flex items-center gap-3 rounded-xl bg-green-50 p-3">
                  <CheckCircle
                    size={18}
                    className="shrink-0 text-green-600"
                  />

                  <div className="text-sm">
                    <p className="font-medium text-green-800">
                      موقعیت ثبت شد
                    </p>

                    <p
                      className="mt-0.5 text-xs text-earth-700"
                      dir="ltr"
                    >
                      {location.lat.toFixed(4)},{" "}
                      {location.lng.toFixed(4)}
                    </p>
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={captureLocation}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-green-200 py-3 text-sm text-green-700 transition-colors hover:bg-green-50"
                >
                  <MapPin size={16} />
                  دریافت موقعیت فعلی
                </button>
              )}
            </div>

            {/* Sponsor Selector */}
            <SponsorSelector
              selectedId={sponsorId}
              onSelect={setSponsorId}
            />

            {/* Submit */}
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!isFormValid}
              className={cn(
                "flex w-full items-center justify-center gap-2 rounded-2xl py-4 text-lg font-bold transition-all",
                isFormValid
                  ? "bg-green-700 text-white shadow-lg hover:bg-green-800 hover:shadow-xl active:scale-[0.98]"
                  : "cursor-not-allowed bg-gray-200 text-gray-400"
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

            {triageResult && (
              <div className="flex items-center justify-center gap-2">
                <AlertTriangle
                  size={16}
                  className="text-amber-600"
                />

                <span className="text-sm font-medium text-earth-700">
                  سطح فوریت:
                </span>

                <span
                  className={cn(
                    "rounded-full px-3 py-1 text-sm font-medium",
                    urgencyConfig[urgency].color
                  )}
                >
                  {urgencyConfig[urgency].label}
                </span>
              </div>
            )}

            <button
              type="button"
              onClick={handleRouteToAdvisor}
              disabled={!triageResult}
              className={cn(
                "flex w-full items-center justify-center gap-2 rounded-2xl py-4 text-lg font-bold transition-all",
                triageResult
                  ? "bg-green-700 text-white shadow-lg hover:bg-green-800 hover:shadow-xl active:scale-[0.98]"
                  : "cursor-not-allowed bg-gray-200 text-gray-400"
              )}
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
