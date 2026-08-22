import { useState } from 'react'

export default function PaymentPage({
  name,
  imageSrc,
  imageAlt,
  priceLabel,
  savedLabel,
  leftoverLabel,
  accountLabel,
  onCancel,
  onConfirmPay,
  onGoHome,
  onPickNextGoal,
}) {
  const [step, setStep] = useState('checkout')

  function handlePay() {
    setStep('done')
  }

  function handleGoHome() {
    onConfirmPay()
    onGoHome()
  }

  function handlePickNextGoal() {
    onConfirmPay()
    onPickNextGoal()
  }

  if (step === 'done') {
    return (
      <div className="payment">
        <div className="payment__done">
          <p className="payment__check" aria-hidden="true">
            ✓
          </p>
          <h1 className="payment__done-title">결제 완료</h1>
          <p className="payment__done-body">
            {name}를 샀어요. 남은 저축은 {leftoverLabel}이에요.
          </p>

          <div className="payment__done-actions">
            <button
              type="button"
              className="payment__primary"
              onClick={handleGoHome}
            >
              홈으로
            </button>
            <button
              type="button"
              className="payment__secondary"
              onClick={handlePickNextGoal}
            >
              다음 목표 고르기
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="payment">
      <header className="payment__header">
        <button type="button" className="payment__back" onClick={onCancel}>
          취소
        </button>
        <h1 className="payment__title">결제</h1>
        <span className="payment__demo">데모</span>
      </header>

      <section className="payment__product">
        <img className="payment__image" src={imageSrc} alt={imageAlt} />
        <div>
          <p className="payment__product-label">구매할 물건</p>
          <p className="payment__product-name">{name}</p>
        </div>
      </section>

      <dl className="payment__summary">
        <div>
          <dt>결제 금액</dt>
          <dd>{priceLabel}</dd>
        </div>
        <div>
          <dt>모은 돈</dt>
          <dd>{savedLabel}</dd>
        </div>
      </dl>

      <section className="payment__method" aria-label="결제 수단">
        <h2 className="payment__method-title">결제 수단</h2>
        <div className="payment__method-card is-selected">
          <p className="payment__method-name">{accountLabel}</p>
          <p className="payment__method-hint">모은 돈으로 바로 결제해요</p>
        </div>
      </section>

      <p className="payment__notice">실제 결제는 되지 않는 연습 화면이에요</p>

      <button type="button" className="payment__primary" onClick={handlePay}>
        {priceLabel} 결제하기
      </button>
    </div>
  )
}
