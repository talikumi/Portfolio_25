
import { useRef, useState } from 'react';
import { useIsomorphicLayoutEffect, createSectionReveal } from '@/lib/gsap';
import { Instagram, Twitter, Linkedin, Feather } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const ContactSection = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message sent",
      description: "Thank you for your message. I'll get back to you soon.",
    });
    setFormData({ name: '', email: '', message: '' });
  };
  
  useIsomorphicLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    createSectionReveal(section, section.querySelectorAll('[data-reveal]'));
  }, []);

  return (
    <section ref={sectionRef} id="contact" className="pt-6 pb-12 px-6 mt-56 bg-blush-white">
      <div className="max-w-4xl mx-auto">
        <h2 data-reveal className="editorial-subtitle text-center">Get in Touch</h2>
        <h3 data-reveal className="editorial-title text-center mb-4 text-4xl md:text-5xl">Let's Create Beauty Together</h3>
        <p data-reveal className="text-center text-blush-mauve mb-12 mt-8 max-w-xl mx-auto">
          I'm always open to discussing new projects, creative ideas or opportunities to be part of your vision.
        </p>
        
        <div data-reveal>
          <div className="bg-blush-pink/15 p-8 rounded-sm shadow-sm border-[1px] border-blush-mauve/40">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-blush-mauve mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white border-[1px] border-blush-mauve/40 rounded-sm focus:outline-none focus:ring-1 focus:ring-blush-rosegold"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-blush-mauve mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white border-[1px] border-blush-mauve/40 rounded-sm focus:outline-none focus:ring-1 focus:ring-blush-rosegold"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-blush-mauve mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white border-[1px] border-blush-mauve/40 rounded-sm focus:outline-none focus:ring-1 focus:ring-blush-rosegold"
                />
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="px-8 py-3 bg-blush-rosegold text-white rounded-sm hover:bg-blush-rosegold/90 transition-colors flex items-center gap-2"
                >
                  <span>Send Message</span>
                  <Feather size={16} />
                </button>
              </div>
            </form>
          </div>
          
          {/* Social icons */}
          <div className="flex justify-center mt-12 space-x-6">
            <a href="#" className="text-blush-rosegold hover:text-blush-mauve transition-colors">
              <Instagram size={20} />
            </a>
            <a href="#" className="text-blush-rosegold hover:text-blush-mauve transition-colors">
              <Twitter size={20} />
            </a>
            <a href="#" className="text-blush-rosegold hover:text-blush-mauve transition-colors">
              <Linkedin size={20} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
