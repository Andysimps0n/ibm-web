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
      className="SpendingCard spending-card"
      aria-labelledby="spending-card-title"
      role="link"
      tabIndex={0}
      onClick={onOpenSpending}
      onKeyDown={handleCardKeyDown}
    >
      <p id="spending-card-title" className="spending-card__label">
        남은 돈
      </p>
      <p className="spending-card__balance">{remainingBalance}</p>
      <div className="spending-card__footer">
        <p className="spending-card__sub">이번 달 지출 {monthSpent}</p>
        <div className="spending-card__actions">
          <button type="button" onClick={onOpenSpending}>
          </button>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation()
              onOpenHabits()
            }}
          >
          </button>
        </div>
      </div>
    </section>
  )
}
