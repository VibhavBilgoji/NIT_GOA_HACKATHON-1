"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef } from "react";

interface MapProps {
  center?: [number, number];
  zoom?: number;
  markers?: Array<{
    id: number;
    position: [number, number];
    title: string;
    status: "open" | "in-progress" | "resolved";
  }>;
  onMarkerClick?: (id: number) => void;
}

export function InteractiveMap({
  center = [15.215, 81.81298],
  zoom = 12,
  markers = [],
  onMarkerClick,
}: MapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);

  useEffect(() => {
    // Only run on client side
    if (typeof window === "undefined" || !mapContainerRef.current) return;

    // Load MapTiler SDK dynamically
    const loadMapTiler = async () => {
      const maptilersdk = await import("@maptiler/sdk");

      if (!mapContainerRef.current || mapRef.current) return;

      // Initialize map
      mapRef.current = new maptilersdk.Map({
        container: mapContainerRef.current,
        style: maptilersdk.MapStyle.STREETS,
        center: center,
        zoom: zoom,
        apiKey: "dA7RH7aBOA9zMomjXvTC",
      });

      // Add navigation controls
      mapRef.current.addControl(
        new maptilersdk.NavigationControl(),
        "top-right",
      );

      // Add geolocate control
      mapRef.current.addControl(
        new maptilersdk.GeolocateControl({
          positionOptions: {
            enableHighAccuracy: true,
          },
          trackUserLocation: true,
        }),
        "top-right",
      );

      // Wait for map to load before adding markers
      mapRef.current.on("load", () => {
        // Add markers
        markers.forEach((marker) => {
          const el = document.createElement("div");
          el.className = "custom-marker";
          el.style.width = "30px";
          el.style.height = "30px";
          el.style.borderRadius = "50%";
          el.style.cursor = "pointer";
          el.style.border = "3px solid white";
          el.style.boxShadow = "0 2px 8px rgba(0,0,0,0.3)";

          // Color based on status
          if (marker.status === "open") {
            el.style.backgroundColor = "#ef4444"; // red
          } else if (marker.status === "in-progress") {
            el.style.backgroundColor = "#f59e0b"; // amber
          } else {
            el.style.backgroundColor = "#10b981"; // green
          }

          // Add click event
          el.addEventListener("click", () => {
            if (onMarkerClick) {
              onMarkerClick(marker.id);
            }
          });

          // Create popup
          const popup = new maptilersdk.Popup({ offset: 25 }).setHTML(
            `<div style="padding: 8px; color: black;">
              <h4 style="margin: 0 0 4px 0; font-weight: 600;">${marker.title}</h4>
              <p style="margin: 0; font-size: 12px; text-transform: capitalize;">${marker.status.replace("-", " ")}</p>
            </div>`,
          );

          // Add marker to map
          new maptilersdk.Marker({ element: el })
            .setLngLat(marker.position)
            .setPopup(popup)
            .addTo(mapRef.current);
        });
      });
    };

    loadMapTiler().catch((error) => {
      console.error("Error loading MapTiler:", error);
    });

    // Cleanup
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [center, zoom, markers, onMarkerClick]);

  return (
    <div
      ref={mapContainerRef}
      className="w-full h-full rounded-lg overflow-hidden"
      style={{ minHeight: "500px" }}
    />
  );
}
