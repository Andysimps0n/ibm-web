import { useEffect, useRef, useState } from 'react'
import DashboardHeader from './components/DashboardHeader.jsx'
import SpendingCard from './components/SpendingCard.jsx'
import SavingPlanCard from './components/SavingPlanCard.jsx'
import SavingsGoalCard from './components/SavingsGoalCard.jsx'
import CategoryBreakdown from './components/CategoryBreakdown.jsx'
import InsightsList from './components/InsightsList.jsx'
import TransactionList from './components/TransactionList.jsx'
import SpendingStats from './components/SpendingStats.jsx'
import NotificationsList from './components/NotificationsList.jsx'
import ShoppingPage from './components/ShoppingPage.jsx'
import PaymentPage from './components/PaymentPage.jsx'
import BottomNav from './components/BottomNav.jsx'
import { user, savingsGoal, transactions, categoryMeta, shopProducts, demoNotifications } from './data/seedData.js'
import {
  formatWon,
  getMonthSpent,
  getSavingsProgress,
  getCategoryTotals,
  getInsights,
  getRecentTransactions,
  getSpendingStats,
  formatShortDate,
} from './utils/money.js'
import './App.css'

const THIS_MONTH = '2026-08'
const LAST_MONTH = '2026-07'

const CATEGORY_CHIPS = Object.entries(categoryMeta).map(([name, meta]) => ({
  name,
  emoji: meta.emoji,
}))

