import { useState } from 'react'
import { SUBJECT_COLORS } from '../data/teachers'
import type { Teacher } from '../types/teacher'

interface Props {
  teacher: Teacher
  locked?: boolean
}

/**
 * public/cards/{id}.jpg があればそれを表示し、無ければ教科カラー×頭文字の
 * プレースホルダーを自動生成する。写真素材が揃うまでのつなぎ。
 */
export function CardArt({ teacher, locked }: Props) {
  const [imgFailed, setImgFailed] = useState(false)
  const color = SUBJECT_COLORS[teacher.subject] ?? '#64748b'
  const initial = teacher.name.replace(/\s/g, '').charAt(0)

  if (locked) {
    return (
      <div className="card-art card-art--locked">
        <span className="card-art__question">?</span>
      </div>
    )
  }

  if (!imgFailed) {
    return (
      <div className="card-art">
        <img
          src={`./cards/${teacher.id}.jpg`}
          alt={teacher.name}
          onError={() => setImgFailed(true)}
        />
      </div>
    )
  }

  return (
    <div
      className="card-art card-art--placeholder"
      style={{ background: `linear-gradient(155deg, ${color}, #111827)` }}
    >
      <span className="card-art__initial">{initial}</span>
    </div>
  )
}
