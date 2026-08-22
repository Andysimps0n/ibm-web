export default function CategoryBreakdown({ categories }) {
  return (
    <section className="section" id="habits" aria-labelledby="habits-title">
      <h2 id="habits-title" className="section__title">
        어디에 썼나요?
      </h2>
      <p className="section__subtitle">이번 달 습관을 한눈에 봐요</p>

      <ul className="category-list">
        {categories.map((item) => (
          <li key={item.category} className="category-row">
            <div className="category-row__label">
              <span aria-hidden="true">{item.emoji}</span>
              <span>{item.category}</span>
              <span className="category-row__amount">{item.amountLabel}</span>
            </div>
            <div className="category-row__track">
              <div
                className="category-row__fill"
                style={{
                  width: `${item.percent}%`,
                  background: item.color,
                }}
              />
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
