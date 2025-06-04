"use client";
import dynamic from 'next/dynamic';

const MyMap = dynamic(() => import('@/components/map'), { ssr: false });

export default function HomePage() {
  return (
    <div>
      <h1>Bản đồ Leaflet</h1>
      <MyMap />
    </div>
  );
}