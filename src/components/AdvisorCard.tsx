import { User } from "lucide-react";
import { StarRating } from "./StarRating";
import { AdvisorBadge } from "./AdvisorBadge";
import type { Advisor } from "@/data/advisors";

interface AdvisorCardProps {
  advisor: Advisor;
}

export function AdvisorCard({ advisor }: AdvisorCardProps) {
  return (
    <div className="flex flex-col gap-4">
      {/* Avatar + Name */}
      <div className="flex items-center gap-4">
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center shrink-0"
          style={{ backgroundColor: advisor.avatarColor + "20" }}
        >
          <User size={28} style={{ color: advisor.avatarColor }} />
        </div>
        <div className="min-w-0">
          <h3 className="font-bold text-lg truncate">{advisor.name}</h3>
          <p className="text-sm text-earth-700">{advisor.title}</p>
        </div>
      </div>

      {/* Rating */}
      <div className="flex items-center gap-2">
        <StarRating rating={Math.round(advisor.rating)} />
        <span className="text-sm font-medium">{advisor.rating}</span>
        <span className="text-xs text-earth-700">
          ({advisor.reviewCount} نظر)
        </span>
      </div>

      {/* Specialties */}
      <div className="flex flex-wrap gap-2">
        {advisor.specialties.map((s) => (
          <span
            key={s}
            className="px-3 py-1 bg-green-50 text-green-700 text-xs font-medium rounded-full"
          >
            {s}
          </span>
        ))}
      </div>

      {/* Badges */}
      <div className="flex flex-wrap gap-2">
        {advisor.badges.map((b) => (
          <AdvisorBadge key={b.type} type={b.type} label={b.label} size="sm" />
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-earth-50 rounded-xl p-3 text-center">
          <p className="text-lg font-bold text-green-700">
            {advisor.solvedCases}
          </p>
          <p className="text-xs text-earth-700">پرونده حل شده</p>
        </div>
        <div className="bg-earth-50 rounded-xl p-3 text-center">
          <p className="text-lg font-bold text-green-700">
            {advisor.yearsExperience}
          </p>
          <p className="text-xs text-earth-700">سال تجربه</p>
        </div>
      </div>
    </div>
  );
}
