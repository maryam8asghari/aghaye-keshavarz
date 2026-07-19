import { User } from "lucide-react";
import { StarRating } from "./StarRating";
import type { Review } from "@/data/reviews";

interface ReviewCardProps {
  review: Review;
}

export function ReviewCard({ review }: ReviewCardProps) {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-green-50">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center shrink-0">
          <User size={18} className="text-green-700" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <h4 className="font-semibold text-sm">{review.farmerName}</h4>
            <span className="text-xs text-earth-700 shrink-0">
              {review.date}
            </span>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <StarRating rating={review.rating} size={14} />
            <span className="text-xs text-earth-700 bg-earth-100 px-2 py-0.5 rounded-full">
              {review.cropType}
            </span>
          </div>
          <p className="text-sm text-gray-600 mt-2 leading-relaxed">
            {review.text}
          </p>
        </div>
      </div>
    </div>
  );
}
