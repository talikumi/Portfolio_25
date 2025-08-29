import { useState, useRef } from 'react';
import { gsap, useIsomorphicLayoutEffect, ScrollTrigger } from '@/lib/gsap';

const Navbar = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement | null>(null);
  const logoRef = useRef<HTMLDivElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const hamburgerRef = useRef<HTMLButtonElement | null>(null);
  const sections = ['home', 'about', 'projects', 'contact'];

  // Use ScrollTrigger for better detection with pinned sections
  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      sections.forEach((sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
          ScrollTrigger.create({
            trigger: element,
            start: 'top center',
            end: 'bottom center',
            onEnter: () => setActiveSection(sectionId),
            onEnterBack: () => setActiveSection(sectionId),
          });
        }
      });
    });

    return () => ctx.revert();
  }, []);
  
  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(logoRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out'
      });
      gsap.to(navRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'power3.out',
        delay: 0.1
      });
    });
    return () => ctx.revert();
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Logo */}
      <div ref={logoRef} className="fixed top-5 left-[10.5rem] z-50 opacity-0 translate-y-2">
        <a href="#" className="font-playfair text-2xl font-medium text-blush-rosegold">
          blush<span className="text-blush-mauve">.</span>
        </a>
      </div>

      {/* Hamburger Menu Button */}
      <nav ref={navRef} className="fixed top-5 right-5 z-50 opacity-0 translate-y-2">
        <button
          ref={hamburgerRef}
          onClick={toggleMenu}
          className="relative w-8 h-8 flex flex-col justify-center items-center group"
          aria-label="Toggle menu"
        >
          {/* Hamburger Lines */}
          <span 
            className={`block w-6 h-0.5 bg-blush-gold transition-all duration-300 ${
              isMenuOpen ? 'rotate-45 translate-y-1' : '-translate-y-1'
            }`}
          />
          <span 
            className={`block w-6 h-0.5 bg-blush-gold transition-all duration-300 ${
              isMenuOpen ? 'opacity-0' : 'opacity-100'
            }`}
          />
          <span 
            className={`block w-6 h-0.5 bg-blush-gold transition-all duration-300 ${
              isMenuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-1'
            }`}
          />
        </button>
      </nav>

      {/* Overlay Menu */}
      <div 
        ref={menuRef}
        className={`fixed inset-0 bg-blush-white/95 backdrop-blur-sm z-40 transition-opacity duration-500 ${
          isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeMenu}
      >
        <div className="flex flex-col items-center justify-center h-full space-y-8">
          {sections.map((id) => (
            <div key={id} className="relative">
              <a
                href={`#${id}`}
                onClick={closeMenu}
                className={`text-2xl font-playfair transition-colors duration-300 ${
                  activeSection === id 
                    ? 'text-blush-rosegold' 
                    : 'text-blush-gold hover:text-blush-rosegold'
                }`}
              >
                {id.charAt(0).toUpperCase() + id.slice(1)}
              </a>
              {/* Active indicator */}
              {activeSection === id && (
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blush-rosegold rounded-full" />
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Navbar;
