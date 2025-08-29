import { useEffect, useMemo, useRef } from 'react';
import { gsap } from 'gsap';

import './ScrollFloat.css';

const ScrollFloat = ({
  children,
  containerClassName = "",
  textClassName = "",
  animationDuration = .5,
  ease = 'back.inOut(2)',
  scrollStart='center bottom+=50%',
  scrollEnd='bottom bottom-=40%',
  stagger = 0.05,
  loopDelay = 1
}) => {
  const containerRef = useRef(null);

  const splitText = useMemo(() => {
    const text = typeof children === 'string' ? children : '';
    return text.split(" ").map((word, index) => (
      <span className="word" key={index}>
        {word}
        {index < text.split(" ").length - 1 && "\u00A0"} {/* Add space between words */}
      </span>
    ));
  }, [children]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const wordElements = el.querySelectorAll('.word');

    // Create timeline
    const tl = gsap.timeline();

    // First: Make text appear all at once with simple fade-in
    tl.fromTo(
      wordElements,
      {
        opacity: 0
      },
      {
        opacity: 1,
        duration: 1.2,
        ease: 'power2.out'
      }
    );

    // Then: Create smooth, continuous floating animation
    gsap.to(wordElements, {
      yPercent: -10,
      duration: 2,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true
    });

  }, [animationDuration, ease, stagger,  scrollStart, scrollEnd, loopDelay]);

  return (
    <div ref={containerRef} className={`scroll-float ${containerClassName}`}>
      <span className={`scroll-float-text ${textClassName}`}>
        {splitText}
      </span>
    </div>
  );
};

export default ScrollFloat;
