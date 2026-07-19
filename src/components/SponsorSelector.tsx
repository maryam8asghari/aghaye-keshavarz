"use client";

import { useState } from "react";
import { Building2, ChevronDown, ChevronUp } from "lucide-react";
import { sponsors, type Sponsor } from "@/data/sponsors";
import { cn } from "@/lib/utils";

interface SponsorSelectorProps {
  selectedId: string | null;
  onSelect: (id: string | null) => void;
}

export function SponsorSelector({
  selectedId,
  onSelect,
}: SponsorSelectorProps) {
  const [expanded, setExpanded] = useState(false);

  const selected: Sponsor | undefined = sponsors.find(
    (sponsor: Sponsor) => sponsor.id === selectedId
  );

  return (
    <div className="rounded-2xl border border-green-50 bg-white p-5 shadow-sm">
      <button
        type="button"
        onClick={() => setExpanded((prev) => !prev)}
        className="flex w-full items-center justify-between"
      >
        <label className="flex items-center gap-2 text-sm font-medium text-earth-700">
          <Building2 size={16} className="text-green-600" />
          حامی / سازمان پشتیبان
        </label>

        {expanded ? (
          <ChevronUp size={18} className="text-earth-700" />
        ) : (
          <ChevronDown size={18} className="text-earth-700" />
        )}
      </button>

      {selected && !expanded && (
        <div className="mt-3 flex items-center gap-3 rounded-xl bg-green-50 p-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-200 text-xs font-bold text-green-800">
            {selected.initials.slice(0, 2)}
          </div>

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium">{selected.name}</p>
            <p className="text-xs text-earth-700">
              {selected.type} — {selected.city}
            </p>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onSelect(null);
            }}
            className="text-xs text-red-500 hover:text-red-700"
          >
            حذف
          </button>
        </div>
      )}

      {expanded && (
        <div className="mt-3 space-y-2">
          <button
            type="button"
            onClick={() => {
              onSelect(null);
              setExpanded(false);
            }}
            className={cn(
              "w-full rounded-xl border-2 py-2.5 text-sm font-medium transition-all",
              !selectedId
                ? "border-green-700 bg-green-700 text-white"
                : "border-transparent bg-green-50 text-green-700 hover:border-green-200"
            )}
          >
            بدون حامی
          </button>

          <div className="grid grid-cols-2 gap-2">
            {sponsors.map((sponsor: Sponsor) => (
              <button
                key={sponsor.id}
                type="button"
                onClick={() => {
                  onSelect(sponsor.id);
                  setExpanded(false);
                }}
                className={cn(
                  "flex flex-col items-center gap-1.5 rounded-xl border-2 p-3 text-center transition-all",
                  selectedId === sponsor.id
                    ? "border-green-700 bg-green-700 text-white"
                    : "border-transparent bg-green-50 text-green-800 hover:border-green-200"
                )}
              >
                <div
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-lg text-xs font-bold",
                    selectedId === sponsor.id
                      ? "bg-white/20"
                      : "bg-green-200 text-green-800"
                  )}
                >
                  {sponsor.initials.slice(0, 2)}
                </div>

                <span className="text-xs font-medium leading-tight">
                  {sponsor.name}
                </span>

                <span
                  className={cn(
                    "text-[10px]",
                    selectedId === sponsor.id
                      ? "text-green-100"
                      : "text-earth-700"
                  )}
                >
                  {sponsor.type}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
