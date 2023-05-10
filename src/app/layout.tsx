import './globals.css';
import { Inter } from 'next/font/google';
import styles from './layout.module.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: "Suited Next.js Evaluation Project",
  description: "Suited is learning about Next.js!",
};

export default function Layout({ children, user }: { children: React.ReactNode, user: React.ReactNode, }) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${styles.bodyWrapper}`}>
        <div className={styles.container}>
          <div className={styles.title}>{metadata.title}</div>
          <div className={styles.main}>{children}</div>
          <div className={styles.user}>{user}</div>
        </div>
      </body>
    </html>
  )
}
