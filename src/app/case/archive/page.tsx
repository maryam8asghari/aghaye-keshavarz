"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Archive,
  ChevronLeft,
  Leaf,
  Calendar,
  Search,
  Filter,
} from "lucide-react";
import { useAppStore } from "@/store/useAppStore";
import {
  caseStatusLabels,
  caseStatusColors,
  urgencyLabels,
  urgencyColors,
} from "@/data/cases";
import { getAdvisorById } from "@/data/advisors";
import { getSponsorById } from "@/data/sponsors";
import { Navbar } from "@/components/Navbar";
import { cn } from "@/lib/utils";

export default function CaseArchivePage() {
  const router = useRouter();
  const cases = useAppStore((s) => s.cases);
  const role = useAppStore((s) => s.role);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Filter cases based on role
  const allCases = cases.filter((c) => {
    if (role === "farmer") {
      // Farmers see only their own cases
      return c.creatorId === "user-current";
    }
    if (role === "local_guide") {
      // Local guides see cases assigned to them
      return c.assignedLocalGuideId === "adv-001";
    }
    if (role === "specialist") {
      // Specialists see cases referred to them
      return c.specialistId === "adv-009" || c.specialistStatus === "pending";
    }
    return false;
  });

  const filteredCases = allCases.filter((c) => {
    const matchesSearch =
      c.cropType.includes(searchTerm) ||
      c.description.includes(searchTerm) ||
      c.id.includes(searchTerm);
    const matchesStatus = statusFilter === "all" || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const sortedCases = [...filteredCases].sort((a, b) => {
    return b.createdAt.localeCompare(a.createdAt);
  });

  const filterOptions = [
    { value: "all", label: "همه" },
    { value: "open", label: "باز" },
    { value: "triaged", label: "تحلیل شده" },
    { value: "assigned", label: "تخصیص داده شده" },
    { value: "field-visit", label: "بازدید میدانی" },
    { value: "resolved", label: "حل شده" },
  ];

  const stats = {
    total: allCases.length,
    open: allCases.filter((c) => c.status === "open" || c.status === "triaged").length,
    inProgress: allCases.filter(
      (c) =>
        c.status === "assigned" ||
        c.status === "field-visit" ||
        c.status === "escalated" ||
        c.status === "specialist-review"
    ).length,
    resolved: allCases.filter((c) => c.status === "resolved").length,
  };

  const getPageTitle = () => {
    switch (role) {
      case "farmer":
        return "پرونده‌های من";
      case "local_guide":
        return "پرونده‌های تخصیص یافته";
      case "specialist":
        return "پرونده‌های ارجاعی";
      default:
        return "آرشیو پرونده‌ها";
    }
  };

  return (
    <main className="min-h-screen bg-earth-50 pb-24">
      <div className="bg-white border-b border-green-100 px-5 py-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.back()}
            className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center hover:bg-green-100 transition-colors"
          >
            <ChevronLeft size={18} className="text-green-700 rotate-180" />
          </button>
          <div className="flex-1">
            <h1 className="font-bold text-green-800 flex items-center gap-2">
              <Archive size={20} />
              {getPageTitle()}
            </h1>
            <p className="text-xs text-earth-700">
              {stats.total} پرونده ثبت شده
            </p>
          </div>
        </div>
      </div>

      <div className="px-5 py-4">
        <div className="grid grid-cols-4 gap-3">
          <div className="bg-white rounded-xl p-3 text-center shadow-sm border border-green-50">
            <p className="text-lg font-bold text-green-700">{stats.total}</p>
            <p className="text-[10px] text-earth-700">کل</p>
          </div>
          <div className="bg-white rounded-xl p-3 text-center shadow-sm border border-blue-50">
            <p className="text-lg font-bold text-blue-700">{stats.open}</p>
            <p className="text-[10px] text-earth-700">باز</p>
          </div>
          <div className="bg-white rounded-xl p-3 text-center shadow-sm border border-amber-50">
            <p className="text-lg font-bold text-amber-700">{stats.inProgress}</p>
            <p className="text-[10px] text-earth-700">در حال بررسی</p>
          </div>
          <div className="bg-white rounded-xl p-3 text-center shadow-sm border border-green-50">
            <p className="text-lg font-bold text-green-700">{stats.resolved}</p>
            <p className="text-[10px] text-earth-700">حل شده</p>
          </div>
        </div>
      </div>

      <div className="px-5 pb-3">
        <div className="relative">
          <Search
            size={18}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="جستجو بر اساس نوع محصول یا شرح پرونده..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pr-10 pl-4 py-3 rounded-xl border border-green-100 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="px-5 pb-4 flex gap-2 overflow-x-auto">
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

      <div className="px-5 py-3 space-y-3">
        {sortedCases.length === 0 && (
          <div className="text-center py-12">
            <Filter size={40} className="text-gray-300 mx-auto mb-3" />
            <p className="text-earth-700 font-medium">پرونده‌ای یافت نشد</p>
            <p className="text-sm text-earth-700/60 mt-1">
              فیلتر یا جستجو را تغییر دهید
            </p>
          </div>
        )}

        {sortedCases.map((c) => {
          const guide = c.assignedLocalGuideId
            ? getAdvisorById(c.assignedLocalGuideId)
            : null;
          const sponsor = c.sponsorId ? getSponsorById(c.sponsorId) : null;

          return (
            <button
              key={c.id}
              onClick={() => router.push("/case/" + c.id)}
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

                  <p className="text-xs text-gray-500 line-clamp-2 mb-1.5">
                    {c.description}
                  </p>

                  <div className="flex items-center gap-3 text-xs text-earth-700">
                    <span className="flex items-center gap-1">
                      <Calendar size={10} />
                      {c.createdAt}
                    </span>
                    {guide && (
                      <span className="flex items-center gap-1">
                        <Leaf size={10} />
                        {guide.name}
                      </span>
                    )}
                    {sponsor && (
                      <span className="flex items-center gap-1">
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