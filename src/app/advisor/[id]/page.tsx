"use client";

import { useParams, useRouter } from "next/navigation";
import {
  ArrowRight,
  User,
  Briefcase,
  Clock,
  Star,
  MessageCircle,
} from "lucide-react";
import { getAdvisorById } from "@/data/advisors";
import { getReviewsByAdvisor } from "@/data/reviews";
import { StarRating } from "@/components/StarRating";
import { AdvisorBadge } from "@/components/AdvisorBadge";
import { ReviewCard } from "@/components/ReviewCard";
import { Navbar } from "@/components/Navbar";

export default function AdvisorProfilePage() {
  const params = useParams();
  const router = useRouter();
  const id = (params.id as string) || "";
  const advisor = getAdvisorById(id);
  const reviews = advisor ? getReviewsByAdvisor(advisor.id) : [];

  if (!advisor) {
    return (
      <main className="min-h-screen bg-earth-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-earth-700 text-lg">مشاور یافت نشد</p>
          <button onClick={() => router.back()} className="mt-4 text-green-700 underline">
            بازگشت
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-earth-50 pb-24">
      <div className="bg-gradient-to-b from-green-700 to-green-600 text-white px-5 pt-4 pb-20 relative">
        <button onClick={() => router.back()} className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mb-4 hover:bg-white/30 transition-colors">
          <ArrowRight size={20} />
        </button>
      </div>

      <div className="px-5 -mt-14 relative z-10">
        <div className="bg-white rounded-3xl p-6 shadow-lg border border-green-50">
          <div className="flex items-center gap-4 mb-5">
            <div className="w-20 h-20 rounded-2xl flex items-center justify-center shrink-0" style={{ backgroundColor: advisor.avatarColor + "20" }}>
              <User size={36} style={{ color: advisor.avatarColor }} />
            </div>
            <div>
              <h1 className="text-xl font-bold">{advisor.name}</h1>
              <p className="text-sm text-earth-700">{advisor.title}</p>
              <div className="flex items-center gap-2 mt-1">
                <StarRating rating={Math.round(advisor.rating)} size={16} />
                <span className="text-sm font-medium">{advisor.rating}</span>
                <span className="text-xs text-earth-700">({advisor.reviewCount} نظر)</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-5">
            {advisor.badges.map((b) => (
              <AdvisorBadge key={b.type} type={b.type} label={b.label} />
            ))}
          </div>

          <div className="mb-5">
            <h3 className="text-sm font-medium text-earth-700 mb-2">تخصص‌ها</h3>
            <div className="flex flex-wrap gap-2">
              {advisor.specialties.map((s) => (
                <span key={s} className="px-3 py-1.5 bg-green-50 text-green-700 text-sm font-medium rounded-full border border-green-100">{s}</span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 mb-5">
            <div className="bg-green-50 rounded-2xl p-3 text-center">
              <Briefcase size={20} className="text-green-600 mx-auto mb-1" />
              <p className="text-lg font-bold text-green-800">{advisor.solvedCases}</p>
              <p className="text-xs text-earth-700">پرونده حل شده</p>
            </div>
            <div className="bg-green-50 rounded-2xl p-3 text-center">
              <Clock size={20} className="text-green-600 mx-auto mb-1" />
              <p className="text-lg font-bold text-green-800">{advisor.yearsExperience}</p>
              <p className="text-xs text-earth-700">سال تجربه</p>
            </div>
            <div className="bg-green-50 rounded-2xl p-3 text-center">
              <Star size={20} className="text-amber-500 mx-auto mb-1" />
              <p className="text-lg font-bold text-green-800">{advisor.rating}</p>
              <p className="text-xs text-earth-700">امتیاز</p>
            </div>
          </div>

          <button className="w-full bg-green-700 text-white py-3.5 rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-green-800 transition-colors">
            <MessageCircle size={18} />
            درخواست مشاوره
          </button>
        </div>
      </div>

      <div className="px-5 mt-6">
        <h2 className="font-bold text-lg mb-4">نظرات کشاورزان</h2>
        <div className="space-y-3">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
          {reviews.length === 0 && (
            <p className="text-center text-earth-700 py-8">هنوز نظری ثبت نشده است</p>
          )}
        </div>
      </div>

      <Navbar />
    </main>
  );
}