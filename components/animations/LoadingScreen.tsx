'use client';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';

// useLayoutEffect runs synchronously before the browser paints — safe on client only
// useEffect is the fallback for SSR (refs/sessionStorage aren't available server-side)
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export function LoadingScreen() {
  const [show, setShow]           = useState(true);  // Start blocking — hides website until we decide
  const [videoReady, setVideoReady] = useState(false);
  const [fading, setFading]       = useState(false);
  const videoRef  = useRef<HTMLVideoElement>(null);
  const hasPlayed = useRef(false);

  // Runs synchronously before the browser paints — removes overlay instantly for returning visitors
  useIsomorphicLayoutEffect(() => {
    if (window.innerWidth < 768 || sessionStorage.getItem('introPlayed')) {
      setShow(false);
      window.dispatchEvent(new Event('resize'));
    }
  }, []);

  useEffect(() => {
    if (!show) return;

    const vid = videoRef.current;
    if (!vid) { setShow(false); return; }

    vid.muted = true;
    vid.defaultMuted = true;
    vid.volume = 0;

    const hideIntro = () => {
      if (hasPlayed.current) return;
      hasPlayed.current = true;
      sessionStorage.setItem('introPlayed', '1');
      setFading(true);
      setTimeout(() => {
        setShow(false);
        window.dispatchEvent(new Event('resize'));
      }, 500);
    };

    vid.onended = hideIntro;
    vid.onerror = () => setShow(false);

    // Aggressively attempt to play since Safari sometimes stalls autoPlay without direct API interaction on load
    const playAttempt = () => {
      setVideoReady(true);
      vid.play().catch((err) => {
        console.warn('Video autoplay blocked or failed:', err);
        setFading(true);
        setTimeout(() => setShow(false), 500);
      });
    };

    // Sometimes canplay fires, sometimes it doesn't if cached. Just calling play() often fixes it.
    if (vid.readyState >= 2) {
      playAttempt();
    } else {
      vid.addEventListener('canplay', playAttempt, { once: true });
      vid.addEventListener('loadeddata', playAttempt, { once: true });
    }
    // Do NOT call vid.load() — preload="auto" + autoPlay handle loading.
    // Calling load() resets readyState on Safari and can break autoplay.

    const timer = setTimeout(hideIntro, 5000);
    return () => clearTimeout(timer);
  }, [show]);

  if (!show) return null;

  return (
    <div style={{
      position:        'fixed',
      inset:           0,
      zIndex:          99999,
      backgroundColor: '#0A0A0F',
      display:         'flex',
      alignItems:      'center',
      justifyContent:  'center',
      opacity:         fading ? 0 : 1,
      transition:      'opacity 0.5s ease',
      pointerEvents:   'none',
    }}>
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        preload="auto"
        style={{
          width:           '100vw',
          height:          '100vh',
          objectFit:       'cover',
          backgroundColor: '#0A0A0F',
          // removing opacity check to ensure Safari IntersectionObserver allows media to eagerly load and autoplay
        }}
      >
        <source src="/videos/intro.mp4" type="video/mp4" />
      </video>
    </div>
  );
}

export default LoadingScreen;
