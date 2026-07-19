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
import { specialistLocations, specialistLocationLabels, type SpecialistLocation } from "@/data/specialist-locations";
import { useAppStore } from "@/store/useAppStore";
import { BottomDrawer } from "./BottomDrawer";
import { AdvisorCard } from "./AdvisorCard";
import Link from "next/link";

// Custom marker icon for advisors
const createAdvisorIcon = (color: string) =>
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

// Custom marker icon for specialist locations
const createLocationIcon = (color: string) =>
  L.divIcon({
    className: "custom-marker",
    html: `<div style="
      width: 32px; height: 32px;
      background: ${color};
      border: 3px solid white;
      border-radius: 50%;
      box-shadow: 0 2px 8px rgba(0,0,0,0.3);
      display: flex; align-items: center; justify-content: center;
    "><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg></div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
  });

function MapEvents() {
  const map = useMap();
  setTimeout(() => {
    map.invalidateSize();
  }, 100);
  return null;
}

type SelectedItem = { type: "advisor"; data: Advisor } | { type: "location"; data: SpecialistLocation };

export function MapView() {
  const [selectedItem, setSelectedItem] = useState<SelectedItem | null>(null);
  const role = useAppStore((s) => s.role);

  const visibleAdvisors = advisors.filter((advisor) => {
    if (role === "farmer") {
      return advisor.role === "local_guide";
    }
    if (role === "local_guide") {
      return advisor.role === "specialist";
    }
    return false;
  });

  const visibleLocations = role === "specialist" ? specialistLocations : [];

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
        <MapEvents />
        {visibleAdvisors.map((advisor) => (
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
              icon={createAdvisorIcon(advisor.avatarColor)}
              eventHandlers={{
                click: () => setSelectedItem({ type: "advisor", data: advisor }),
              }}
            />
          </div>
        ))}
        {visibleLocations.map((location) => (
          <Marker
            key={location.id}
            position={[location.lat, location.lng]}
            icon={createLocationIcon(location.avatarColor)}
            eventHandlers={{
              click: () => setSelectedItem({ type: "location", data: location }),
            }}
          />
        ))}
      </MapContainer>
      <BottomDrawer
        open={!!selectedItem}
        onClose={() => setSelectedItem(null)}
        title={selectedItem?.type === "advisor" ? "اطلاعات مشاور" : "اطلاعات مکان"}
      >
        {selectedItem?.type === "advisor" && (
          <div className="mb-16 flex flex-col gap-4">
            <AdvisorCard advisor={selectedItem.data} />
            <div className="mt-2 flex gap-3">
              <Link
                href={`/advisor/${selectedItem.data.id}`}
                className="flex-1 rounded-xl bg-green-700 py-3 text-center font-medium text-white transition-colors hover:bg-green-800"
              >
                مشاهده پروفایل
              </Link>
              <Link
                href="/case/new"
                className="flex-1 rounded-xl border-2 border-green-700 py-3 text-center font-medium text-green-700 transition-colors hover:bg-green-50"
              >
                درخواست مشاوره
              </Link>
            </div>
          </div>
        )}
        {selectedItem?.type === "location" && (
          <div className="mb-16 flex flex-col gap-4">
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-green-50">
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold"
                  style={{ backgroundColor: selectedItem.data.avatarColor }}
                >
                  {selectedItem.data.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-bold text-sm">{selectedItem.data.name}</h3>
                  <p className="text-xs text-earth-700">{specialistLocationLabels[selectedItem.data.type]}</p>
                </div>
              </div>
              <p className="text-xs text-gray-600 mb-2">{selectedItem.data.description}</p>
              {selectedItem.data.address && (
                <p className="text-xs text-earth-700">{selectedItem.data.address}</p>
              )}
              {selectedItem.data.phone && (
                <p className="text-xs text-earth-700 mt-1">{selectedItem.data.phone}</p>
              )}
            </div>
          </div>
        )}
      </BottomDrawer>
      <div className="absolute right-4 top-4 z-40 rounded-xl border border-green-100 bg-white/90 p-3 shadow-sm backdrop-blur-sm">
        <p className="mb-2 text-xs font-medium text-green-800">
          {role === "farmer" && "راهبران محلی"}
          {role === "local_guide" && "متخصصان"}
          {role === "specialist" && "تأمین‌کنندگان"}
        </p>
        <div className="space-y-1.5">
          {role === "specialist"
            ? visibleLocations.slice(0, 3).map((l) => (
                <div key={l.id} className="flex items-center gap-2">
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: l.avatarColor }}
                  />
                  <span className="max-w-[120px] truncate text-xs text-earth-700">
                    {l.name}
                  </span>
                </div>
              ))
            : visibleAdvisors.slice(0, 3).map((a) => (
                <div key={a.id} className="flex items-center gap-2">
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: a.avatarColor }}
                  />
                  <span className="max-w-[120px] truncate text-xs text-earth-700">
                    {a.name}
                  </span>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
}
