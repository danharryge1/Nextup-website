'use client';
import { useEffect, useRef, useState } from 'react';

export function LoadingScreen() {
  // Start invisible — only becomes visible once we confirm it should play
  const [opacity, setOpacity] = useState(0);
  const [mounted, setMounted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const hasPlayed = useRef(false);

  useEffect(() => {
    // Skip on mobile — remove from DOM cleanly
    if (window.innerWidth < 768) { setMounted(false); return; }
    // Skip if already played this session — remove from DOM cleanly
    if (sessionStorage.getItem('introPlayed')) { setMounted(false); return; }

    const vid = videoRef.current;
    if (!vid) { setMounted(false); return; }

    vid.muted = true;
    vid.defaultMuted = true;
    vid.volume = 0;

    const hideIntro = () => {
      if (hasPlayed.current) return;
      hasPlayed.current = true;
      sessionStorage.setItem('introPlayed', '1');
      setOpacity(0);
      setTimeout(() => setMounted(false), 500);
    };

    vid.onended = hideIntro;
    vid.onerror = () => setMounted(false);

    vid.load();
    vid.addEventListener('canplay', () => {
      setOpacity(1); // Only become visible when video is actually ready
      vid.play().catch(() => setMounted(false));
    }, { once: true });

    const timer = setTimeout(hideIntro, 5000);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 99999,
      backgroundColor: '#0A0A0F',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      opacity,
      transition: 'opacity 0.5s ease',
      pointerEvents: 'none',
    }}>
      <video
        ref={videoRef}
        muted
        playsInline
        preload="auto"
        style={{
          width: '100vw',
          height: '100vh',
          objectFit: 'cover',
          backgroundColor: '#0A0A0F',
        }}
      >
        <source src="/videos/intro.mp4" type='video/mp4; codecs="avc1.42E01E"' />
      </video>
    </div>
  );
}

export default LoadingScreen;
