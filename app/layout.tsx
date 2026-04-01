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
        {/* Preload intro video so it plays immediately on first visit */}
        <link rel="preload" as="video" href="/videos/intro-final.mp4" type="video/mp4" />
      </head>
      <body>
        {/* Synchronous inline script — runs before first paint, before React hydrates.
            Creates the video overlay immediately so there is zero delay on any OS/browser.
            Handles the entire intro lifecycle (play → fade → dismiss → sessionStorage → event)
            without depending on React at all. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{
  if(sessionStorage.getItem('intro-seen')==='1')return;
  if(window.innerWidth<768)return;
  var dismissed=false;
  function dismiss(){
    if(dismissed)return;dismissed=true;
    var b=document.getElementById('intro-blocker');
    if(b){
      b.style.transition='opacity 0.7s ease';
      b.style.opacity='0';
      setTimeout(function(){
        if(b&&b.parentNode)b.parentNode.removeChild(b);
        try{sessionStorage.setItem('intro-seen','1');}catch(e){}
        window.dispatchEvent(new Event('loading-done'));
      },700);
    }
  }
  var d=document.createElement('div');
  d.id='intro-blocker';
  d.style.cssText='position:fixed;inset:0;background:#000;z-index:9999;display:flex;align-items:center;justify-content:center';
  var v=document.createElement('video');
  v.id='intro-video';
  v.muted=true;v.autoplay=true;v.setAttribute('muted','');v.setAttribute('playsinline','');
  v.preload='auto';
  v.style.cssText='max-width:100%;max-height:100%;object-fit:contain';
  var s=document.createElement('source');s.src='/videos/intro-final.mp4';s.type='video/mp4';
  v.appendChild(s);
  v.onended=dismiss;v.onerror=dismiss;
  d.appendChild(v);
  document.body.appendChild(d);
  setTimeout(dismiss,14000);
  v.play().catch(function(){dismiss();});
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
