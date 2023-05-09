import './globals.css'
import { Inter } from 'next/font/google'
import styles from './layout.module.css';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: "Suited Next.js Evaluation Project",
  description: "Suited is learning about Next.js!",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${styles.container}`}>{children}</body>
    </html>
  )
}
