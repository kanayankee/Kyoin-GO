import L from 'leaflet'
import { useMemo, useState } from 'react'
import { MapContainer, Marker, TileLayer, useMapEvents } from 'react-leaflet'
import { getCurrentPositionOnce } from '../lib/geo'
import { useGameStore } from '../store/GameStore'

// 学校の中心地(2地点の緯度経度の中間)
const DEFAULT_CENTER: [number, number] = [35.066393341213665, 135.78576639797427]

const pinIcon = L.divIcon({
  className: 'pin-marker-wrap',
  html: `<div class="pin-marker"></div>`,
  iconSize: [22, 22],
  iconAnchor: [11, 22],
})

function ClickToPlace({ onPick }: { onPick: (lat: number, lng: number) => void }) {
  useMapEvents({
    click(e) {
      onPick(e.latlng.lat, e.latlng.lng)
    },
  })
  return null
}

export function AdminCoords() {
  const { teachers, hasOverride, setCoord, clearCoord, resetProgress, exportJson } = useGameStore()
  const [selectedId, setSelectedId] = useState<string>(teachers[0]?.id ?? '')
  const [status, setStatus] = useState<string>('')

  const selected = useMemo(() => teachers.find((t) => t.id === selectedId), [teachers, selectedId])
  const overrideCount = teachers.filter((t) => hasOverride(t.id)).length

  async function useCurrentLocation() {
    if (!selected) return
    setStatus('現在地を取得中…')
    try {
      const pos = await getCurrentPositionOnce()
      setCoord(selected.id, pos.lat, pos.lng)
      setStatus(`${selected.name} の座標を現在地(精度 約${Math.round(pos.accuracy)}m)で登録しました`)
    } catch (e) {
      setStatus(e instanceof Error ? e.message : '取得に失敗しました')
    }
  }

  function pickOnMap(lat: number, lng: number) {
    if (!selected) return
    setCoord(selected.id, lat, lng)
    setStatus(`${selected.name} の座標を地図クリックで登録しました`)
  }

  async function copyExport() {
    const json = exportJson()
    try {
      await navigator.clipboard.writeText(json)
      setStatus('全データをJSONとしてコピーしました(src/data/teachers.ts に反映してください)')
    } catch {
      setStatus('コピーに失敗しました。ブラウザの権限を確認してください')
    }
  }

  const center: [number, number] = selected ? [selected.lat, selected.lng] : DEFAULT_CENTER

  return (
    <div className="admin">
      <h1>座標登録ツール</h1>
      <p className="admin__hint">
        カードの場所は仮の座標を自動で散りばめてあります。実際の場所に合わせたい先生がいれば、
        その場所に立って「現在地をセット」を押すか、地図をタップして上書きできます。
        <br />
        上書き済み: {overrideCount} / {teachers.length}
      </p>

      <div className="admin__controls">
        <select value={selectedId} onChange={(e) => setSelectedId(e.target.value)}>
          {teachers.map((t) => (
            <option key={t.id} value={t.id}>
              {hasOverride(t.id) ? '✅ ' : '　'}
              {t.subject} / {t.name}
            </option>
          ))}
        </select>
        <button onClick={useCurrentLocation}>現在地をセット</button>
        {selected && hasOverride(selected.id) && (
          <button className="admin__clear" onClick={() => selected && clearCoord(selected.id)}>
            上書きを解除
          </button>
        )}
      </div>

      <div className="admin__map">
        <MapContainer center={center} zoom={18} className="leaflet-container">
          <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <ClickToPlace onPick={pickOnMap} />
          {teachers.map((t) => (
            <Marker key={t.id} position={[t.lat, t.lng]} icon={pinIcon} />
          ))}
        </MapContainer>
      </div>

      {status && <p className="admin__status">{status}</p>}

      <div className="admin__footer">
        <button onClick={copyExport}>全データをJSONでコピー</button>
        <button className="admin__danger" onClick={resetProgress}>
          収集済みカードをリセット(テスト用)
        </button>
      </div>
    </div>
  )
}
