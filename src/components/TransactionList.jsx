import { Fragment, useState } from 'react'

function groupTransactionsByDay(transactions) {
  const groups = []

  for (const transaction of transactions) {
    const lastGroup = groups[groups.length - 1]

    if (lastGroup && lastGroup.date === transaction.date) {
      lastGroup.items.push(transaction)
    } else {
      groups.push({
        date: transaction.date,
        dateLabel: transaction.dateLabel,
        items: [transaction],
      })
    }
  }

  return groups
}

export default function TransactionList({
  transactions,
  categories,
  initialCategories = [],
}) {
  const [selectedCategories, setSelectedCategories] = useState(initialCategories)

  function handleToggleCategory(categoryName) {
    setSelectedCategories((current) => {
      const isAlreadySelected = current.includes(categoryName)

      if (isAlreadySelected) {
        return current.filter((name) => name !== categoryName)
      }

      return [...current, categoryName]
    })
  }

  const visibleTransactions =
    selectedCategories.length === 0
      ? transactions
      : transactions.filter((transaction) =>
          selectedCategories.includes(transaction.category),
        )

  return (
    <section className="TransactionList section" id="transactions" aria-labelledby="tx-title">
      <h2 id="tx-title" className="section__title">
        최근 내역
      </h2>

      <div className="tx-chips" role="group" aria-label="카테고리 필터">
        {categories.map((category) => {
          const isSelected = selectedCategories.includes(category.name)

          return (
            <button
              key={category.name}
              type="button"
              className={isSelected ? 'tx-chip is-selected' : 'tx-chip'}
              aria-pressed={isSelected}
              onClick={() => handleToggleCategory(category.name)}
            >
              <span aria-hidden="true">{category.emoji}</span>
              {category.name}
            </button>
          )
        })}
      </div>


      {visibleTransactions.length === 0 ? (
        <p className="tx-empty">선택한 카테고리의 내역이 없어요</p>
      ) : (
        <ul className="tx-list">
          {groupTransactionsByDay(visibleTransactions).map((group) => (
            <Fragment key={group.date}>
              <li className="tx-day">
                <span className="tx-day__label">{group.dateLabel}</span>
              </li>
              {group.items.map((transaction) => (
                <li key={transaction.id} className="tx-row">
                  <div className="tx-row__icon" aria-hidden="true">
                    {transaction.emoji}
                  </div>
                  <div className="tx-row__info">
                    <p className="tx-row__merchant">{transaction.merchant}</p>
                    <p className="tx-row__meta">{transaction.category}</p>
                  </div>
                  <p className="tx-row__amount">-{transaction.amountLabel}</p>
                </li>
              ))}
            </Fragment>
          ))}
        </ul>
      )}
    </section>
  )
}
