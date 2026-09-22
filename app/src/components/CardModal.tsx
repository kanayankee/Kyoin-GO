import { RARITY_LABEL, RARITY_STARS } from '../types/teacher'
import type { Teacher } from '../types/teacher'
import { CardArt } from './CardArt'

interface Props {
  teacher: Teacher
  onClose: () => void
}

export function CardModal({ teacher, onClose }: Props) {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <CardArt teacher={teacher} />
        <h2>{teacher.name}</h2>
        <p className="modal-card__subject">{teacher.subject}科</p>
        <p className="modal-card__rarity">
          {'★'.repeat(RARITY_STARS[teacher.rarity])} {RARITY_LABEL[teacher.rarity]}
        </p>
        <button className="modal-card__close" onClick={onClose}>
          とじる
        </button>
      </div>
    </div>
  )
}
