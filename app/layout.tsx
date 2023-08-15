
import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import './global.css'
import './content-styles.css'
const montserrat = Montserrat({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'CampConnection',
  description: 'The place to be',

}
export default function RootLayout({ children }: any) {
  return (
    <html lang="en">
      <meta httpEquiv="Permissions-Policy" content="interest-cohort=()" />
      <body className={montserrat.className}>
        {children}
      </body>
    </html>
  )
}
