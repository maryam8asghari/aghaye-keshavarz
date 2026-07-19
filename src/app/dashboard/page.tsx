"use client";

import { useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Leaf,
  AlertTriangle,
  Building2,
  ChevronLeft,
  Filter,
} from "lucide-react";
import { useAppStore } from "@/store/useAppStore";
import { caseStatusLabels, caseStatusColors, urgencyLabels, urgencyColors } from "@/data/cases";
import { getSponsorById } from "@/data/sponsors";
import { Navbar } from "@/components/Navbar";
import { cn } from "@/lib/utils";
import { useState } from "react";

export default function DashboardPage() {
  const router = useRouter();
  const cases = useAppStore((s) => s.cases);
  const role = useAppStore((s) => s.role);
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Filter cases relevant to specialists
  const relevantCases = cases.filter((c) => {
    if (role === "specialist") {
      // Specialists see: escalated, specialist-review, recommendation, and pending
      if (statusFilter !== "all") return c.status === statusFilter;
      return (
        c.specialistStatus === "pending" ||
        c.specialistStatus === "assigned" ||
        c.status === "escalated" ||
        c.status === "specialist-review" ||
        c.status === "recommendation"
      );
    }
    // Local guides see their assigned cases
    if (statusFilter !== "all") return c.status === statusFilter;
    return c.assignedLocalGuideId !== null;
  });

  const filterOptions = [
    { value: "all", label: "همه" },
    { value: "escalated", label: "ارجاع شده" },
    { value: "specialist-review", label: "در بررسی" },
    { value: "recommendation", label: "توصیه شده" },
    { value: "resolved", label: "حل شده" },
  ];

  return (
    <main className="min-h-screen bg-earth-50 pb-24">
      {/* Header */}
      <div className="bg-white border-b border-green-100 px-5 py-4">
        <div className="flex items-center gap-3">
          <LayoutDashboard size={22} className="text-green-700" />
          <div>
            <h1 className="font-bold text-green-800">
              {role === "specialist" ? "داشبورد متخصص" : "داشبورد راهبر محلی"}
            </h1>
            <p className="text-xs text-earth-700">
              {relevantCases.length} پرونده فعال
            </p>
          </div>
        </div>
      </div>

      {/* Filter */}
      <div className="px-5 py-3 flex gap-2 overflow-x-auto">
        {filterOptions.map((opt) => (
          <button
            key={opt.value}
            onClick={() => setStatusFilter(opt.value)}
            className={cn(
              "px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all",
              statusFilter === opt.value
                ? "bg-green-700 text-white"
                : "bg-green-50 text-green-700 hover:bg-green-100"
            )}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* Case List */}
      <div className="px-5 py-3 space-y-3">
        {relevantCases.length === 0 && (
          <div className="text-center py-12">
            <Filter size={40} className="text-gray-300 mx-auto mb-3" />
            <p className="text-earth-700 font-medium">پرونده‌ای یافت نشد</p>
            <p className="text-sm text-earth-700/60 mt-1">
              فیلتر را تغییر دهید یا منتظر پرونده جدید باشید
            </p>
          </div>
        )}

        {relevantCases.map((c) => {
          const sponsor = c.sponsorId ? getSponsorById(c.sponsorId) : null;
          return (
            <button
              key={c.id}
              onClick={() => router.push(`/case/${c.id}`)}
              className="w-full bg-white rounded-2xl p-4 shadow-sm border border-green-50 text-right hover:shadow-md transition-all active:scale-[0.99]"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span
                      className={cn(
                        "px-2 py-0.5 rounded-full text-[10px] font-medium",
                        caseStatusColors[c.status]
                      )}
                    >
                      {caseStatusLabels[c.status]}
                    </span>
                    <span
                      className={cn(
                        "px-2 py-0.5 rounded-full text-[10px] font-medium",
                        urgencyColors[c.aiUrgency]
                      )}
                    >
                      {urgencyLabels[c.aiUrgency]}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mb-1">
                    <Leaf size={14} className="text-green-600 shrink-0" />
                    <span className="text-sm font-medium">{c.cropType}</span>
                    <span className="text-xs text-earth-700">— {c.id}</span>
                  </div>

                  <p className="text-xs text-gray-500 line-clamp-1 mb-1.5">
                    {c.description}
                  </p>

                  <div className="flex items-center gap-3 text-xs text-earth-700">
                    <span>{c.createdAt}</span>
                    {sponsor && (
                      <span className="flex items-center gap-1">
                        <Building2 size={10} />
                        {sponsor.name}
                      </span>
                    )}
                  </div>
                </div>

                <ChevronLeft size={16} className="text-gray-300 shrink-0 mt-2" />
              </div>
            </button>
          );
        })}
      </div>

      <Navbar />
    </main>
  );
}
