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


