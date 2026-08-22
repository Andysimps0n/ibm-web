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
  onChangeTheme,
}) {
  return (
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
                className={isSelected ? 'theme-chip is-selected' : 'theme-chip'}
                style={{ background: item.color }}
                aria-label={item.label}
                aria-pressed={isSelected}
                onClick={() => onChangeTheme(item.id)}
              />
            )
          })}
        </div>
        <img
          className="dash-header__avatar"
          src={avatarSrc}
          alt={`${name} 프로필`}
        />
      </div>
    </header>
  )
}
