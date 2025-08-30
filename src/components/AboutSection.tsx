import P5Background from './p5Background';
import ScrollFloat from './ScrollFloat';
import TechnologyCarousel from './TechnologyCarousel';
import WaterEffect from './WaterEffect';
import { useRef } from 'react';
import { useIsomorphicLayoutEffect, createSectionReveal, gsap, ScrollTrigger } from '@/lib/gsap';

const AboutSection = () => {
	const sectionRef = useRef<HTMLElement | null>(null);
	const skills = [
	  'Web Design', 
	  'Frontend Development', 
	  'User Experience', 
	  'Visual Design',
	  'Creative Direction',
	  'Interaction Design',
	  'Interaction Design',
	  'Interaction Design',
	  'Interaction Design'
	];

	const deliverables = [
		'Responsive web design',
		'Design systems',
		'Creative strategy & direction',
		'Accessible UI components',
		'Brand-aligned visual storytelling',
		'Client-ready prototypes'
	  ];	  
  
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
				<section ref={sectionRef} id="about" className="relative z-30 py-20 px-6 overflow-hidden mt-[14px]">
			{/* Gradient background from blush-white to light blue */}
			<div className="absolute inset-0 bg-gradient-to-b from-blush-white via-blue-50 to-blue-200 z-0"></div>
		 <P5Background />
		 <WaterEffect />
 
		<div className="max-w-6xl mx-auto">
		  <h2 data-reveal className="editorial-subtitle text-center">About</h2>
		  
		  {/* Testo centrato */}
		  <div className="max-w-3xl text-blush-mauve mx-auto space-y-6 text-center">

			<ScrollFloat
				animationDuration={.5}
				ease='back.inOut(2)'
				scrollStart='center bottom+=50%'
				scrollEnd='bottom bottom-=40%'
				stagger={0.05}
				loopDelay={1}
				containerClassName="text-blush-mauve leading-relaxed"
				textClassName="text-4xl font-voyage"
			>
				My approach to the web is about creating spaces where people feel at ease. I focus on minimizing friction and noise while prioritizing clean, intuitive interactions. Off-screen, you’ll usually find me experimenting with messy new recipes, heating up over videogames, and fueling my competitive edge on the tennis court.
			</ScrollFloat>

			<TechnologyCarousel />

			<div data-reveal className="pt-6 border-t border-blush-rosegold/20">
			  <h5 className="font-playfair text-xl text-blush-pink mb-4">Expertise</h5>
			  <div data-skills-reveal className="flex flex-wrap justify-center gap-2 mt-8">
				{skills.map((skill, index) => (
				  <span 
					key={index} 
					className="px-3 py-1 bg-white border border-blush-gold text-sm text-blush-pink rounded-sm"
				  >
					{skill}
				  </span>
				))}
			  </div>
			  <h5 className="font-playfair text-xl text-blush-pink mt-8 mb-8 text-center">What I bring to the table</h5>

<div data-reveal className="flex justify-center">
  <ul data-deliverables-reveal className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-3 gap-x-6 text-center text-blush-pink text-sm">
    {deliverables.map((item, index) => (
      <li key={index} className="mx-auto max-w-xs">{item}</li>
    ))}
  </ul>
</div>
			</div>
		  </div>
		</div>
	  </section>
	);
  };


  
  export default AboutSection;
  