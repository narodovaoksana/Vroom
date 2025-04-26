import Head from 'next/head';
import styles from '../styles/Profile.module.css';

export default function Profile() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Профіль користувача</title>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Montserrat:wght@400;700&family=Roboto+Slab:wght@400;700&display=swap" rel="stylesheet" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Профіль користувача</h1>

        <section className={styles.userInfo}>
          <div className={styles.profileSection}>
            <img src="/person.jpeg" alt="Профіль" className={styles.profileIcon} />
            <div className={styles.profileDetails}>
              <p className={styles.userName}>Прізвище Ім'я</p>
              <p className={styles.userDetail}>Дата народження: 01.01.1990</p>
              <p className={styles.userDetail}>Номер телефону: +380123456789</p>
              <p className={styles.userDetail}>Електронна пошта: email@example.com</p>
              <p className={styles.userDetail}>Рейтинг: 4.5</p>
            </div>
          </div>
        </section>

        <section className={styles.uploadSection}>
          <h2 className={styles.subtitle}>Завантажити посвідчення водія</h2>
          <input type="file" className={styles.uploadInput} />
        </section>
      </main>
    </div>
  );
}
