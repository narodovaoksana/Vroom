import Head from 'next/head';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Vroom</title>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Montserrat:wght@400;700&family=Roboto+Slab:wght@400;700&display=swap" rel="stylesheet" />
      </Head>

      <aside className={styles.sidebar}>
  <nav className={styles.nav}>
    <a href="#" className={styles.navLink}>Карта</a>
    <a href="/tripHistory" className={styles.navLink}>Історія поїздок</a>
    <a href="#" className={styles.navLink}>Платіжна система</a>
    <a href="#" className={styles.navLink}>Підтримка</a>
    <a href="/signup" className={styles.navLink}>Реєстрація</a>
    <a href="/profile" className={styles.navLink}>Профіль</a>
  </nav>
</aside>

      <main className={styles.main}>
  <img src="/vroomy.png" alt="Vroom Logo" className={styles.logo} />
  



        <div className={styles.searchPanel}>
          <input type="text" placeholder="Введіть адресу або місце" className={styles.searchInput} />
          <button className={styles.searchButton}>Пошук</button>
        </div>

        <button className={styles.quickBookingButton}>Швидке бронювання</button>

        <div className={styles.userInfo}>
          <img src="/profile_icon.png" alt="Профіль" className={styles.profileIcon} />
          <div>
            <p className={styles.userName}>Ім'я користувача</p>
            <p className={styles.userStatus}>Статус: Активна поїздка</p>
          </div>
        </div>

        <div className={styles.notifications}>
          <p className={styles.warning}>Попередження: Закінчення оренди через 10 хвилин</p>
          <p className={styles.success}>Успіх: Бронювання підтверджено</p>
        </div>

        <div className={styles.support}>
          <button className={styles.supportButton}>Чат з підтримкою</button>
          <button className={styles.feedbackButton}>Надіслати відгук</button>
        </div>
      </main>
    </div>
  );
}