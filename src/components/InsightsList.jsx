export default function InsightsList({
  insights,
  goalName,
  daysLeft,
  onOpenCategory,
  onSeeGoal,
}) {
  return (
    <section className="InsightsList section" aria-labelledby="insights-title">
      <h2 id="insights-title" className="section__title">
        이번 달 한마디
      </h2>
      <p className="section__subtitle">
        {/* 야단치지 않아요. 읽고 나서 하나만 확인해 보세요. */}
      </p>

      {insights.length === 0 ? (
        <div className="insight-card">
          <p className="insight-card__title">이번 달은 무난해요</p>
          <p className="insight-card__body">
            크게 늘어난 소비가 없어요. {goalName}까지 남은 날을 한번
            확인해 볼까요?
          </p>
          <button
            type="button"
            className="insight-card__action"
            onClick={onSeeGoal}
          >
            목표 다시 보기
          </button>
        </div>
      ) : (
        <ul className="insight-list">
          {insights.map((insight) => (
            <li key={insight.id} className="insight-card">
              <p className="insight-card__title">{insight.title}</p>
              <p className="insight-card__body">{insight.body}</p>
              <button
                type="button"
                className="insight-card__action"
                onClick={() => onOpenCategory(insight.actionCategory)}
              >
                {insight.actionLabel}
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
