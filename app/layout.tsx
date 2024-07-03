import './globals.css'

import type { Metadata } from 'next'
import { Bebas_Neue } from 'next/font/google'

const bebasNeue = Bebas_Neue({
  subsets: ['latin'],
  weight: '400',
  display: 'swap'
})

export const metadata: Metadata = {
  title: {
    default: 'Cartacho | Home',
    template: 'Cartacho | %s'
  },
  description: 'Conheça a melhor barbearia de Curitiba!',
  icons: {
    icon: '/logo.png'
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${bebasNeue.className}`}>{children}</body>
    </html>
  )
}
