export type Tab = 'map' | 'zukan' | 'admin'

interface Props {
  active: Tab
  onChange: (tab: Tab) => void
}

const TABS: { key: Tab; label: string; icon: string }[] = [
  { key: 'map', label: 'マップ', icon: '🗺️' },
  { key: 'zukan', label: '図鑑', icon: '🎴' },
  { key: 'admin', label: '設定', icon: '📍' },
]

export function TabBar({ active, onChange }: Props) {
  return (
    <nav className="tabbar">
      {TABS.map((t) => (
        <button
          key={t.key}
          className={active === t.key ? 'tabbar__item tabbar__item--active' : 'tabbar__item'}
          onClick={() => onChange(t.key)}
        >
          <span className="tabbar__icon">{t.icon}</span>
          <span>{t.label}</span>
        </button>
      ))}
    </nav>
  )
}
