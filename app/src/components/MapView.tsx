import L from 'leaflet'
import { useEffect, useRef, useState } from 'react'
import { Circle, MapContainer, Marker, TileLayer, useMap } from 'react-leaflet'
import { SUBJECT_COLORS } from '../data/teachers'
import { distanceMeters, useGeolocation } from '../lib/geo'
import { UNLOCK_RADIUS_METERS, useGameStore } from '../store/GameStore'
import type { Teacher } from '../types/teacher'
import { CardModal } from './CardModal'

// 学校の中心地(2地点の緯度経度の中間)。未配置カードや現在地取得前の初期表示に使う。
const DEFAULT_CENTER: [number, number] = [35.066393341213665, 135.78576639797427]

function teacherIcon(teacher: Teacher, locked: boolean) {
  const color = locked ? '#475569' : SUBJECT_COLORS[teacher.subject] ?? '#64748b'
  const label = locked ? '?' : teacher.name.charAt(0)
  return L.divIcon({
    className: 'teacher-marker-wrap',
    html: `<div class="teacher-marker" style="background:${color}">${label}</div>`,
    iconSize: [34, 34],
    iconAnchor: [17, 17],
  })
}

const userIcon = L.divIcon({
  className: 'user-marker-wrap',
  html: `<div class="user-marker"></div>`,
  iconSize: [20, 20],
  iconAnchor: [10, 10],
})

function FollowUser({ lat, lng }: { lat: number | null; lng: number | null }) {
  const map = useMap()
  const done = useRef(false)
  useEffect(() => {
    if (lat != null && lng != null && !done.current) {
      map.setView([lat, lng], 18)
      done.current = true
    }
  }, [lat, lng, map])
  return null
}

function InvalidateOnShow({ active }: { active: boolean }) {
  const map = useMap()
  useEffect(() => {
    if (active) {
      // タブ切り替えで非表示→表示になった際にLeafletのサイズ計算をやり直す
      setTimeout(() => map.invalidateSize(), 0)
    }
  }, [active, map])
  return null
}

interface Props {
  active: boolean
}

export function MapView({ active }: Props) {
  const { teachers, isUnlocked, unlock } = useGameStore()
  const geo = useGeolocation(active)
  const [captured, setCaptured] = useState<Teacher | null>(null)
  const handledRef = useRef<Set<string>>(new Set())

  useEffect(() => {
    if (geo.lat == null || geo.lng == null) return
    for (const t of teachers) {
      if (isUnlocked(t.id) || handledRef.current.has(t.id)) continue
      const d = distanceMeters(geo.lat, geo.lng, t.lat, t.lng)
      if (d <= UNLOCK_RADIUS_METERS) {
        handledRef.current.add(t.id)
        unlock(t.id)
        setCaptured(t)
        if ('vibrate' in navigator) navigator.vibrate(200)
      }
    }
  }, [geo.lat, geo.lng, teachers, isUnlocked, unlock])

  const center: [number, number] =
    geo.lat != null && geo.lng != null ? [geo.lat, geo.lng] : DEFAULT_CENTER

  return (
    <div className="map-view">
      {geo.error && <div className="map-banner map-banner--error">位置情報エラー: {geo.error}</div>}
      {!geo.error && geo.lat == null && (
        <div className="map-banner">現在地を取得中です。位置情報の利用を許可してください。</div>
      )}

      <MapContainer center={center} zoom={18} className="leaflet-container">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <FollowUser lat={geo.lat} lng={geo.lng} />
        <InvalidateOnShow active={active} />

        {geo.lat != null && geo.lng != null && (
          <>
            <Marker position={[geo.lat, geo.lng]} icon={userIcon} />
            {geo.accuracy != null && (
              <Circle
                center={[geo.lat, geo.lng]}
                radius={geo.accuracy}
                pathOptions={{ color: '#3b82f6', fillOpacity: 0.08, weight: 1 }}
              />
            )}
            <Circle
              center={[geo.lat, geo.lng]}
              radius={UNLOCK_RADIUS_METERS}
              pathOptions={{ color: '#22c55e', fillOpacity: 0.05, dashArray: '4 6' }}
            />
          </>
        )}

        {teachers.map((t) => {
          const locked = !isUnlocked(t.id)
          return <Marker key={t.id} position={[t.lat, t.lng]} icon={teacherIcon(t, locked)} />
        })}
      </MapContainer>

      {captured && <CardModal teacher={captured} onClose={() => setCaptured(null)} />}
    </div>
  )
}
