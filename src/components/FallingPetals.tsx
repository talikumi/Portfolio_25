
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const FallingPetals = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const numberOfPetals = 15;
    const petals: HTMLDivElement[] = [];

    // Create petals
    for (let i = 0; i < numberOfPetals; i++) {
      const petal = document.createElement('div');
      petal.className = 'absolute w-4 h-4 rotate-45 bg-[#FFDEE2] opacity-70';
      container.appendChild(petal);
      petals.push(petal);

      gsap.set(petal, {
        x: Math.random() * window.innerWidth,
        y: -20,
        rotation: Math.random() * 360
      });

      // Animation
      gsap.to(petal, {
        y: window.innerHeight + 20,
        x: `+=${Math.random() * 200 - 100}`,
        rotation: `+=${Math.random() * 360}`,
        duration: 4 + Math.random() * 4,
        ease: 'none',
        repeat: -1,
        delay: Math.random() * 4
      });
    }

    return () => {
      petals.forEach(petal => petal.remove());
    };
  }, []);

  return <div ref={containerRef} className="absolute inset-0 pointer-events-none overflow-hidden" />;
};

export default FallingPetals;
