export default function SpendingStats({
  thisMonthSpent,
  comparisonLabel,
  count,
  averagePerTx,
  averagePerDay,
  topCategory,
  topCategoryAmount,
  topCategoryEmoji,
}) {
  return (
    <section className="section" aria-labelledby="stats-title">
      <h2 id="stats-title" className="section__title">
        이번 달 소비 통계
      </h2>
      <p className="section__subtitle">숫자가 많을수록, 고칠 점도 보여요</p>

      <div className="stats-hero">
        <p className="stats-hero__label">이번 달 총 지출</p>
        <p className="stats-hero__amount">{thisMonthSpent}</p>
        <p className="stats-hero__compare">{comparisonLabel}</p>
      </div>

      <dl className="stats-grid">
        <div>
          <dt>거래 횟수</dt>
          <dd>{count}번</dd>
        </div>
        <div>
          <dt>건당 평균</dt>
          <dd>{averagePerTx}</dd>
        </div>
        <div>
          <dt>하루 평균</dt>
          <dd>{averagePerDay}</dd>
        </div>
      </dl>

      {topCategory ? (
        <div className="stats-top">
          <p className="stats-top__label">가장 많이 쓴 곳</p>
          <p className="stats-top__value">
            <span aria-hidden="true">{topCategoryEmoji}</span>
            {topCategory}
            <span className="stats-top__amount">{topCategoryAmount}</span>
          </p>
        </div>
      ) : null}
    </section>
  )
}
