import { useState } from 'react'

export default function SavingsGoalCard({
  name,
  imageSrc,
  imageAlt,
  price,
  saved,
  remaining,
  dailySaving,
  dailySavingAmount,
  percent,
  daysLeft,
  onBuy,
  onChangeDailySaving,
}) {
  const [isEditingDailySaving, setIsEditingDailySaving] = useState(false)
  const [draftDailySaving, setDraftDailySaving] = useState('')

  function cancelEditDailySaving() {
    setIsEditingDailySaving(false)
    setDraftDailySaving('')
  }

  function handleDraftChange(event) {
    const digitsOnly = event.target.value.replace(/[^0-9]/g, '')
    setDraftDailySaving(digitsOnly)
  }

  function saveDailySaving(event) {
    event.preventDefault()

    const amount = Number(draftDailySaving)

    if (!Number.isFinite(amount) || amount < 1) {
      return
    }

    onChangeDailySaving(amount)
    setIsEditingDailySaving(false)
    setDraftDailySaving('')
  }

  const canSave = Number(draftDailySaving) >= 1

  return (
    <section className="SavingsGoalCard goal-card" aria-labelledby="goal-card-title">
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
          {isEditingDailySaving ? (
            <span>하루 저축 바꾸기</span>
          ) : (
            <button
              type="button"
              className="goal-card__daily"
            >
              하루 {dailySaving}
            </button>
          )}
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

      {isEditingDailySaving ? (
        <form className="goal-card__daily-form" onSubmit={saveDailySaving}>
          <label className="goal-card__daily-label" htmlFor="daily-saving-input">
            하루에 얼마씩 모을까요?
          </label>
          <div className="goal-card__daily-row">
            <input
              id="daily-saving-input"
              className="goal-card__daily-input"
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              value={draftDailySaving}
              onChange={handleDraftChange}
              autoFocus
            />
            <span className="goal-card__daily-unit">원</span>
          </div>
          <div className="goal-card__daily-actions">
            <button
              type="button"
              className="goal-card__daily-cancel"
              onClick={cancelEditDailySaving}
            >
              취소
            </button>
            <button
              type="submit"
              className="goal-card__daily-save"
              disabled={!canSave}
            >
              저장
            </button>
          </div>
        </form>
      ) : null}

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
