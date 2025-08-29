import Butterflies from './Butterflies';
import LogoSlider from './LogoSlider';
import { useRef } from 'react';
import { gsap, useIsomorphicLayoutEffect, revealFrom } from '@/lib/gsap';

const Hero = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const subtitleRef = useRef<HTMLHeadingElement | null>(null);
  const paraRef = useRef<HTMLParagraphElement | null>(null);
  const linesRef = useRef<HTMLDivElement | null>(null);

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Initial reveal animation
      revealFrom([subtitleRef.current, titleRef.current, paraRef.current], { y: 28, stagger: 0.18, duration: 1.25 });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // Gentle parallax on vertical grid lines while scrolling past Hero
  useIsomorphicLayoutEffect(() => {
    const section = sectionRef.current;
    const container = linesRef.current;
    if (!section || !container) return;

    const lines = Array.from(container.querySelectorAll('[data-line]')) as HTMLElement[];
    if (lines.length === 0) return;

    const ctx = gsap.context(() => {
      const mid = (lines.length - 1) / 2;
      lines.forEach((line, index) => {
        const offset = (index - mid) * 4; // subtle spread
        gsap.to(line, {
          yPercent: offset,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          }
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="home" className="min-h-screen relative flex flex-col justify-center items-center px-6 pt-20 pb-12 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-blush-gradient opacity-80"></div>
      
      {/* Add CanvasPetals component */}
      {/*<CanvasPetals />*/}
      
	  <div ref={linesRef} className="absolute inset-0 z-0 pointer-events-none flex justify-between">
  		{[...Array(7)].map((_, i) => (<div key={i} data-line className="w-px bg-[#C59364] opacity-40"></div>))}
	  </div>


      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <div className="relative inline-block">
          <h2 ref={subtitleRef} className="editorial-subtitle mb-4 opacity-75">
            Portfolio — 2025
          </h2>
          <div className="absolute -top-24 left-1/2 -translate-x-1/2">
            <Butterflies />
          </div>
        </div>
        <h1 ref={titleRef} className="editorial-title mb-6">
			Hello, I'm <span>Nina </span>  <br />and welcome to my  <br />digital garden
        </h1>
		
        <p ref={paraRef} className="max-w-xl mx-auto text-blush-pink mt-8 leading-relaxed">

  Front-end developer based in 
  <span className="relative mx-1 after:content-[''] after:absolute after:left-0 after:right-0 after:h-[1.5px] after:bg-blush-pink after:top-1/2 after:translate-y-[0.8px]">
    Rome
  </span> →
  <span className="relative mx-1 after:content-[''] after:absolute after:left-0 after:right-0 after:h-[1.5px] after:bg-blush-pink after:top-1/2 after:translate-y-[0.8px]">
    Pisa
  </span> →
  <span className="relative mx-1 after:content-[''] after:absolute after:left-0 after:right-0 after:h-[1.5px] after:bg-blush-pink after:top-1/2 after:translate-y-[0.8px]">
    Florence
  </span> →
  Västeras?
  <br />
  Sometimes I enjoy exploring back-end projects too.
</p>


		{/*}
		<div className="mt-10 w-[220px] h-auto flex justify-center animate-fade-in" style={{ animationDelay: '0.9s' }}>
			<img src="images/swing2.png" alt="" />

		</div>{*/}
		
        {/* Technology Logo Slider */}
        <div className="mt-16">
          <LogoSlider />
        </div>
     
        {/*}
        <div className="section-divider mt-20">
          <span className="section-divider-icon">
		  <img src="/images/keyhole.png" alt="Divider Icon" className="w-6 h-6 object-contain" />
          </span>
        </div>
		{*/}

      </div>
    </section>
  );
};

export default Hero;
