import { useState } from 'react'
import { formatWon } from '../utils/money.js'

const SHOP_TABS = [
  { id: 'ranking', label: '랭킹' },
  { id: 'new', label: '신상품' },
  { id: 'sale', label: '세일' },
  { id: 'special', label: '스페셜' },
]

const PAGE_SIZE = 6

const SECTION_TITLES = {
  ranking: '판매 랭킹',
  new: '신상품',
  sale: '세일',
  special: '스페셜',
}

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

function ProductCard({ product, isSelected, onSelect }) {
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
      {product.originalPrice > product.price ? (
        <p className="product-card__original">{formatWon(product.originalPrice)}</p>
      ) : null}
      <p className="product-card__price">{formatWon(product.price)}</p>
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
  onSelectProduct,
  onGoHome,
}) {
  const [shopTab, setShopTab] = useState('ranking')
  const [page, setPage] = useState(0)

  const filtered = products.filter((product) => product.tabs.includes(shopTab))
  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const safePage = Math.min(page, pageCount - 1)
  const pageItems = filtered.slice(
    safePage * PAGE_SIZE,
    safePage * PAGE_SIZE + PAGE_SIZE,
  )
  const startRank = pageItems[0]?.rank ?? 1
  const endRank = pageItems[pageItems.length - 1]?.rank ?? startRank

  function handleTabChange(tabId) {
    setShopTab(tabId)
    setPage(0)
  }

  return (
    <div className="shop">
      <header className="shop__header">
        <h1 className="shop__title">위시 스토어</h1>
        <button type="button" className="shop__shortcut" onClick={onGoHome}>
          바로가기
        </button>
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

      <div className="shop__toolbar">
        <p className="shop__section-title">{SECTION_TITLES[shopTab]}</p>
        <div className="shop__pager">
          <button
            type="button"
            aria-label="이전"
            disabled={safePage === 0}
            onClick={() => setPage(safePage - 1)}
          >
            &lt;
          </button>
          <span>
            {startRank}~{endRank}등
          </span>
          <button
            type="button"
            aria-label="다음"
            disabled={safePage >= pageCount - 1}
            onClick={() => setPage(safePage + 1)}
          >
            &gt;
          </button>
        </div>
      </div>

      <p className="shop__hint">물건을 누르면 저축 목표가 바뀌어요</p>

      <div className="shop__grid">
        {pageItems.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            isSelected={product.shortName === selectedProductName}
            onSelect={onSelectProduct}
          />
        ))}
      </div>
    </div>
  )
}
