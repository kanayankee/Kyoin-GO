import { useMemo, useState } from 'react'
import { SUBJECTS } from '../data/teachers'
import { useGameStore } from '../store/GameStore'
import type { Teacher } from '../types/teacher'
import { CardModal } from './CardModal'
import { TeacherCard } from './TeacherCard'

export function Zukan() {
  const { teachers, isUnlocked, unlockedCount, totalCount } = useGameStore()
  const [subjectFilter, setSubjectFilter] = useState<string | null>(null)
  const [selected, setSelected] = useState<Teacher | null>(null)

  const filtered = useMemo(
    () => teachers.filter((t) => !subjectFilter || t.subject === subjectFilter),
    [teachers, subjectFilter],
  )

  return (
    <div className="zukan">
      <div className="zukan__header">
        <h1>教員図鑑</h1>
        <p>
          {unlockedCount} / {totalCount} 体 収集済み
        </p>
        <div className="zukan__progress">
          <div
            className="zukan__progress-bar"
            style={{ width: `${totalCount ? (unlockedCount / totalCount) * 100 : 0}%` }}
          />
        </div>
      </div>

      <div className="zukan__filters">
        <button
          className={subjectFilter === null ? 'chip chip--active' : 'chip'}
          onClick={() => setSubjectFilter(null)}
        >
          すべて
        </button>
        {SUBJECTS.map((s) => (
          <button
            key={s}
            className={subjectFilter === s ? 'chip chip--active' : 'chip'}
            onClick={() => setSubjectFilter(s)}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="zukan__grid">
        {filtered.map((t) => {
          const locked = !isUnlocked(t.id)
          return (
            <TeacherCard
              key={t.id}
              teacher={t}
              locked={locked}
              onClick={() => !locked && setSelected(t)}
            />
          )
        })}
      </div>

      {selected && <CardModal teacher={selected} onClose={() => setSelected(null)} />}
    </div>
  )
}
