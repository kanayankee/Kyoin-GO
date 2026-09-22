export type Rarity = 'N' | 'R' | 'SR' | 'UR'

export interface TeacherBase {
  id: string
  subject: string
  name: string
  romaji: string
  rarity: Rarity
  lat: number
  lng: number
}

export interface Teacher extends TeacherBase {
  lat: number
  lng: number
}

export const RARITY_ORDER: Rarity[] = ['N', 'R', 'SR', 'UR']

export const RARITY_LABEL: Record<Rarity, string> = {
  N: 'ノーマル',
  R: 'レア',
  SR: 'スーパーレア',
  UR: 'ウルトラレア',
}

export const RARITY_STARS: Record<Rarity, number> = {
  N: 1,
  R: 2,
  SR: 3,
  UR: 4,
}
