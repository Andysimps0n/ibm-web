export default function SpendingCard({
  remainingBalance,
  monthSpent,
  onOpenSpending,
  onOpenHabits,
}) {
  function handleCardKeyDown(event) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      onOpenSpending()
    }
  }

  return (
    <section
      className="spending-card"
      aria-labelledby="spending-card-title"
      role="link"
      tabIndex={0}
      onClick={onOpenSpending}
      onKeyDown={handleCardKeyDown}
    >
      <div className="spending-card__top">
        <div>
          <p id="spending-card-title" className="spending-card__label">
            남은 돈
          </p>
          <p className="spending-card__sub">이번 달 지출 {monthSpent}</p>
        </div>
        <button
          type="button"
          className="spending-card__menu"
          aria-label="더보기"
          onClick={(event) => event.stopPropagation()}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <p className="spending-card__balance">{remainingBalance}</p>

      <div className="spending-card__actions">
        <button type="button" onClick={onOpenSpending}>
          이번 달 내역
        </button>
        <span className="spending-card__divider" aria-hidden="true" />
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation()
            onOpenHabits()
          }}
        >
          습관 보기
        </button>
      </div>
    </section>
  )
}
