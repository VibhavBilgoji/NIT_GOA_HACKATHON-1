"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";

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
  center = [73.8278, 15.4909],
  zoom = 12,
  markers = [],
  onMarkerClick,
}: MapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Only run on client side
    if (typeof window === "undefined" || !mapContainerRef.current) return;

    // Load MapTiler SDK dynamically
    const loadMapTiler = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const maptilersdk = await import("@maptiler/sdk");

        // Load MapTiler CSS
        if (!document.querySelector('link[href*="maptiler-sdk.css"]')) {
          const link = document.createElement("link");
          link.rel = "stylesheet";
          link.href = "/maptiler-sdk.css";
          document.head.appendChild(link);
        }

        if (!mapContainerRef.current || mapRef.current) return;

        // Initialize map
        mapRef.current = new maptilersdk.Map({
          container: mapContainerRef.current,
          style: maptilersdk.MapStyle.STREETS,
          center: [center[0], center[1]],
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
          setIsLoading(false);
        });

        mapRef.current.on("error", (e: any) => {
          console.error("Map error:", e);
          setError("Failed to load map");
          setIsLoading(false);
        });
      } catch (error) {
        console.error("Error loading MapTiler:", error);
        setError("Failed to load map SDK");
        setIsLoading(false);
      }
    };

    loadMapTiler();

    // Cleanup
    return () => {
      if (mapRef.current) {
        markersRef.current.forEach((marker) => marker.remove());
        markersRef.current = [];
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [center, zoom]);

  // Update markers when they change
  useEffect(() => {
    if (mapRef.current && !isLoading) {
      import("@maptiler/sdk").then((maptilersdk) => {
        // Clear existing markers
        markersRef.current.forEach((marker) => marker.remove());
        markersRef.current = [];

        // Add new markers
        markers.forEach((marker) => {
          const el = document.createElement("div");
          el.className = "custom-marker";
          el.style.width = "30px";
          el.style.height = "30px";
          el.style.borderRadius = "50%";
          el.style.cursor = "pointer";
          el.style.border = "3px solid white";
          el.style.boxShadow = "0 2px 8px rgba(0,0,0,0.3)";
          el.style.transition = "box-shadow 0.2s ease";

          // Hover effect - use box-shadow instead of scale to prevent movement
          el.addEventListener("mouseenter", () => {
            el.style.boxShadow = "0 4px 16px rgba(0,0,0,0.5)";
          });
          el.addEventListener("mouseleave", () => {
            el.style.boxShadow = "0 2px 8px rgba(0,0,0,0.3)";
          });

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
            `<div style="padding: 12px; color: black; min-width: 200px;">
              <h4 style="margin: 0 0 8px 0; font-weight: 600; font-size: 14px;">${marker.title}</h4>
              <p style="margin: 0; font-size: 12px; text-transform: capitalize; color: #666;">
                Status: ${marker.status.replace("-", " ")}
              </p>
            </div>`,
          );

          // Add marker to map
          const mapMarker = new maptilersdk.Marker({ element: el })
            .setLngLat([marker.position[0], marker.position[1]])
            .setPopup(popup)
            .addTo(mapRef.current);

          markersRef.current.push(mapMarker);
        });
      });
    }
  }, [markers, onMarkerClick, isLoading]);

  return (
    <div
      className="w-full rounded-lg overflow-hidden relative"
      style={{ height: "500px", maxHeight: "500px" }}
    >
      <div ref={mapContainerRef} className="w-full h-full" />

      {isLoading && (
        <div className="absolute inset-0 bg-gray-100 dark:bg-gray-800 flex items-center justify-center rounded-lg">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black dark:border-white mx-auto mb-2"></div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Loading map...
            </p>
          </div>
        </div>
      )}

      {error && (
        <div className="absolute inset-0 bg-gray-100 dark:bg-gray-800 flex items-center justify-center rounded-lg">
          <div className="text-center p-4">
            <p className="text-sm text-red-600 dark:text-red-400 mb-2">
              {error}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="text-xs bg-black dark:bg-white text-white dark:text-black px-3 py-1 rounded hover:opacity-80"
            >
              Retry
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
