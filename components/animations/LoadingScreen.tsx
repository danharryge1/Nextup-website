'use client';
import { useEffect, useRef, useState } from 'react';

export function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const hasPlayed = useRef(false);

  useEffect(() => {
    // Skip on mobile
    if (window.innerWidth < 768) {
      setVisible(false);
      return;
    }

    // Skip if already played this session
    if (sessionStorage.getItem('introPlayed')) {
      setVisible(false);
      return;
    }

    const vid = videoRef.current;
    if (!vid) {
      setVisible(false);
      return;
    }

    vid.muted = true;
    vid.defaultMuted = true;
    vid.volume = 0;

    const hideIntro = () => {
      if (hasPlayed.current) return;
      hasPlayed.current = true;
      sessionStorage.setItem('introPlayed', '1');
      setFading(true);
      setTimeout(() => setVisible(false), 500);
    };

    vid.onended = hideIntro;
    vid.onerror = () => setVisible(false);

    vid.load();
    vid.addEventListener('canplay', () => {
      vid.play().catch(() => {
        setVisible(false);
      });
    }, { once: true });

    // Safety timeout
    const timer = setTimeout(hideIntro, 5000);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 99999,
      backgroundColor: '#0A0A0F',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      opacity: fading ? 0 : 1,
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
