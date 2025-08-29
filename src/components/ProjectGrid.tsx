import { useRef, useMemo } from 'react';
import { gsap, useIsomorphicLayoutEffect } from '@/lib/gsap';

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
    title: 'Serene Spa Retreat',
    year: 'Spring 2022',
    description: 'A luxurious interface for a high-end wellness brand.',
    imageUrl: 'https://images.unsplash.com/photo-1649972904349',
    tags: ['Design', 'React'],
    githubUrl: '#',
  },
  {
    id: 2,
    title: 'Editorial Magazine',
    year: 'Summer 2023',
    description: 'Modern take on classic magazine layouts.',
    imageUrl: 'https://images.unsplash.com/photo-1581091226825',
    tags: ['Layout', 'UI'],
    githubUrl: '#',
  },
  {
    id: 3,
    title: 'Blush Boutique',
    year: 'Autumn 2023',
    description: 'Sophisticated shopping experience with warm editorial vibes.',
    imageUrl: 'https://images.unsplash.com/photo-1721322800607',
    tags: ['E‑commerce', 'UX'],
    githubUrl: '#',
  },
  {
    id: 4,
    title: 'Studio Portfolio',
    year: 'Winter 2024',
    description: 'Minimal portfolio with immersive interactions.',
    imageUrl: 'https://images.unsplash.com/photo-1545235617-9465d2a55698',
    tags: ['Animation', 'GSAP'],
    githubUrl: '#',
  },
  {
    id: 5,
    title: 'Rose Gold Dashboard',
    year: 'Spring 2024',
    description: 'Elegant analytics with blush accents and smooth micro‑interactions.',
    imageUrl: 'https://images.unsplash.com/photo-1496302662116-85c1954ba9a6',
    tags: ['Dashboard', 'TypeScript'],
    githubUrl: '#',
  },
  {
    id: 6,
    title: 'Atelier Lookbook',
    year: 'Summer 2024',
    description: 'Editorial lookbook layout with soft motion and typography focus.',
    imageUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9',
    tags: ['Editorial', 'Animation'],
    githubUrl: '#',
  },
  {
    id: 7,
    title: 'Wellness Journal',
    year: 'Autumn 2024',
    description: 'Calm journaling app with tactile interactions and serene visuals.',
    imageUrl: 'https://images.unsplash.com/photo-1526318472351-c75fcf070305',
    tags: ['Product', 'UX'],
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
          pin: false, // Don't pin here since it's handled by the stacking effect
        }
      });

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
                <div className="group relative w-full h-auto aspect-square bg-white border border-blush-gold/25 rounded-sm shadow-sm hover:border-blush-gold/50 transition-colors overflow-hidden">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blush-mauve/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <span className="absolute top-3 left-3 text-xs text-white/90 bg-blush-mauve/60 backdrop-blur px-2 py-1 rounded-full">
                    {project.year}
                  </span>

                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h4 className="font-playfair text-blush-white text-lg mb-1 drop-shadow">{project.title}</h4>
                    <p className="text-xs text-white/90 mb-2 drop-shadow">
                      {project.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-2">
                        {project.tags?.slice(0, 2).map((tag) => (
                          <span key={tag} className="text-[10px] text-blush-pink bg-blush-pink/20 border border-blush-gold/40 px-2 py-0.5 rounded-sm">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <a href={project.githubUrl || '#'} className="text-xs text-blush-gold hover:text-blush-white transition-colors">
                        View →
                      </a>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      
      {/* Spacer to ensure contact section is visible - increased height */}
      <div className="h-screen bg-blush-white"></div>
    </>
  );
};

export default ProjectGrid;