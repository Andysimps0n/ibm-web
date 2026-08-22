function monthKey(dateString) {
  return dateString.slice(0, 7)
}

function sumAmounts(items) {
  return items.reduce((total, item) => total + item.amount, 0)
}

export function formatWon(amount) {
  return `${amount.toLocaleString('ko-KR')}원`
}

export function getMonthSpent(transactions, yearMonth) {
  return sumAmounts(
    transactions.filter((transaction) => monthKey(transaction.date) === yearMonth),
  )
}

export function getSavingsProgress(goal) {
  const remaining = Math.max(goal.price - goal.saved, 0)
  const percent = Math.min(Math.round((goal.saved / goal.price) * 100), 100)
  const daysLeft =
    remaining === 0 ? 0 : Math.ceil(remaining / goal.dailySaving)

  return {
    remaining,
    percent,
    daysLeft,
  }
}

export function getCategoryTotals(transactions, yearMonth, categoryMeta) {
  const monthTransactions = transactions.filter(
    (transaction) => monthKey(transaction.date) === yearMonth,
  )
  const monthSpent = sumAmounts(monthTransactions)
  const totalsByCategory = {}

  for (const transaction of monthTransactions) {
    const current = totalsByCategory[transaction.category] ?? 0
    totalsByCategory[transaction.category] = current + transaction.amount
  }

  return Object.entries(totalsByCategory)
    .map(([category, amount]) => {
      const meta = categoryMeta[category] ?? { color: '#c8c8c8', emoji: '•' }

      return {
        category,
        amount,
        percent: monthSpent === 0 ? 0 : Math.round((amount / monthSpent) * 100),
        color: meta.color,
        emoji: meta.emoji,
      }
    })
    .sort((a, b) => b.amount - a.amount)
}

function sumCategory(transactions, yearMonth, category) {
  return sumAmounts(
    transactions.filter(
      (transaction) =>
        monthKey(transaction.date) === yearMonth &&
        transaction.category === category,
    ),
  )
}

export function getInsights(transactions, goal, thisMonth, lastMonth) {
  const insights = []
  const deliveryThis = sumCategory(transactions, thisMonth, '배달')
  const deliveryLast = sumCategory(transactions, lastMonth, '배달')
  const cafeThis = sumCategory(transactions, thisMonth, '카페')
  const cafeLast = sumCategory(transactions, lastMonth, '카페')
  const subscriptionThis = sumCategory(transactions, thisMonth, '구독')

  if (deliveryThis > deliveryLast) {
    const extra = deliveryThis - deliveryLast
    const daysFaster = Math.max(1, Math.floor(extra / goal.dailySaving))

    insights.push({
      id: 'delivery',
      title: '배달이 조금 늘었어요',
      body: `이번 달 배달 음식이 지난달보다 ${formatWon(extra)} 더 나갔어요. 한 끼만 직접 해먹으면 ${goal.name}까지 약 ${daysFaster}일 빨라질 수 있어요.`,
      actionLabel: '배달 내역 확인하기',
      actionCategory: '배달',
    })
  }

  if (cafeThis > cafeLast) {
    const extra = cafeThis - cafeLast
    const daysFaster = Math.max(1, Math.floor(extra / goal.dailySaving))

    insights.push({
      id: 'cafe',
      title: '카페, 줄이면 목표가 당겨져요',
      body: `이번 달 카페에서 ${formatWon(cafeThis)}을 썼어요. 일주일에 한 번만 줄여도 ${goal.name}까지 약 ${daysFaster}일 더 빨라져요.`,
      actionLabel: '카페 내역 확인하기',
      actionCategory: '카페',
    })
  }

  if (subscriptionThis > 0) {
    insights.push({
      id: 'subscription',
      title: '구독은 잘 쓰고 있나요?',
      body: `매달 ${formatWon(subscriptionThis)}이 구독으로 빠져나가요. 안 보는 서비스가 있다면 정리하는 것만으로도 저축이 쉬워져요.`,
      actionLabel: '구독 내역 확인하기',
      actionCategory: '구독',
    })
  }

  return insights.slice(0, 3)
}

export function getRecentTransactions(transactions, yearMonth) {
  return transactions
    .filter((transaction) => monthKey(transaction.date) === yearMonth)
    .slice()
    .sort((a, b) => (a.date < b.date ? 1 : -1))
}

export function formatShortDate(dateString) {
  const [, month, day] = dateString.split('-')
  return `${Number(month)}월 ${Number(day)}일`
}

export function getSpendingStats(transactions, thisMonth, lastMonth) {
  const thisMonthTransactions = transactions.filter(
    (transaction) => monthKey(transaction.date) === thisMonth,
  )
  const thisMonthSpent = sumAmounts(thisMonthTransactions)
  const lastMonthSpent = getMonthSpent(transactions, lastMonth)
  const count = thisMonthTransactions.length
  const averagePerTx = count === 0 ? 0 : Math.round(thisMonthSpent / count)

  const daysSoFar = thisMonthTransactions.reduce((maxDay, transaction) => {
    const day = Number(transaction.date.slice(8, 10))
    return day > maxDay ? day : maxDay
  }, 0)
  const averagePerDay =
    daysSoFar === 0 ? 0 : Math.round(thisMonthSpent / daysSoFar)

  const totalsByCategory = {}
  for (const transaction of thisMonthTransactions) {
    const current = totalsByCategory[transaction.category] ?? 0
    totalsByCategory[transaction.category] = current + transaction.amount
  }

  const topCategoryEntry = Object.entries(totalsByCategory).sort(
    (a, b) => b[1] - a[1],
  )[0]

  return {
    thisMonthSpent,
    lastMonthSpent,
    diff: thisMonthSpent - lastMonthSpent,
    count,
    averagePerTx,
    averagePerDay,
    topCategory: topCategoryEntry ? topCategoryEntry[0] : null,
    topCategoryAmount: topCategoryEntry ? topCategoryEntry[1] : 0,
  }
}
