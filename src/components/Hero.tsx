import Butterflies from './Butterflies';
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



  return (
    <section ref={sectionRef} id="home" className="min-h-screen relative flex flex-col justify-center items-center px-6 pt-20 pb-12 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-blush-gradient opacity-80"></div>

      
	  <div ref={linesRef} className="absolute inset-0 z-0 pointer-events-none flex justify-between">
  		{[...Array(7)].map((_, i) => (<div key={i} data-line className="w-px h-full bg-[#C59364] opacity-40"></div>))}
	  </div>


      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto text-center mt-24">
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
        
        {/* Horizontal line divider with "in a nutshell" text */}
        <div className="flex items-center justify-center mt-14">
          <div className="flex-1 h-px bg-blush-rosegold max-w-[200px]"></div>
          <span className="px-4 text-lg font-voyage text-blush-rosegold/80 tracking-wider mb-2">in a nutshell</span>
          <div className="flex-1 h-px bg-blush-rosegold max-w-[200px]"></div>
        </div>
		
        <p ref={paraRef} className="max-w-xl mx-auto text-blush-pink mt-4 leading-relaxed font-gravita font-light">

  Front-end developer based in 
  <span className="relative mx-1 after:content-[''] after:absolute after:left-0 after:right-0 after:h-[1.5px] after:bg-blush-pink after:top-1/2">
    Rome
  </span> →
  <span className="relative mx-1 after:content-[''] after:absolute after:left-0 after:right-0 after:h-[1.5px] after:bg-blush-pink after:top-1/2">
    Pisa
  </span> →
  <span className="relative mx-1 after:content-[''] after:absolute after:left-0 after:right-0 after:h-[1.5px] after:bg-blush-pink after:top-1/2">
    Florence
  </span> →
  <span className="relative mx-1 after:content-[''] after:absolute after:left-0 after:right-0 after:bg-blush-pink">
    Västerås
  </span>?
  <br />
  Currently experimenting with back-end projects in my spare time.
</p>

        {/* Animated double arrow */}
        <div className="mt-12 flex justify-center">
          <div className="animate-bounce text-xl" style={{color: '#b76e79', opacity: 0.8}}>
		  <i className="fa-solid fa-angle-down"></i>
          </div>
        </div>


		{/*}
		<div className="mt-10 w-[220px] h-auto flex justify-center animate-fade-in" style={{ animationDelay: '0.9s' }}>
			<img src="images/swing2.png" alt="" />

		</div>{*/}
		
     
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
