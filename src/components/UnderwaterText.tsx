import { useRef, useEffect, useState } from 'react';
import { gsap } from '@/lib/gsap';

interface UnderwaterTextProps {
  text: string;
}

export default function UnderwaterText({ text }: UnderwaterTextProps) {
  const textRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    const text = textRef.current;
    if (!container || !text) return;

    // Create underwater distortion effect
    const createUnderwaterEffect = () => {
      const time = Date.now() * 0.001;
      
     
      
      // Add wave animation with multiple sine waves for more realistic effect
      const wave1 = Math.sin(time * 2) * scrollProgress * 5;
      const wave2 = Math.sin(time * 1.5 + 1) * scrollProgress * -5;
      const wave3 = Math.sin(time * 3 + 2) * scrollProgress * 4;
      
      text.style.transform = `
        translateY(${wave1 + wave2 + wave3}px)
      `;
    };

    // Scroll handler with throttling
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const rect = container.getBoundingClientRect();
          const progress = Math.max(0, Math.min(1, 
            (window.innerHeight - rect.top) / (rect.height + window.innerHeight)
          ));
          setScrollProgress(progress);
          ticking = false;
        });
        ticking = true;
      }
    };

    // Animation loop for continuous underwater effect
    const animate = () => {
      createUnderwaterEffect();
      requestAnimationFrame(animate);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call
    animate(); // Start animation loop

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrollProgress]);

  return (
    <div ref={containerRef} className="relative w-full">
      
      {/* Floating bubbles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-blue-300 rounded-full opacity-70"
            style={{
              width: `${2 + Math.random() * 4}px`,
              height: `${2 + Math.random() * 4}px`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${4 + Math.random() * 3}s`,
              animation: `float ${4 + Math.random() * 3}s infinite linear`,
            }}
          />
        ))}
      </div>

      {/* Main text */}
      <div 
        ref={textRef}
        className="relative z-10 text-blush-mauve leading-relaxed text-center px-4 py-6"
        style={{
          textShadow: `0 0 ${scrollProgress * 10}px rgba(0, 150, 255, ${scrollProgress * 0.5})`,
        }}
      >
        {text}
      </div>

      {/* CSS for floating animation */}
      <style>{`
        @keyframes float {
          0% {
            transform: translateY(100vh) scale(0);
            opacity: 0;
          }
          10% {
            opacity: 0.6;
          }
          90% {
            opacity: 0.6;
          }
          100% {
            transform: translateY(-100px) scale(1);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
