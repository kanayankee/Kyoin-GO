import { SUBJECT_COLORS } from '../data/teachers'
import { RARITY_STARS } from '../types/teacher'
import type { Teacher } from '../types/teacher'
import { CardArt } from './CardArt'

interface Props {
  teacher: Teacher
  locked: boolean
  onClick?: () => void
}

export function TeacherCard({ teacher, locked, onClick }: Props) {
  const color = SUBJECT_COLORS[teacher.subject] ?? '#64748b'
  return (
    <button
      className={`teacher-card teacher-card--${teacher.rarity.toLowerCase()}`}
      onClick={onClick}
      style={{ borderColor: locked ? '#cbd5e1' : color }}
    >
      <CardArt teacher={teacher} locked={locked} />
      <div className="teacher-card__stars">{'★'.repeat(RARITY_STARS[teacher.rarity])}</div>
      <div className="teacher-card__name">{locked ? '？？？' : teacher.name}</div>
      <div className="teacher-card__subject" style={{ color }}>
        {locked ? '' : teacher.subject}
      </div>
    </button>
  )
}
