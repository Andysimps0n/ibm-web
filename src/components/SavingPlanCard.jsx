import { useEffect, useState } from 'react'
import { SAVING_PERIODS } from '../utils/money.js'

export default function SavingPlanCard({
  savingPeriod,
  customPeriodDays,
  dailySavingAmount,
  onChangeSavingPeriod,
  onChangeCustomPeriodDays,
  onChangeDailySaving,
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [draftAmount, setDraftAmount] = useState(String(dailySavingAmount))
  const [draftCustomDays, setDraftCustomDays] = useState(String(customPeriodDays))

  useEffect(() => {
    setDraftAmount(String(dailySavingAmount))
  }, [dailySavingAmount])

  useEffect(() => {
    setDraftCustomDays(String(customPeriodDays))
  }, [customPeriodDays])

  const selectedPeriod =
    SAVING_PERIODS.find((period) => period.id === savingPeriod) ??
    SAVING_PERIODS[0]

  const triggerLabel =
    savingPeriod === 'custom' ? `${customPeriodDays}일` : selectedPeriod.label

  function closeMenu() {
    setIsMenuOpen(false)
  }

  function toggleMenu() {
    setIsMenuOpen((currentlyOpen) => !currentlyOpen)
  }

  function handleChoosePeriod(periodId) {
    onChangeSavingPeriod(periodId)

    if (periodId !== 'custom') {
      closeMenu()
    }
  }

  function handleAmountChange(event) {
    const digitsOnly = event.target.value.replace(/[^0-9]/g, '')
    setDraftAmount(digitsOnly)
  }

  function commitAmount() {
    const amount = Number(draftAmount)

    if (!Number.isFinite(amount) || amount < 1) {
      setDraftAmount(String(dailySavingAmount))
      return
    }

    onChangeDailySaving(amount)
  }

  function handleAmountKeyDown(event) {
    if (event.key === 'Enter') {
      event.preventDefault()
      event.currentTarget.blur()
    }
  }

  function handleCustomDaysChange(event) {
    const digitsOnly = event.target.value.replace(/[^0-9]/g, '')
    setDraftCustomDays(digitsOnly)
  }

  function commitCustomDays() {
    const days = Number(draftCustomDays)

    if (!Number.isFinite(days) || days < 1) {
      setDraftCustomDays(String(customPeriodDays))
      return
    }

    onChangeCustomPeriodDays(days)
    closeMenu()
  }

  function handleCustomDaysKeyDown(event) {
    if (event.key === 'Enter') {
      event.preventDefault()
      event.currentTarget.blur()
    }
  }

  const amountDisplay =
    draftAmount === '' ? '' : Number(draftAmount).toLocaleString('ko-KR')

  return (
    <section
      className={
        isMenuOpen ? 'SavingPlanCard saving-plan is-open' : 'SavingPlanCard saving-plan'
      }
      aria-labelledby="saving-plan-title"
    >
      <p id="saving-plan-title" className="saving-plan__eyebrow">
        저축 계획
      </p>
      <p className="saving-plan__sentence">
        <span className="saving-plan__blank">
          <button
            type="button"
            className="saving-plan__trigger"
            aria-haspopup="listbox"
            aria-expanded={isMenuOpen}
            aria-label="저축 주기"
            onClick={toggleMenu}
          >
            {triggerLabel}
            <span className="saving-plan__caret" aria-hidden="true">
              ▾
            </span>
          </button>
          {isMenuOpen ? (
            <>
              <button
                type="button"
                className="saving-plan__backdrop"
                aria-label="닫기"
                onClick={closeMenu}
              />
              <ul className="saving-plan__menu" role="listbox" aria-label="저축 주기">
                {SAVING_PERIODS.map((period) => {
                  const isSelected = period.id === selectedPeriod.id

                  return (
                    <li key={period.id}>
                      <button
                        type="button"
                        role="option"
                        aria-selected={isSelected}
                        className={
                          isSelected
                            ? 'saving-plan__option is-selected'
                            : 'saving-plan__option'
                        }
                        onClick={() => handleChoosePeriod(period.id)}
                      >
                        {period.label}
                      </button>
                    </li>
                  )
                })}
              </ul>
            </>
          ) : null}
        </span>
        마다{' '}
        <span className="saving-plan__blank">
          <input
            className="saving-plan__amount"
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            aria-label="저축 금액"
            value={amountDisplay}
            size={Math.max(amountDisplay.length, 1)}
            onChange={handleAmountChange}
            onBlur={commitAmount}
            onKeyDown={handleAmountKeyDown}
          />
        </span>
        원을 저축하기
      </p>
    </section>
  )
}
