"use client";

import dynamic from "next/dynamic";
import { Navbar } from "@/components/Navbar";
import { MapPin } from "lucide-react";

const MapView = dynamic(
  () => import("@/components/MapView").then((m) => ({ default: m.MapView })),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center bg-earth-50">
        <div className="text-center">
          <MapPin size={48} className="text-green-300 mx-auto mb-4 animate-bounce" />
          <p className="text-earth-700 font-medium">در حال بارگذاری نقشه...</p>
        </div>
      </div>
    ),
  }
);

export default function MapPage() {
  return (
    <main className="h-screen flex flex-col">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-md border-b border-green-100 px-5 py-3 z-40 relative">
        <div className="flex items-center gap-3">
          <MapPin size={22} className="text-green-700" />
          <div>
            <h1 className="font-bold text-green-800">نقشه مشاوران</h1>
            <p className="text-xs text-earth-700">
              مشاوران فعال در منطقه تهران و ورامین
            </p>
          </div>
        </div>
      </div>

      {/* Map */}
      <div className="flex-1 relative">
        <MapView />
      </div>

      <Navbar />
    </main>
  );
}
