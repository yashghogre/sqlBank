import Image from 'next/image'
import styles from './page.module.css'
import Navbar from './components/Navbar'
import Link from 'next/link'

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.cardsDiv}>
        <Link href={'/SendMoney'} className={styles.link}>
          <div className={styles.cardDiv}>
            <h3>Send Money</h3>
          </div>
        </Link>
        <Link href={'/ShowBalance'} className={styles.link}>
          <div className={styles.cardDiv}>
            <h3>Show Balance</h3>
          </div>
        </Link>
        <Link href={'/ShowTransaction'} className={styles.link}>
          <div className={styles.cardDiv}>
            <h3>Show Transactions</h3>
          </div>
        </Link>
        <Link href={'/DeleteAccount'} className={styles.link}>
          <div className={styles.cardDiv}>
            <h3>Delete Account</h3>
          </div>
        </Link>
      </div>
    </main>
  )
}
