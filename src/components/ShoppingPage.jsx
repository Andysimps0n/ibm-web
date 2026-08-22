import { useState } from 'react'
import {
  formatSavingDays,
  getDailySavingRate,
  getDaysToAfford,
} from '../utils/money.js'
import SavingPlanCard from './SavingPlanCard.jsx'

const SHOP_TABS = [
  { id: 'ranking', label: '랭킹' },
  { id: 'new', label: '신상품' },
  { id: 'sale', label: '세일' },
  { id: 'special', label: '스페셜' },
]

function RankChange({ value }) {
  if (!value) {
    return null
  }

  const isUp = value > 0

  return (
    <span className={isUp ? 'product-card__change is-up' : 'product-card__change is-down'}>
      {isUp ? '▲' : '▼'}
      {Math.abs(value)}
    </span>
  )
}

function ProductCard({ product, isSelected, daysLabel, originalDaysLabel, onSelect }) {
  return (
    <button
      type="button"
      className={isSelected ? 'product-card is-selected' : 'product-card'}
      onClick={() => onSelect(product)}
    >
      <span className="product-card__rank">{product.rank}</span>
      <img
        className="product-card__image"
        src={product.imageSrc}
        alt={product.name}
      />
      <div className="product-card__brand-row">
        <span className="product-card__brand">{product.brand}</span>
        <RankChange value={product.rankChange} />
      </div>
      <p className="product-card__name">{product.name}</p>
      {originalDaysLabel ? (
        <p className="product-card__original">{originalDaysLabel}</p>
      ) : null}
      <p className="product-card__price">{daysLabel}</p>
      {product.colors.length > 0 ? (
        <span className="product-card__colors">
          {product.colors.map((color) => (
            <span
              key={color}
              className="product-card__swatch"
              style={{ background: color }}
            />
          ))}
        </span>
      ) : null}
    </button>
  )
}

export default function ShoppingPage({
  products,
  selectedProductName,
  savingPeriod,
  customPeriodDays,
  dailySavingAmount,
  onChangeSavingPeriod,
  onChangeCustomPeriodDays,
  onChangeDailySaving,
  onSelectProduct,
  onGoHome,
}) {
  const [shopTab, setShopTab] = useState('ranking')

  const filtered = products.filter((product) => product.tabs.includes(shopTab))
  const dailyRate = getDailySavingRate({
    dailySaving: dailySavingAmount,
    savingPeriod,
    customPeriodDays,
  })

  function handleTabChange(tabId) {
    setShopTab(tabId)
  }

  return (
    <section className="ShoppingPage shop">
      <header className="shop__header">
        <h1 className="shop__title">위시 스토어</h1>
        <p className="shop__hint">물건을 누르면 저축 목표가 바뀌어요</p>
      </header>

      <div className="shop__tabs" role="tablist">
        {SHOP_TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={shopTab === tab.id}
            className={shopTab === tab.id ? 'shop__tab is-active' : 'shop__tab'}
            onClick={() => handleTabChange(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <SavingPlanCard
        savingPeriod={savingPeriod}
        customPeriodDays={customPeriodDays}
        dailySavingAmount={dailySavingAmount}
        onChangeSavingPeriod={onChangeSavingPeriod}
        onChangeCustomPeriodDays={onChangeCustomPeriodDays}
        onChangeDailySaving={onChangeDailySaving}
      />


      <div className="shop__grid">
        {filtered.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            isSelected={product.shortName === selectedProductName}
            daysLabel={formatSavingDays(getDaysToAfford(product.price, dailyRate))}
            originalDaysLabel={
              product.originalPrice > product.price
                ? formatSavingDays(getDaysToAfford(product.originalPrice, dailyRate))
                : null
            }
            onSelect={onSelectProduct}
          />
        ))}
      </div>
    </section>
  )
}
