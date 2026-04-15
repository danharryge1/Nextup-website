'use client';
import { useEffect, useLayoutEffect, useRef, useState, useCallback } from 'react';

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export function LoadingScreen() {
  const [show, setShow]     = useState(true);
  const [fading, setFading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const hasEnded     = useRef(false);

  // Instantly remove overlay for returning visitors (before paint)
  useIsomorphicLayoutEffect(() => {
    if (window.innerWidth < 768 || sessionStorage.getItem('introPlayed')) {
      setShow(false);
      window.dispatchEvent(new Event('resize'));
    }
  }, []);

  const hideIntro = useCallback(() => {
    if (hasEnded.current) return;
    hasEnded.current = true;
    sessionStorage.setItem('introPlayed', '1');
    setFading(true);
    setTimeout(() => {
      setShow(false);
      window.dispatchEvent(new Event('resize'));
    }, 500);
  }, []);

  useEffect(() => {
    if (!show) return;
    const container = containerRef.current;
    if (!container) { setShow(false); return; }

    // Create the video element entirely via DOM — bypasses React hydration timing
    // which is the root cause of Safari rejecting play() on page load
    const vid = document.createElement('video');
    vid.muted = true;
    vid.defaultMuted = true;
    vid.playsInline = true;
    vid.preload = 'auto';
    vid.controls = false;
    vid.volume = 0;
    // Safari needs this attribute set directly
    vid.setAttribute('playsinline', '');
    vid.setAttribute('webkit-playsinline', '');

    Object.assign(vid.style, {
      width: '100vw',
      height: '100vh',
      objectFit: 'cover',
      backgroundColor: '#0A0A0F',
    });

    vid.src = '/videos/intro.mp4';
    container.appendChild(vid);

    vid.onended = hideIntro;
    vid.onerror = () => { setShow(false); window.dispatchEvent(new Event('resize')); };

    // Play as soon as we can — no race with React hydration since we made the element ourselves
    const tryPlay = () => {
      if (hasEnded.current) return;
      vid.play().catch(() => {
        // Safari rejected — skip intro cleanly (poster background is already showing)
        hideIntro();
      });
    };

    if (vid.readyState >= 2) {
      tryPlay();
    } else {
      vid.addEventListener('canplay', tryPlay, { once: true });
      vid.addEventListener('loadeddata', tryPlay, { once: true });
    }

    // Safety net — skip after 5s no matter what
    const timer = setTimeout(hideIntro, 5000);

    return () => {
      clearTimeout(timer);
      vid.onended = null;
      vid.onerror = null;
      vid.pause();
      vid.removeAttribute('src');
      vid.remove();
    };
  }, [show, hideIntro]);

  if (!show) return null;

  return (
    <div
      ref={containerRef}
      style={{
        position:        'fixed',
        inset:           0,
        zIndex:          99999,
        // Poster image as background — visible immediately, no flash even if video never plays
        backgroundColor: '#0A0A0F',
        backgroundImage: 'url(/videos/intro-poster.jpg)',
        backgroundSize:  'cover',
        backgroundPosition: 'center',
        display:         'flex',
        alignItems:      'center',
        justifyContent:  'center',
        opacity:         fading ? 0 : 1,
        transition:      'opacity 0.5s ease',
        pointerEvents:   'none',
      }}
    />
  );
}

export default LoadingScreen;
