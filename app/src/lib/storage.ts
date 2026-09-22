const UNLOCKED_KEY = 'kyoingo_unlocked_v1'
const COORDS_KEY = 'kyoingo_coords_v1'

export interface CoordOverride {
  lat: number
  lng: number
}

function safeParse<T>(raw: string | null, fallback: T): T {
  if (!raw) return fallback
  try {
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

export function loadUnlocked(): Set<string> {
  return new Set(safeParse<string[]>(localStorage.getItem(UNLOCKED_KEY), []))
}

export function saveUnlocked(ids: Set<string>): void {
  localStorage.setItem(UNLOCKED_KEY, JSON.stringify(Array.from(ids)))
}

export function loadCoords(): Record<string, CoordOverride> {
  return safeParse<Record<string, CoordOverride>>(localStorage.getItem(COORDS_KEY), {})
}

export function saveCoords(coords: Record<string, CoordOverride>): void {
  localStorage.setItem(COORDS_KEY, JSON.stringify(coords))
}
