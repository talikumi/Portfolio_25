import { useRef, useMemo } from 'react';
import { gsap, useIsomorphicLayoutEffect } from '@/lib/gsap';
import flowerSvg from '/src/images/flower.svg';

interface Project {
  id: number;
  title: string;
  year: string;
  description: string;
  imageUrl: string;
  tags?: string[];
  githubUrl?: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: 'Project 1',
    year: 'Spring 2025',
    description: 'Description 1',
    imageUrl: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=2020&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    tags: ['Design', 'React'],
    githubUrl: '#',
  },
  {
    id: 2,
    title: 'Project 2',
    year: 'Summer 2023',
    description: 'Description 2',
    imageUrl: 'https://plus.unsplash.com/premium_photo-1661963874418-df1110ee39c1?q=80&w=1986&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    tags: ['Layout', 'UI'],
    githubUrl: '#',
  },
  {
    id: 3,
    title: 'Project 3',
    year: 'Autumn 2023',
    description: 'Description 3',
    imageUrl: 'https://plus.unsplash.com/premium_photo-1661963212517-830bbb7d76fc?q=80&w=1986&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    tags: ['E‑commerce', 'UX'],
    githubUrl: '#',
  },
  {
    id: 4,
    title: 'Project 4',
    year: 'Winter 2024',
    description: 'Description 4',
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    tags: ['Animation', 'GSAP'],
    githubUrl: '#',
  },
  {
    id: 5,
    title: 'Project 5',
    year: 'Spring 2024',
    description: 'Description 5',
    imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    tags: ['Dashboard', 'TypeScript'],
    githubUrl: '#',
  },
  {
    id: 6,
    title: 'Project 6',
    year: 'Summer 2024',
    description: 'Description 6',
    imageUrl: 'https://plus.unsplash.com/premium_photo-1683121696175-d05600fefb85?q=80&w=2532&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    tags: ['Editorial', 'Animation'],
    githubUrl: '#',
  },
];

const ProjectGrid = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  const panels = useMemo(() => projects, []);

  useIsomorphicLayoutEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const ctx = gsap.context(() => {
      // Horizontal scroll animation for the track within the pinned section
      gsap.to(track, {
        x: () => -(track.scrollWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${track.scrollWidth - window.innerWidth + 100}`,
          scrub: 1,
          pin: false, 
        }
      });

      // Flower rotation animation synced with horizontal scroll
      const flower = document.querySelector('[data-flower]');
      if (flower) {
        gsap.to(flower, {
          rotation: 360,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${track.scrollWidth - window.innerWidth + 100}`,
            scrub: 1,
          }
        });
      }

      // Clock hands rotation animation 
      const hourHand = document.querySelector('[data-hour-hand]');
      const minuteHand = document.querySelector('[data-minute-hand]');
      
      if (hourHand) {
        gsap.to(hourHand, {
          rotation: -90, 
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${track.scrollWidth - window.innerWidth + 100}`,
            scrub: 1,
          }
        });
      }
      
      if (minuteHand) {
        gsap.to(minuteHand, {
          rotation: -180, 
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${track.scrollWidth - window.innerWidth + 100}`,
            scrub: 1,
          }
        });
      }

      // Simple fade-in animation for cards
      const cards = gsap.utils.toArray<HTMLElement>('[data-card]');
      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 16 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
            delay: 0.2
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <section ref={sectionRef} id="projects" className="relative px-6 pt-20 pb-8 bg-blush-white">
        <div className="max-w-6xl mx-auto text-center mb-24">
          <h2 className="editorial-subtitle">Selected Works</h2>
          <h3 className="editorial-title text-4xl md:text-5xl">Back In Time</h3>
        </div>

        {/* Horizontal scroller track */}
        <div className="relative h-[65vh] overflow-hidden">
          <div
            ref={trackRef}
            className="absolute top-0 left-0 h-full flex items-center gap-6 will-change-transform"
            style={{ width: `max-content` }}
          >
            {panels.map((project) => (
              <article
                key={project.id}
                data-card
                className="flex-shrink-0 h-full w-[60vw] sm:w-[44vw] md:w-[34vw] lg:w-[26vw] xl:w-[22vw]"
              >
                <div className="group relative w-full h-auto aspect-square bg-white border border-blush-gold/50 rounded-sm shadow-sm transition-colors overflow-hidden">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blush-mauve/80 via-transparent to-transparent opacity-100 transition-opacity duration-500" />
                  <span className="absolute top-3 left-3 text-xs text-white/90 bg-blush-mauve/60 backdrop-blur px-2 py-1 rounded-full">
                    {project.year}
                  </span>

                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h4 className="font-gravita text-blush-white text-lg mb-1">{project.title}</h4>
                    <p className="text-xs text-white/90 mb-2 drop-shadow font-gravita">
                      {project.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-2">
                        {project.tags?.slice(0, 2).map((tag) => (
                          <span key={tag} className="text-[10px] text-blush-white bg-blush-pink/20 border border-blush-white/40 px-2 py-0.5 rounded-sm font-gravita">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <a href={project.githubUrl || '#'} className="text-xs text-blush-white font-gravita">
                        View →
                      </a>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
        
        {/* Rotating Flower decoration */}

        <div className="flex justify-center py-8 relative z-50 -mt-40">
          <div className="relative">
            <img src={flowerSvg} alt="Flower decoration" className="w-24 h-24 opacity-90" data-flower />
      
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="absolute w-0.5 h-6 bg-rose-900/80 transform -translate-y-3 origin-bottom" style={{transform: 'translateY(-12px) rotate(45deg)'}} data-hour-hand></div>
              <div className="absolute w-0.5 h-8 bg-rose-900/80 transform -translate-y-4 origin-bottom" style={{transform: 'translateY(-16px) rotate(90deg)'}} data-minute-hand></div>
              <div className="absolute w-1.5 h-1.5 bg-rose-900/80 rounded-full"></div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Spacer */}
      <div className="h-[600px] bg-blush-white"></div>
    </>
  );
};

export default ProjectGrid;