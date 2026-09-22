import { useEffect, useRef, useState } from 'react'

/** 2点間の距離をメートルで返す(ハーバサイン公式) */
export function distanceMeters(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number,
): number {
  const R = 6371000
  const toRad = (deg: number) => (deg * Math.PI) / 180
  const dLat = toRad(lat2 - lat1)
  const dLng = toRad(lng2 - lng1)
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

export interface GeoState {
  lat: number | null
  lng: number | null
  accuracy: number | null
  error: string | null
  watching: boolean
}

/** 端末のGPS(Geolocation API)を継続監視する。無料・SDK不要のブラウザ標準API。 */
export function useGeolocation(enabled: boolean): GeoState {
  const [state, setState] = useState<GeoState>({
    lat: null,
    lng: null,
    accuracy: null,
    error: null,
    watching: false,
  })
  const watchId = useRef<number | null>(null)

  useEffect(() => {
    if (!enabled) {
      if (watchId.current !== null && navigator.geolocation) {
        navigator.geolocation.clearWatch(watchId.current)
        watchId.current = null
      }
      setState((s) => ({ ...s, watching: false }))
      return
    }

    if (!('geolocation' in navigator)) {
      setState((s) => ({ ...s, error: 'この端末では位置情報が利用できません' }))
      return
    }

    watchId.current = navigator.geolocation.watchPosition(
      (pos) => {
        setState({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          accuracy: pos.coords.accuracy,
          error: null,
          watching: true,
        })
      },
      (err) => {
        setState((s) => ({ ...s, error: err.message, watching: false }))
      },
      { enableHighAccuracy: true, maximumAge: 2000, timeout: 15000 },
    )

    return () => {
      if (watchId.current !== null) {
        navigator.geolocation.clearWatch(watchId.current)
        watchId.current = null
      }
    }
  }, [enabled])

  return state
}

/** 現在地を1回だけ取得する(管理画面の座標登録用) */
export function getCurrentPositionOnce(): Promise<{ lat: number; lng: number; accuracy: number }> {
  return new Promise((resolve, reject) => {
    if (!('geolocation' in navigator)) {
      reject(new Error('この端末では位置情報が利用できません'))
      return
    }
    navigator.geolocation.getCurrentPosition(
      (pos) =>
        resolve({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          accuracy: pos.coords.accuracy,
        }),
      (err) => reject(new Error(err.message)),
      { enableHighAccuracy: true, timeout: 15000 },
    )
  })
}
