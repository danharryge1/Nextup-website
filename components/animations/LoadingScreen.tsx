'use client';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export function LoadingScreen() {
  const [show, setShow]     = useState(true);
  const [fading, setFading] = useState(false);
  const videoRef  = useRef<HTMLVideoElement>(null);
  const hasPlayed = useRef(false);

  // Instantly remove overlay for returning visitors (before paint)
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

    // Ensure muted state is set via JS (Safari requires this for autoplay policy)
    vid.muted = true;
    vid.defaultMuted = true;
    vid.volume = 0;
    // Remove any controls Safari might add
    vid.controls = false;

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
    vid.onerror = () => { setShow(false); window.dispatchEvent(new Event('resize')); };

    // Single play function with retry — no autoPlay attribute, only programmatic play()
    // This avoids Safari's race between HTML autoplay and JS play() that causes failures
    let playing = false;
    const attemptPlay = () => {
      if (playing || hasPlayed.current) return;
      playing = true;
      vid.play().then(() => {
        // Success — video is playing
      }).catch(() => {
        playing = false;
        // Retry once after a short delay — Safari sometimes needs a moment
        setTimeout(() => {
          if (playing || hasPlayed.current) return;
          playing = true;
          vid.play().catch(() => {
            // Truly blocked — skip intro entirely
            setShow(false);
            window.dispatchEvent(new Event('resize'));
          });
        }, 150);
      });
    };

    if (vid.readyState >= 2) {
      attemptPlay();
    } else {
      vid.addEventListener('canplay', attemptPlay, { once: true });
      vid.addEventListener('loadeddata', attemptPlay, { once: true });
      // Force load if nothing happens (Safari can stall without this on cold cache)
      setTimeout(() => {
        if (!playing && !hasPlayed.current && vid.readyState < 2) {
          vid.load();
        }
      }, 500);
    }

    // Safety net — skip intro if nothing works within 5s
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
      {/* No autoPlay attribute — programmatic play() only to avoid Safari race condition */}
      <video
        ref={videoRef}
        muted
        playsInline
        preload="auto"
        style={{
          width:           '100vw',
          height:          '100vh',
          objectFit:       'cover',
          backgroundColor: '#0A0A0F',
        }}
      >
        <source src="/videos/intro.mp4" type="video/mp4" />
      </video>
    </div>
  );
}

export default LoadingScreen;
