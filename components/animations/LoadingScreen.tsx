'use client';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';

// useLayoutEffect runs synchronously before the browser paints — safe on client only
// useEffect is a no-op fallback for SSR (this component is loaded with ssr:false anyway)
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
      setTimeout(() => setShow(false), 500);
    };

    vid.onended = hideIntro;
    vid.onerror = () => setShow(false);

    // Attach listener before any play attempt so we never miss a fast cache-hit
    vid.addEventListener('canplay', () => {
      setVideoReady(true);
      vid.play().catch(() => {
        // play() rejected (e.g. Safari autoplay policy) — fade out gracefully
        setFading(true);
        setTimeout(() => setShow(false), 500);
      });
    }, { once: true });

    if (vid.readyState >= 3) {
      // Already ready (browser cached) — fire manually instead of waiting for canplay
      setVideoReady(true);
      vid.play().catch(() => {
        setFading(true);
        setTimeout(() => setShow(false), 500);
      });
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
          opacity:         videoReady ? 1 : 0,
          transition:      'opacity 0.3s ease',
        }}
      >
        <source src="/videos/intro.mp4" type="video/mp4" />
      </video>
    </div>
  );
}

export default LoadingScreen;
