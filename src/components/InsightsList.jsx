export default function InsightsList({
  insights,
  goalName,
  daysLeft,
  onOpenCategory,
  onSeeGoal,
}) {
  return (
    <section className="section" aria-labelledby="insights-title">
      <h2 id="insights-title" className="section__title">
        이번 달 한마디
      </h2>
      <p className="section__subtitle">
        야단치지 않아요. 읽고 나서 하나만 확인해 보세요.
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

      <div className="insight-next">
        <p className="insight-next__title">보고 나서 할 일</p>
        <p className="insight-next__body">
          고칠 점을 외울 필요는 없어요. 어디에 돈이 나갔는지 한 번만 보고,
          {daysLeft > 0
            ? ` ${goalName}까지 ${daysLeft}일 남았다는 걸 기억하면 돼요.`
            : ` ${goalName}을 살 수 있는지 홈에서 확인하면 돼요.`}
        </p>
        <button type="button" className="insight-next__button" onClick={onSeeGoal}>
          홈에서 목표 확인하기
        </button>
      </div>
    </section>
  )
}
