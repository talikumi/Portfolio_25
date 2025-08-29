import { useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faReact, 
  faJs, 
  faHtml5, 
  faCss3Alt, 
  faNodeJs, 
  faGitAlt, 
  faFigma,
  faAws,
  faDocker,
  faPython,
  faPhp,
  faWordpress,
  faShopify,
  faStripe,
  faMongodb,
  faPostgresql,
  faFirebase,
  faVercel,
  faNetlify,
  faGithub
} from '@fortawesome/free-brands-svg-icons';
import { gsap } from '@/lib/gsap';

const LogoSlider = () => {
  const sliderRef = useRef<HTMLDivElement>(null);

  const logos = [
    { icon: faReact, name: 'React', color: '#61DAFB' },
    { icon: faJs, name: 'JavaScript', color: '#F7DF1E' },
    { icon: faHtml5, name: 'HTML5', color: '#E34F26' },
    { icon: faCss3Alt, name: 'CSS3', color: '#1572B6' },
    { icon: faNodeJs, name: 'Node.js', color: '#339933' },
    { icon: faGitAlt, name: 'Git', color: '#F05032' },
    { icon: faFigma, name: 'Figma', color: '#F24E1E' },
    { icon: faAws, name: 'AWS', color: '#FF9900' },
    { icon: faDocker, name: 'Docker', color: '#2496ED' },
    { icon: faPython, name: 'Python', color: '#3776AB' },
    { icon: faPhp, name: 'PHP', color: '#777BB4' },
    { icon: faWordpress, name: 'WordPress', color: '#21759B' },
    { icon: faShopify, name: 'Shopify', color: '#7AB55C' },
    { icon: faStripe, name: 'Stripe', color: '#008CDD' },
    { icon: faMongodb, name: 'MongoDB', color: '#47A248' },
    { icon: faPostgresql, name: 'PostgreSQL', color: '#336791' },
    { icon: faFirebase, name: 'Firebase', color: '#FFCA28' },
    { icon: faVercel, name: 'Vercel', color: '#000000' },
    { icon: faNetlify, name: 'Netlify', color: '#00C7B7' },
    { icon: faGithub, name: 'GitHub', color: '#181717' }
  ];

  useEffect(() => {
    if (!sliderRef.current) return;

    const slider = sliderRef.current;
    const track = slider.querySelector('.logo-track') as HTMLElement;
    
    if (!track) return;

    // Clone logos for seamless loop
    const originalLogos = track.children;
    const clonedLogos = Array.from(originalLogos).map(logo => logo.cloneNode(true));
    
    // Append clones to create seamless loop
    clonedLogos.forEach(logo => {
      track.appendChild(logo);
    });

    // Create infinite scroll animation
    const animation = gsap.to(track, {
      x: `-${track.scrollWidth / 2}px`,
      duration: 30,
      ease: 'none',
      repeat: -1
    });

    // Pause on hover
    const handleMouseEnter = () => animation.pause();
    const handleMouseLeave = () => animation.resume();

    slider.addEventListener('mouseenter', handleMouseEnter);
    slider.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      animation.kill();
      slider.removeEventListener('mouseenter', handleMouseEnter);
      slider.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div ref={sliderRef} className="logo-slider-container overflow-hidden py-8">
      <div className="logo-track flex items-center space-x-12">
        {logos.map((logo, index) => (
          <div
            key={index}
            className="logo-item flex flex-col items-center justify-center min-w-[80px] group"
          >
            <div className="logo-icon-wrapper p-4 rounded-lg bg-white/80 backdrop-blur-sm shadow-sm border border-blush-mauve/20 transition-all duration-300 group-hover:scale-110 group-hover:shadow-md group-hover:bg-white/90">
              <FontAwesomeIcon
                icon={logo.icon}
                className="text-3xl transition-all duration-300 group-hover:scale-110"
                style={{ color: logo.color }}
              />
            </div>
            <span className="logo-name text-xs text-blush-mauve mt-2 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {logo.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LogoSlider;
