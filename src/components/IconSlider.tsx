import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';

const IconSlider = () => {
  const sliderRef = useRef<HTMLDivElement>(null);

  const icons = [
    { name: 'Apple', icon: 'fab fa-apple', color: '#000000' },
    { name: 'Google', icon: 'fab fa-google', color: '#4285F4' },
    { name: 'Facebook', icon: 'fab fa-facebook-f', color: '#1877F2' },
    { name: 'Twitter', icon: 'fab fa-twitter', color: '#1DA1F2' },
    { name: 'React', icon: 'fab fa-react', color: '#61DAFB' },
    { name: 'JavaScript', icon: 'fab fa-js-square', color: '#F7DF1E' },
    { name: 'HTML5', icon: 'fab fa-html5', color: '#E34F26' },
    { name: 'CSS3', icon: 'fab fa-css3-alt', color: '#1572B6' },
    { name: 'Node.js', icon: 'fab fa-node-js', color: '#339933' },
    { name: 'Git', icon: 'fab fa-git-alt', color: '#F05032' },
    { name: 'Figma', icon: 'fab fa-figma', color: '#F24E1E' },
    { name: 'AWS', icon: 'fab fa-aws', color: '#FF9900' },
    { name: 'Docker', icon: 'fab fa-docker', color: '#2496ED' },
    { name: 'Python', icon: 'fab fa-python', color: '#3776AB' },
    { name: 'PHP', icon: 'fab fa-php', color: '#777BB4' },
    { name: 'WordPress', icon: 'fab fa-wordpress', color: '#21759B' },
    { name: 'Shopify', icon: 'fab fa-shopify', color: '#7AB55C' },
    { name: 'Stripe', icon: 'fab fa-stripe', color: '#008CDD' },
    { name: 'GitHub', icon: 'fab fa-github', color: '#181717' },
    { name: 'npm', icon: 'fab fa-npm', color: '#CB3837' }
  ];

  useEffect(() => {
    if (!sliderRef.current) return;

    const slider = sliderRef.current;
    const track = slider.querySelector('.icon-track') as HTMLElement;

    if (!track) return;

    // Clone icons for seamless loop
    const originalIcons = track.children;
    const clonedIcons = Array.from(originalIcons).map(icon => icon.cloneNode(true));

    // Append clones to create seamless loop
    clonedIcons.forEach(icon => {
      track.appendChild(icon);
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
    <div ref={sliderRef} className="icon-slider-container overflow-hidden py-8">
      <div className="icon-track flex items-center space-x-12">
        {icons.map((iconData, index) => (
          <div
            key={index}
            className="icon-item flex flex-col items-center justify-center min-w-[80px] group"
          >
            <div className="icon-wrapper p-4 rounded-lg bg-white/80 backdrop-blur-sm shadow-sm border border-blush-mauve/20 transition-all duration-300 group-hover:scale-110 group-hover:shadow-md group-hover:bg-white/90">
              <i
                className={`${iconData.icon} text-3xl transition-all duration-300 group-hover:scale-110`}
                style={{ color: iconData.color }}
              ></i>
            </div>
            <span className="icon-name text-xs text-blush-mauve mt-2 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {iconData.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IconSlider;
