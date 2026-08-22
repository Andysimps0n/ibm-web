export default function NotificationsList({ notifications, onBack }) {
  return (
    <section className="NotificationsList section" aria-labelledby="notice-title">
      <button type="button" className="notice-back" onClick={onBack}>
        홈으로
      </button>
      <h2 id="notice-title" className="section__title">
        알림
      </h2>
      <p className="section__subtitle">소비 리포트와 한도 알림이에요</p>

      <ul className="notice-list">
        {notifications.map((notification) => (
          <li key={notification.id} className="notice-card">
            <div className="notice-card__top">
              <p className="notice-card__title">{notification.title}</p>
              <p className="notice-card__time">{notification.timeLabel}</p>
            </div>
            <p className="notice-card__body">{notification.body}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
