"use client";

import { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Circle,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { advisors, type Advisor } from "@/data/advisors";
import { BottomDrawer } from "./BottomDrawer";
import { AdvisorCard } from "./AdvisorCard";
import Link from "next/link";

// Custom marker icon
const createIcon = (color: string) =>
  L.divIcon({
    className: "custom-marker",
    html: `<div style="
      width: 32px; height: 32px;
      background: ${color};
      border: 3px solid white;
      border-radius: 50%;
      box-shadow: 0 2px 8px rgba(0,0,0,0.3);
      display: flex; align-items: center; justify-content: center;
    "><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
  });

function MapEvents({
  onAdvisorClick,
}: {
  onAdvisorClick: (advisor: Advisor) => void;
}) {
  const map = useMap();

  // Fix map size after render
  setTimeout(() => {
    map.invalidateSize();
  }, 100);

  return null;
}

export function MapView() {
  const [selectedAdvisor, setSelectedAdvisor] = useState<Advisor | null>(null);

  return (
    <div className="relative w-full h-full">
      <MapContainer
        center={[35.5, 51.5]}
        zoom={10}
        className="w-full h-full"
        zoomControl={false}
        attributionControl={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />

        <MapEvents onAdvisorClick={setSelectedAdvisor} />

        {advisors.map((advisor) => (
          <div key={advisor.id}>
            <Circle
              center={[advisor.lat, advisor.lng]}
              radius={advisor.coverageRadius * 1000}
              pathOptions={{
                color: advisor.avatarColor,
                fillColor: advisor.avatarColor,
                fillOpacity: 0.1,
                weight: 1.5,
                dashArray: "6 4",
              }}
            />
            <Marker
              position={[advisor.lat, advisor.lng]}
              icon={createIcon(advisor.avatarColor)}
              eventHandlers={{
                click: () => setSelectedAdvisor(advisor),
              }}
            />
          </div>
        ))}
      </MapContainer>

      {/* Bottom Drawer */}
      <BottomDrawer
        open={!!selectedAdvisor}
        onClose={() => setSelectedAdvisor(null)}
        title="اطلاعات مشاور"
      >
        {selectedAdvisor && (
          <div className="flex flex-col gap-4 mb-16">
            <AdvisorCard advisor={selectedAdvisor} />
            <div className="flex gap-3 mt-2">
              <Link
                href={`/advisor/${selectedAdvisor.id}`}
                className="flex-1 bg-green-700 text-white text-center py-3 rounded-xl font-medium hover:bg-green-800 transition-colors"
              >
                مشاهده پروفایل
              </Link>
              <Link
                href="/case/new"
                className="flex-1 border-2 border-green-700 text-green-700 text-center py-3 rounded-xl font-medium hover:bg-green-50 transition-colors"
              >
                درخواست مشاوره
              </Link>
            </div>
          </div>
        )}
      </BottomDrawer>

      {/* Map legend */}
      <div className="absolute top-4 right-4 z-40 bg-white/90 backdrop-blur-sm rounded-xl p-3 shadow-sm border border-green-100">
        <p className="text-xs font-medium text-green-800 mb-2">
          مشاوران فعال
        </p>
        <div className="space-y-1.5">
          {advisors.slice(0, 3).map((a) => (
            <div key={a.id} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: a.avatarColor }}
              />
              <span className="text-xs text-earth-700 truncate max-w-[120px]">
                {a.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
