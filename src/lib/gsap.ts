import { useEffect, useLayoutEffect } from 'react';
import gsapCore from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger once
if (typeof window !== 'undefined' && gsapCore.core.globals().ScrollTrigger == null) {
  gsapCore.registerPlugin(ScrollTrigger);
}

export const gsap = gsapCore;
export { ScrollTrigger };

// Use layout effect on client, effect on server
export const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export const defaultEase = 'power3.out';

export function revealFrom(
  targets: gsapCore.TweenTarget,
  options?: { y?: number; x?: number; duration?: number; delay?: number; stagger?: number | gsapCore.StaggerVars }
) {
  const { y = 24, x = 0, duration = 0.9, delay = 0, stagger = 0.08 } = options || {};
  return gsap.from(targets, {
    y,
    x,
    opacity: 0,
    duration,
    delay,
    ease: defaultEase,
    stagger,
    clearProps: 'all'
  });
}

export function createSectionReveal(
  section: Element | null,
  items: gsapCore.TweenTarget,
  opts?: { start?: string; once?: boolean }
) {
  if (!section) return;
  const { start = 'top 75%', once = true } = opts || {};
  const tl = gsap.timeline({ paused: true });
  tl.add(revealFrom(items));

  ScrollTrigger.create({
    trigger: section,
    start,
    onEnter: () => tl.play(),
    once
  });
}

// New utility for creating pinned sections with slide-up animations
export function createPinnedSection(
  trigger: Element | null,
  pinnedElement: Element | null,
  slideUpElement: Element | null,
  options?: {
    pinStart?: string;
    pinEnd?: string;
    slideStart?: string;
    slideEnd?: string;
    slideDistance?: string;
  }
) {
  if (!trigger || !pinnedElement) return;

  const {
    pinStart = 'top top',
    pinEnd = 'bottom top',
    slideStart = 'bottom bottom',
    slideEnd = 'bottom top',
    slideDistance = '100vh'
  } = options || {};

  // Pin the main section
  ScrollTrigger.create({
    trigger,
    start: pinStart,
    end: pinEnd,
    pin: true,
    pinSpacing: true,
    onUpdate: (self) => {
      const progress = self.progress;
      const title = pinnedElement.querySelector('.editorial-title');
      const subtitle = pinnedElement.querySelector('.editorial-subtitle');
      const para = pinnedElement.querySelector('p');
      
      if (title && subtitle && para) {
        gsap.to([subtitle, title, para], {
          y: progress * -20,
          opacity: 1 - (progress * 0.3),
          duration: 0.1,
          ease: 'none'
        });
      }
    }
  });

  // Slide up animation for the next section
  if (slideUpElement) {
    gsap.set(slideUpElement, { y: slideDistance });
    
    ScrollTrigger.create({
      trigger,
      start: slideStart,
      end: slideEnd,
      scrub: true,
      onUpdate: (self) => {
        const progress = self.progress;
        const distance = slideDistance.includes('vh') 
          ? parseInt(slideDistance) 
          : 100;
        gsap.to(slideUpElement, {
          y: `${distance - (progress * distance)}vh`,
          duration: 0.1,
          ease: 'none'
        });
      }
    });
  }
}

// Utility for creating slide-up animations
export function createSlideUpAnimation(
  trigger: Element | null,
  target: Element | null,
  options?: {
    start?: string;
    end?: string;
    distance?: string;
    opacity?: boolean;
  }
) {
  if (!trigger || !target) return;

  const {
    start = 'top 80%',
    end = 'top 20%',
    distance = '50vh',
    opacity = true
  } = options || {};

  gsap.set(target, { 
    y: distance,
    opacity: opacity ? 0 : 1
  });
  
  ScrollTrigger.create({
    trigger,
    start,
    end,
    scrub: true,
    onUpdate: (self) => {
      const progress = self.progress;
      const dist = distance.includes('vh') 
        ? parseInt(distance) 
        : 50;
      
      gsap.to(target, {
        y: `${dist - (progress * dist)}vh`,
        opacity: opacity ? progress : 1,
        duration: 0.1,
        ease: 'none'
      });
    }
  });
}