function App() {
  const [activeTab, setActiveTab] = useState('home')
  const [goal, setGoal] = useState(savingsGoal)
  const [spendingFilter, setSpendingFilter] = useState(null)
  const [theme, setTheme] = useState('green')
  const [unreadCount, setUnreadCount] = useState(demoNotifications.length)
  const contentRef = useRef(null)

  const monthSpent = getMonthSpent(transactions, THIS_MONTH)
  const savings = getSavingsProgress(goal)
  const categories = getCategoryTotals(transactions, THIS_MONTH, categoryMeta)
  const insights = getInsights(
    transactions,
    goal,
    THIS_MONTH,
    LAST_MONTH,
  )
  const recentTransactions = getRecentTransactions(transactions, THIS_MONTH)
  const spendingStats = getSpendingStats(transactions, THIS_MONTH, LAST_MONTH)

  useEffect(() => {
    contentRef.current?.scrollTo({ top: 0 })
  }, [activeTab])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  function openNotifications() {
    setUnreadCount(0)
    setActiveTab('notifications')
  }

  function openSpending(category = null) {
    setSpendingFilter(category)
    setActiveTab('spending')
  }

  function handleChangeTab(tab) {
    if (tab === 'spending') {
      setSpendingFilter(null)
    }
    setActiveTab(tab)
  }

  function handleSelectProduct(product) {
    setGoal({
      ...goal,
      name: product.shortName,
      imageSrc: product.imageSrc,
      imageAlt: product.shortName,
      price: product.price,
    })
    setActiveTab('home')
  }

  function handleBuyGoal() {
    setActiveTab('payment')
  }

  function handleChangeDailySaving(amount) {
    setGoal({
      ...goal,
      dailySaving: amount,
    })
  }

  function handleChangeSavingPeriod(periodId) {
    setGoal({
      ...goal,
      savingPeriod: periodId,
    })
  }

  function handleChangeCustomPeriodDays(days) {
    setGoal({
      ...goal,
      customPeriodDays: days,
    })
  }

  function handleConfirmPayment() {
    const leftover = Math.max(goal.saved - goal.price, 0)

    setGoal({
      ...goal,
      saved: leftover,
    })
  }

  const comparisonLabel =
    spendingStats.diff > 0
      ? `지난달보다 ${formatWon(spendingStats.diff)} 더 썼어요`
      : spendingStats.diff < 0
        ? `지난달보다 ${formatWon(Math.abs(spendingStats.diff))} 덜 썼어요`
        : '지난달과 비슷하게 썼어요'

  return (
    <div className="page">
      <div className="phone">
        <div
          className={
            activeTab === 'payment'
              ? 'phone__content phone__content--flush'
              : 'phone__content'
          }
          ref={contentRef}
        >
          {activeTab === 'home' ? (
            <>
              <DashboardHeader
                name={user.name}
                accountLabel={user.accountLabel}
                avatarSrc="/avatar.png"
                theme={theme}
                onChangeTheme={setTheme}
                unreadCount={unreadCount}
                onOpenNotifications={openNotifications}
              />

              <SavingPlanCard
                savingPeriod={goal.savingPeriod}
                customPeriodDays={goal.customPeriodDays}
                dailySavingAmount={goal.dailySaving}
                onChangeSavingPeriod={handleChangeSavingPeriod}
                onChangeCustomPeriodDays={handleChangeCustomPeriodDays}
                onChangeDailySaving={handleChangeDailySaving}
              />
              <SavingsGoalCard
                name={goal.name}
                imageSrc={goal.imageSrc}
                imageAlt={goal.imageAlt}
                price={formatWon(goal.price)}
                saved={formatWon(goal.saved)}
                remaining={formatWon(savings.remaining)}
                dailySaving={formatWon(goal.dailySaving)}
                dailySavingAmount={goal.dailySaving}
                percent={savings.percent}
                daysLeft={savings.daysLeft}
                onBuy={handleBuyGoal}
                onChangeDailySaving={handleChangeDailySaving}
              />


              <SpendingCard
                remainingBalance={formatWon(user.remainingBalance)}
                monthSpent={formatWon(monthSpent)}
                onOpenSpending={() => openSpending()}
                onOpenHabits={() => setActiveTab('habits')}
              />



      
            </>
          ) : null}

          {activeTab === 'notifications' ? (
            <div className="screen">
              <NotificationsList
                notifications={demoNotifications}
                onBack={() => setActiveTab('home')}
              />
            </div>
          ) : null}

          {activeTab === 'habits' ? (
            <div className="screen">
              <CategoryBreakdown
                categories={categories.map((item) => ({
                  ...item,
                  amountLabel: formatWon(item.amount),
                }))}
              />
            </div>
          ) : null}

          {activeTab === 'insights' ? (
            <div className="screen">
              <InsightsList
                insights={insights}
                goalName={goal.name}
                daysLeft={savings.daysLeft}
                onOpenCategory={openSpending}
                onSeeGoal={() => setActiveTab('home')}
              />
            </div>
          ) : null}

          {activeTab === 'spending' ? (
            <div className="screen">
              <SpendingStats
                thisMonthSpent={formatWon(spendingStats.thisMonthSpent)}
                comparisonLabel={comparisonLabel}
                count={spendingStats.count}
                averagePerTx={formatWon(spendingStats.averagePerTx)}
                averagePerDay={formatWon(spendingStats.averagePerDay)}
                topCategory={spendingStats.topCategory}
                topCategoryAmount={formatWon(spendingStats.topCategoryAmount)}
                topCategoryEmoji={
                  categoryMeta[spendingStats.topCategory]?.emoji ?? '•'
                }
              />
              <TransactionList
                key={spendingFilter ?? 'all'}
                initialCategories={spendingFilter ? [spendingFilter] : []}
                categories={CATEGORY_CHIPS}
                transactions={recentTransactions.map((transaction) => ({
                  ...transaction,
                  emoji: categoryMeta[transaction.category]?.emoji ?? '•',
                  amountLabel: formatWon(transaction.amount),
                  dateLabel: formatShortDate(transaction.date),
                }))}
              />
            </div>
          ) : null}

          {activeTab === 'shop' ? (
            <ShoppingPage
              products={shopProducts}
              selectedProductName={goal.name}
              savingPeriod={goal.savingPeriod}
              customPeriodDays={goal.customPeriodDays}
              dailySavingAmount={goal.dailySaving}
              onChangeSavingPeriod={handleChangeSavingPeriod}
              onChangeCustomPeriodDays={handleChangeCustomPeriodDays}
              onChangeDailySaving={handleChangeDailySaving}
              onSelectProduct={handleSelectProduct}
              onGoHome={() => setActiveTab('home')}
            />
          ) : null}

          {activeTab === 'payment' ? (
            <PaymentPage
              name={goal.name}
              imageSrc={goal.imageSrc}
              imageAlt={goal.imageAlt}
              priceLabel={formatWon(goal.price)}
              savedLabel={formatWon(goal.saved)}
              leftoverLabel={formatWon(Math.max(goal.saved - goal.price, 0))}
              accountLabel={user.accountLabel}
              onCancel={() => setActiveTab('home')}
              onConfirmPay={handleConfirmPayment}
              onGoHome={() => setActiveTab('home')}
              onPickNextGoal={() => setActiveTab('shop')}
            />
          ) : null}
        </div>

        {activeTab === 'payment' ? null : (
          <BottomNav activeTab={activeTab} onChange={handleChangeTab} />
        )}
      </div>
    </div>
  )
}

export default App
