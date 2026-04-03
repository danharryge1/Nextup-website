import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import PageTransition from '@/components/animations/PageTransition'
import LoadingScreen from '@/components/animations/LoadingScreen'
import AuroraAnimation from '@/components/animations/AuroraAnimation'
import { COMPANY_NAME } from '@/lib/constants'

export const metadata: Metadata = {
  title: {
    default: `${COMPANY_NAME} | Consultancy Built For What's Next`,
    template: `%s | ${COMPANY_NAME}`,
  },
  description:
    'Young consultancy. Modern tools. Real results. We help small businesses get clear on where to go and move there faster.',
  keywords: ['consultancy', 'business strategy', 'AI', 'automation', 'Liverpool', 'Next Up Co'],
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    siteName: COMPANY_NAME,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://api.fontshare.com/v2/css?f[]=clash-display@200,300,400,500,600,700&display=swap" />
        <link rel="stylesheet" href="https://api.fontshare.com/v2/css?f[]=satoshi@300,400,500,700&display=swap" />
      </head>
      <body>
        <LoadingScreen />
        <AuroraAnimation />
        <div className="flex flex-col min-h-screen relative z-10">
          <Navbar />
          <main className="flex-1">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
