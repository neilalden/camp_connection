
import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import './global.css'
const montserrat = Montserrat({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'CampConnection',
  description: 'The place to be',
}
export default function RootLayout({ children }: any) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        {children}
      </body>
    </html>
  )
}
