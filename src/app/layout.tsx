import './globals.css';
import { Inter } from 'next/font/google';
import { parseHeaders } from "@/lib/util";
import styles from './layout.module.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: "Suited Next.js Evaluation Project",
  description: "Suited is learning about Next.js!",
};

export default function Layout({ children, user, login }: { children: React.ReactNode, user: React.ReactNode, login: React.ReactNode }) {
  const { userToken } = parseHeaders();
  return (
    <html lang="en">
      <body className={`${inter.className} ${styles.bodyWrapper}`}>
        <div className={styles.container}>
          <div className={styles.title}>{metadata.title}</div>
          <div className={styles.main}>{children}</div>
          <div className={styles.user}>{userToken ? user : login}</div>
        </div>
      </body>
    </html>
  )
}
