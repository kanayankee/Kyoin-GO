import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'
import { TEACHERS } from '../data/teachers'
import type { CoordOverride } from '../lib/storage'
import { loadCoords, loadUnlocked, saveCoords, saveUnlocked } from '../lib/storage'
import type { Teacher } from '../types/teacher'

export const UNLOCK_RADIUS_METERS = 30

interface GameStoreValue {
  teachers: Teacher[]
  unlocked: Set<string>
  unlockedCount: number
  totalCount: number
  isUnlocked: (id: string) => boolean
  unlock: (id: string) => void
  hasOverride: (id: string) => boolean
  setCoord: (id: string, lat: number, lng: number) => void
  clearCoord: (id: string) => void
  resetProgress: () => void
  exportJson: () => string
}

const GameStoreContext = createContext<GameStoreValue | null>(null)

export function GameStoreProvider({ children }: { children: ReactNode }) {
  const [unlocked, setUnlocked] = useState<Set<string>>(() => loadUnlocked())
  const [coords, setCoords] = useState<Record<string, CoordOverride>>(() => loadCoords())

  const teachers: Teacher[] = useMemo(
    () =>
      TEACHERS.map((t) => ({
        ...t,
        lat: coords[t.id]?.lat ?? t.lat,
        lng: coords[t.id]?.lng ?? t.lng,
      })),
    [coords],
  )

  function unlock(id: string) {
    setUnlocked((prev) => {
      if (prev.has(id)) return prev
      const next = new Set(prev)
      next.add(id)
      saveUnlocked(next)
      return next
    })
  }

  function setCoord(id: string, lat: number, lng: number) {
    setCoords((prev) => {
      const next = { ...prev, [id]: { lat, lng } }
      saveCoords(next)
      return next
    })
  }

  function clearCoord(id: string) {
    setCoords((prev) => {
      const next = { ...prev }
      delete next[id]
      saveCoords(next)
      return next
    })
  }

  function resetProgress() {
    const empty = new Set<string>()
    setUnlocked(empty)
    saveUnlocked(empty)
  }

  function exportJson(): string {
    return JSON.stringify(
      teachers.map(({ id, subject, name, romaji, rarity, lat, lng }) => ({
        id,
        subject,
        name,
        romaji,
        rarity,
        lat,
        lng,
      })),
      null,
      2,
    )
  }

  const value: GameStoreValue = {
    teachers,
    unlocked,
    unlockedCount: unlocked.size,
    totalCount: teachers.length,
    isUnlocked: (id) => unlocked.has(id),
    unlock,
    hasOverride: (id) => id in coords,
    setCoord,
    clearCoord,
    resetProgress,
    exportJson,
  }

  return <GameStoreContext.Provider value={value}>{children}</GameStoreContext.Provider>
}

export function useGameStore(): GameStoreValue {
  const ctx = useContext(GameStoreContext)
  if (!ctx) throw new Error('useGameStore must be used within GameStoreProvider')
  return ctx
}
