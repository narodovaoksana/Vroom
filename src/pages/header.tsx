import Link from 'next/link';
import styles from '../styles/Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <img src="/logo.svg" alt="Vroom Logo" className={styles.logo} />
      <div className={styles.headerButtons}>
        <Link href="/signup">
          <a className={styles.headerButton}>Реєстрація</a>
        </Link>
        <Link href="/login">
          <a className={styles.headerButton}>Вхід</a>
        </Link>
      </div>
    </header>
  );
}