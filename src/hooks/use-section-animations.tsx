import { useIsomorphicLayoutEffect } from '@/lib/gsap';
import { gsap, ScrollTrigger } from '@/lib/gsap';

export const useSectionAnimations = () => {
  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Hero section initial reveal animation (without fade)
      const heroSection = document.querySelector('#home');
      if (heroSection) {
        const title = heroSection.querySelector('.editorial-title');
        const subtitle = heroSection.querySelector('.editorial-subtitle');
        const para = heroSection.querySelector('p');
        
        if (title && subtitle && para) {
          gsap.from([subtitle, title, para], {
            y: 28,
            duration: 1.25,
            stagger: 0.18,
            ease: 'power3.out'
          });
        }
      }

      // Set proper z-index and positioning for stacking order
      const aboutSection = document.querySelector('#about');
      const projectsSection = document.querySelector('#projects');
      const contactSection = document.querySelector('#contact');

      if (aboutSection) gsap.set(aboutSection, { zIndex: 10, position: 'relative' });
      if (projectsSection) gsap.set(projectsSection, { zIndex: 20, position: 'relative' });
      if (contactSection) gsap.set(contactSection, { zIndex: 30, position: 'relative' });

      // --- STACK EFFECT ---
      // Pin Hero, About, and Projects with no spacing
      const stackSections = gsap.utils.toArray(['#home', '#about', '#projects']) as Element[];
      
      stackSections.forEach((section) => {
        ScrollTrigger.create({
          trigger: section,
          start: "top top",
          pin: true,
          pinSpacing: false
        });
      });

      // Pin Contact section with spacing so Footer can appear
      if (contactSection) {
        ScrollTrigger.create({
          trigger: contactSection,
          start: "top top",
          pin: true,
          pinSpacing: true // This allows space for the Footer
        });
      }

      ScrollTrigger.refresh();
    });

    return () => ctx.revert();
  }, []);
};
