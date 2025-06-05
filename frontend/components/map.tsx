'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect } from 'react';


delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const MyMap = ({lat, lng} : {lat: number | undefined, lng: number | undefined}) => {
  useEffect(() => {
    // client-side only logic (nếu cần)
  }, []);
  // Nếu lat hoặc lng undefined thì trả về bản đồ mặc định tại vị trí Hà Nội
  const defaultLat = 21.0285;
  const defaultLng = 105.8542;
  const centerLat = typeof lat === 'number' ? lat : defaultLat;
  const centerLng = typeof lng === 'number' ? lng : defaultLng;
  return (
    <MapContainer center={[centerLat, centerLng]} zoom={13} style={{ height: '400px', width: '100%' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={[centerLat, centerLng]}>
        <Popup>Vị trí của bạn</Popup>
      </Marker>
    </MapContainer>
  );
}

export default MyMap;