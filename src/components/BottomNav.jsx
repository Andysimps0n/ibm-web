function HomeIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1v-9.5Z" />
    </svg>
  )
}

function MoneyIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="8.5" />
      <path d="M9 8.5h4.2a2.3 2.3 0 0 1 0 4.6H10.5M10.5 13.1H14a2.2 2.2 0 0 1 0 4.4H9M12 7.2v1.3M12 15.5v1.5" />
    </svg>
  )
}

function FeedbackIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 5.5h14a1.5 1.5 0 0 1 1.5 1.5v8A1.5 1.5 0 0 1 19 16.5H10l-4.5 3v-3H5A1.5 1.5 0 0 1 3.5 15V7A1.5 1.5 0 0 1 5 5.5Z" />
    </svg>
  )
}

function StatsIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6 18V11M12 18V6M18 18v-8" />
    </svg>
  )
}

function CartIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M3 4.5h2l1.6 9.5h12.2L21 8H7.2" />
      <circle cx="9.2" cy="19.2" r="1.5" />
      <circle cx="17.4" cy="19.2" r="1.5" />
    </svg>
  )
}

const TABS = [
  { id: 'home', label: '홈', Icon: HomeIcon },
  // { id: 'habits', label: '소비', Icon: MoneyIcon },
  { id: 'insights', label: '피드백', Icon: FeedbackIcon },
  { id: 'spending', label: '통계', Icon: StatsIcon },
  { id: 'shop', label: '쇼핑', Icon: CartIcon },
]

export default function BottomNav({ activeTab, onChange }) {
  return (
    <section className="BottomNav">
      <nav className="bottom-nav" aria-label="하단 메뉴">
        {TABS.map((tab) => {
          const isActive = tab.id === activeTab
          const Icon = tab.Icon

          return (
            <button
              key={tab.id}
              type="button"
              className={isActive ? 'bottom-nav__item is-active' : 'bottom-nav__item'}
              onClick={() => onChange(tab.id)}
              aria-current={isActive ? 'page' : undefined}
            >
              <span className="bottom-nav__icon">
                <Icon />
              </span>
              {tab.label}
            </button>
          )
        })}
      </nav>
    </section>
  )
}
