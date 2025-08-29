const Footer = () => {
	return (
		<footer className="py-12 px-6 bg-blush-pink/5 border-t border-blush-mauve border-opacity-40">


  
		<div className="max-w-6xl mx-auto">
		  <div className="flex flex-col items-center text-center gap-6">
			{/* Logo centrato */}
			<a href="#" className="font-playfair text-xl font-medium text-blush-rosegold">
			  blush<span className="text-blush-mauve">.</span>
			</a>
  
			{/* Nav */}
			<nav className="flex space-x-6 order-1 md:order-none">
			  <a href="#home" className="text-sm text-blush-pink hover:text-blush-rosegold transition-colors">Home</a>
			  <a href="#about" className="text-sm text-blush-pink hover:text-blush-rosegold transition-colors">About</a>
			  <a href="#projects" className="text-sm text-blush-pink hover:text-blush-rosegold transition-colors">Projects</a>
			  <a href="#contact" className="text-sm text-blush-pink hover:text-blush-rosegold transition-colors">Contact</a>
			</nav>
  
			{/* Copyright */}
			<div className="text-sm text-blush-mauve order-2">
			  &copy; {new Date().getFullYear()} · Crafted with Love ♡
			</div>
		  </div>
		</div>
	  </footer>
	);
  };

  export default Footer;