const NutshellSection = () => {
  return (
    <section className="relative z-20 pt-8 -mb-[45px] bg-transparent flex items-center justify-center">
      {/* Nutshell Section */}
      <div className="-mt-[220px] -mb-[100px]">
        {/* Circular Text Container */}
        <div className="relative w-80 h-80 flex items-center justify-center">
          {/* Circular Text - Primary Layer (Inner) */}
          <div className="absolute inset-0 flex items-center justify-center animate-spin">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 250 250">
              <defs>
                <path id="circlePath" d="M 125 125 m -62 0 a 62 62 0 1 1 124 0 a 62 62 0 1 1 -124 0" />
              </defs>
              <text className="text-base font-voyage font-medium fill-blush-rosegold/70 tracking-widest">
                <textPath href="#circlePath" startOffset="0%">
                  IN A NUTSHELL • IN A NUTSHELL • IN A NUTSHELL • IN A NUTSHELL • IN A NUTSHELL • IN A NUTSHELL • IN A NUTSHELL • IN A NUTSHELL
                </textPath>
              </text>
            </svg>
          </div>
          
          {/* Circular Text - Secondary Layer (Outer) */}
          <div className="absolute inset-0 flex items-center justify-center animate-spin-reverse">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 250 250">
              <defs>
                <path id="circlePath2" d="M 125 125 m -87 0 a 87 87 0 1 1 174 0 a 87 87 0 1 1 -174 0" />
              </defs>
              <text className="text-base font-voyage font-medium fill-blush-mauve/50 tracking-widest">
                <textPath href="#circlePath2" startOffset="0%">
                  IN A NUTSHELL • IN A NUTSHELL • IN A NUTSHELL • IN A NUTSHELL • IN A NUTSHELL • IN A NUTSHELL 
                </textPath>
              </text>
            </svg>
          </div>
        </div>
      </div>
      
      {/* Custom CSS for spinning animation */}
      <style>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes spin-reverse {
          from {
            transform: rotate(360deg);
          }
          to {
            transform: rotate(0deg);
          }
        }
        .animate-spin {
          animation: spin 30s linear infinite;
        }
        .animate-spin-reverse {
          animation: spin-reverse 30s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default NutshellSection;
