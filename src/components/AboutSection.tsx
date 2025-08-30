import P5Background from './p5Background';
import ScrollFloat from './ScrollFloat';
import TechnologyCarousel from './TechnologyCarousel';
import WaterEffect from './WaterEffect';
import { useRef } from 'react';
import { useIsomorphicLayoutEffect, createSectionReveal, gsap, ScrollTrigger } from '@/lib/gsap';

const AboutSection = () => {
	const sectionRef = useRef<HTMLElement | null>(null);	  
  
	useIsomorphicLayoutEffect(() => {
		const section = sectionRef.current;
		if (!section) return;
		
		// Create main section reveal
		createSectionReveal(section, section.querySelectorAll('[data-reveal]'));
		
		// Create skills reveal animation
		const skillsContainer = section.querySelector('[data-skills-reveal]');
		if (skillsContainer) {
			const skillsItems = skillsContainer.querySelectorAll('span');
			const skillsTl = gsap.timeline({ paused: true });
			
			skillsTl.from(skillsItems, {
				y: 20,
				opacity: 0,
				scale: 0.8,
				duration: 0.6,
				stagger: 0.1,
				ease: 'back.out(1.7)'
			});
			
			ScrollTrigger.create({
				trigger: skillsContainer,
				start: 'top 85%',
				onEnter: () => skillsTl.play(),
				once: true
			});
		}
		
		// Create deliverables reveal animation
		const deliverablesContainer = section.querySelector('[data-deliverables-reveal]');
		if (deliverablesContainer) {
			const deliverablesItems = deliverablesContainer.querySelectorAll('li');
			const deliverablesTl = gsap.timeline({ paused: true });
			
			deliverablesTl.from(deliverablesItems, {
				x: -30,
				opacity: 0,
				duration: 0.7,
				stagger: 0.15,
				ease: 'power2.out'
			});
			
			ScrollTrigger.create({
				trigger: deliverablesContainer,
				start: 'top 85%',
				onEnter: () => deliverablesTl.play(),
				once: true
			});
		}
	}, []);

	return (
				<section ref={sectionRef} id="about" className="relative z-30 h-[840px] px-6 overflow-hidden mt-[14px] flex items-center">
		 <P5Background />
		 <WaterEffect />
	  </section>
	);
  };


  
  export default AboutSection;
  