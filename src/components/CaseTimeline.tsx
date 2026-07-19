import { Check, Clock, UserPlus, MapPin, Stethoscope, Lightbulb, Flag, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

export interface TimelineStep {
  label: string;
  time: string;
  completed: boolean;
  current: boolean;
  icon?: string;
}

const iconMap: Record<string, typeof Check> = {
  created: UserPlus,
  assigned: UserPlus,
  "field-visit": MapPin,
  escalated: Stethoscope,
  "specialist-review": Stethoscope,
  recommendation: Lightbulb,
  outcome: Flag,
  feedback: MessageSquare,
};

interface CaseTimelineProps {
  steps: TimelineStep[];
}

export function CaseTimeline({ steps }: CaseTimelineProps) {
  return (
    <div className="relative">
      {steps.map((step, index) => (
        <div key={index} className="flex gap-4 last:pb-0">
          {/* Vertical line + dot */}
          <div className="flex flex-col items-center">
            <div
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center shrink-0 z-10",
                step.completed
                  ? "bg-green-600 text-white"
                  : step.current
                    ? "bg-amber-500 text-white animate-pulse"
                    : "bg-gray-200 text-gray-400"
              )}
            >
              {step.completed ? (
                <Check size={16} />
              ) : step.current ? (
                <Clock size={16} />
              ) : (
                <div className="w-2 h-2 rounded-full bg-gray-400" />
              )}
            </div>
            {index < steps.length - 1 && (
              <div
                className={cn(
                  "w-0.5 flex-1 min-h-[2rem]",
                  step.completed ? "bg-green-600" : "bg-gray-200"
                )}
              />
            )}
          </div>

          {/* Content */}
          <div className="pt-1 pb-1">
            <p
              className={cn(
                "font-medium text-sm",
                step.completed
                  ? "text-green-800"
                  : step.current
                    ? "text-amber-800"
                    : "text-gray-400"
              )}
            >
              {step.label}
            </p>
            <p className="text-xs text-earth-700 mt-0.5">{step.time}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
