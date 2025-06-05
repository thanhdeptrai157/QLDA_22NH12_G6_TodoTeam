'use client';

import { useEffect, useRef, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { GOONG_MAP_KEY } from '@/configs/env';
import { GOONG } from '@/constants/api-endpoint';

type MyMapProps = {
  lat: number | undefined;
  lng: number | undefined;
};

const typeMap = [
  '/api/goong-map?type=satellite',
  '/api/goong-map?type=normal'
];
const MyMap = ({ lat, lng }: MyMapProps) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const [mapType, setMapType] = useState<number>(0); // 0: satellite, 1: normal

  useEffect(() => {
    if (lat === undefined || lng === undefined) return;
    if (mapRef.current) return;

    fetch(typeMap[mapType])
      .then(res => res.json())
      .then(style => {
        mapRef.current = new maplibregl.Map({
          container: mapContainerRef.current as HTMLDivElement,
          style,
          center: [lng, lat],
          zoom: 15,
        });
        mapRef.current.addControl(new maplibregl.NavigationControl(), 'top-right');
        new maplibregl.Marker().setLngLat([lng, lat]).addTo(mapRef.current!);
      });

    return () => {
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, [lat, lng, mapType]);

  // Handle map style change
  const handleToggleMapType = () => {
    setMapType((prev) => (prev === 0 ? 1 : 0));
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '400px' }}>
      <div
        ref={mapContainerRef}
        style={{ width: '100%', height: '100%', border: 0 }}
      />
      <button
        onClick={handleToggleMapType}
        style={{
          position: 'absolute',
          top: 12,
          left: 12,
          zIndex: 10,
          background: 'rgba(255,255,255,0.9)',
          border: '1px solid #ccc',
          borderRadius: 6,
          padding: '6px 14px',
          cursor: 'pointer',
          fontWeight: 500
        }}
      >
        {mapType === 0 ?  'Bản đồ vệ tinh' : 'Bản đồ thường' }
      </button>
    </div>
  );
};

export default MyMap;
