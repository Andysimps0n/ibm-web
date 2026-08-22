const THEMES = [
  { id: 'yellow', label: '노랑', color: '#fde932' },
  { id: 'navy', label: '네이비', color: '#7d8fad' },
  { id: 'green', label: '초록', color: '#9fc4a6' },
]

export default function DashboardHeader({
  name,
  accountLabel,
  avatarSrc,
  theme,
  unreadCount,
  onChangeTheme,
  onOpenNotifications,
}) {
  return (
    <section className="DashboardHeader">
      <header className="dash-header">
        <div className="dash-header__identity">
          <h1 className="dash-header__name">{name}</h1>
          <span className="dash-header__pill">{accountLabel}</span>
        </div>
        <div className="dash-header__actions">
          <div className="theme-chips" role="group" aria-label="테마 색상">
            {THEMES.map((item) => {
              const isSelected = item.id === theme

              return (
                <button
                  key={item.id}
                  type="button"
                  className="theme-chip"
                  style={{ background: item.color }}
                  aria-label={item.label}
                  aria-pressed={isSelected}
                  onClick={() => onChangeTheme(item.id)}
                />
              )
            })}
          </div>
          <button
            type="button"
            className="dash-header__notice"
            aria-label={
              unreadCount > 0
                ? `알림 ${unreadCount}개`
                : '알림'
            }
            onClick={onOpenNotifications}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M6 9a6 6 0 1 1 12 0c0 4.2 1.5 5.5 1.5 5.5H4.5S6 13.2 6 9Z" />
              <path d="M10 18.5a2 2 0 0 0 4 0" />
            </svg>
            {unreadCount > 0 ? (
              <span className="dash-header__badge">{unreadCount}</span>
            ) : null}
          </button>
          <img
            className="dash-header__avatar"
            src={avatarSrc}
            alt={`${name} 프로필`}
          />
        </div>
      </header>
    </section>
  )
}
