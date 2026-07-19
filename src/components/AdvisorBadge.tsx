import { ShieldCheck, Crown, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import type { BadgeType } from "@/data/advisors";

const badgeConfig: Record<
  BadgeType,
  { icon: typeof ShieldCheck; color: string; bg: string }
> = {
  verified: {
    icon: ShieldCheck,
    color: "text-green-700",
    bg: "bg-green-100",
  },
  "local-hero": {
    icon: Crown,
    color: "text-amber-600",
    bg: "bg-amber-100",
  },
  "fast-responder": {
    icon: Zap,
    color: "text-blue-600",
    bg: "bg-blue-100",
  },
};

interface AdvisorBadgeProps {
  type: BadgeType;
  label: string;
  size?: "sm" | "md";
}

export function AdvisorBadge({ type, label, size = "md" }: AdvisorBadgeProps) {
  const config = badgeConfig[type];
  const Icon = config.icon;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full font-medium",
        config.bg,
        config.color,
        size === "sm" ? "px-2 py-0.5 text-xs" : "px-3 py-1 text-sm"
      )}
    >
      <Icon size={size === "sm" ? 12 : 14} />
      {label}
    </span>
  );
}
