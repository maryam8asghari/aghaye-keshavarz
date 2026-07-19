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
  const selected = sponsors.find((s) => s.id === selectedId);

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-green-50">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between"
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

      {/* Selected display */}
      {selected && !expanded && (
        <div className="mt-3 flex items-center gap-3 bg-green-50 rounded-xl p-3">
          <div className="w-10 h-10 rounded-lg bg-green-200 flex items-center justify-center text-xs font-bold text-green-800">
            {selected.initials.slice(0, 2)}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{selected.name}</p>
            <p className="text-xs text-earth-700">{selected.type} — {selected.city}</p>
          </div>
          <button
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

      {/* Expanded grid */}
      {expanded && (
        <div className="mt-3 space-y-2">
          <button
            onClick={() => {
              onSelect(null);
              setExpanded(false);
            }}
            className={cn(
              "w-full py-2.5 rounded-xl text-sm font-medium transition-all border-2",
              !selectedId
                ? "bg-green-700 text-white border-green-700"
                : "bg-green-50 text-green-700 border-transparent hover:border-green-200"
            )}
          >
            بدون حامی
          </button>

          <div className="grid grid-cols-2 gap-2">
            {sponsors.map((sponsor) => (
              <button
                key={sponsor.id}
                onClick={() => {
                  onSelect(sponsor.id);
                  setExpanded(false);
                }}
                className={cn(
                  "flex flex-col items-center gap-1.5 p-3 rounded-xl border-2 transition-all text-center",
                  selectedId === sponsor.id
                    ? "bg-green-700 text-white border-green-700"
                    : "bg-green-50 text-green-800 border-transparent hover:border-green-200"
                )}
              >
                <div
                  className={cn(
                    "w-10 h-10 rounded-lg flex items-center justify-center text-xs font-bold",
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
