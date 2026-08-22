export default function SavingsGoalCard({
  name,
  imageSrc,
  imageAlt,
  price,
  saved,
  remaining,
  dailySaving,
  percent,
  daysLeft,
  onBuy,
}) {
  return (
    <section className="goal-card" aria-labelledby="goal-card-title">
      <div className="goal-card__hero">
        <img className="goal-card__image" src={imageSrc} alt={imageAlt} />
        <div>
          <p className="goal-card__eyebrow">갖고 싶은 것</p>
          <h2 id="goal-card-title" className="goal-card__name">
            {name}
          </h2>
        </div>
      </div>

      <dl className="goal-card__stats">
        <div>
          <dt>가격</dt>
          <dd>{price}</dd>
        </div>
        <div>
          <dt>모은 돈</dt>
          <dd>{saved}</dd>
        </div>
        <div>
          <dt>남은 금액</dt>
          <dd>{remaining}</dd>
        </div>
      </dl>

      <div className="goal-card__progress">
        <div className="goal-card__progress-top">
          <span>진행률 {percent}%</span>
          <span>하루 {dailySaving}</span>
        </div>
        <div
          className="goal-card__bar"
          role="progressbar"
          aria-valuenow={percent}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`${name} 저축 진행률`}
        >
          <div
            className="goal-card__bar-fill"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>

      {daysLeft > 0 ? (
        <p className="goal-card__message">
          {daysLeft}일 후면 살 수 있어요!
        </p>
      ) : (
        <button
          type="button"
          className="goal-card__message goal-card__buy"
          onClick={onBuy}
        >
          지금 사기
        </button>
      )}
    </section>
  )
}
