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
        {/* CSS-only intro overlay — rendered server-side so it appears before any JS.
            The CSS animation in globals.css starts instantly on first paint.
            The inline script only handles the sessionStorage skip + DOM cleanup after
            the animation finishes; it does NOT drive the animation itself. */}
        <div id="intro-overlay" aria-hidden="true">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img id="intro-overlay-logo" src="/images/Logo.svg" alt="" />
        </div>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{
  var el=document.getElementById('intro-overlay');
  if(sessionStorage.getItem('intro-seen')==='1'){
    if(el)el.style.display='none';
    return;
  }
  sessionStorage.setItem('intro-seen','1');
  // Remove overlay from DOM after CSS animation completes (1.3s delay + 0.4s fade = 1.75s)
  setTimeout(function(){
    if(el&&el.parentNode)el.parentNode.removeChild(el);
    window.dispatchEvent(new Event('loading-done'));
  },1800);
}catch(e){}})()`,
          }}
        />
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
