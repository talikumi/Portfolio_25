
import { useEffect, useRef } from 'react';

class Petal {
  private x: number;
  private y: number;
  private w: number;
  private h: number;
  private opacity: number;
  private flip: number;
  private ySpeed: number;
  private flipSpeed: number;
  private canvas: HTMLCanvasElement;
  private petalImg: HTMLImageElement;

  constructor(canvas: HTMLCanvasElement, petalImg: HTMLImageElement) {
    this.canvas = canvas;
    this.petalImg = petalImg;
    this.x = Math.random() * canvas.width;
    this.y = (Math.random() * canvas.height * 2) - canvas.height;
    this.w = 25 + Math.random() * 15;
    this.h = 20 + Math.random() * 10;
    this.opacity = this.w / 40;
    this.flip = Math.random();
    this.ySpeed = 0.5 + Math.random() * 0.5; // Reduced speed
    this.flipSpeed = Math.random() * 0.02;
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (this.y > this.canvas.height) {
      this.x = Math.random() * this.canvas.width; // Reset to random horizontal position
      this.y = -this.petalImg.height;
      this.ySpeed = 0.5 + Math.random() * 0.5;
      this.flip = Math.random();
    }
    
    this.y += this.ySpeed;
    this.flip += this.flipSpeed;

    ctx.globalAlpha = this.opacity;
    ctx.drawImage(
      this.petalImg,
      this.x,
      this.y,
      this.w * (0.6 + (Math.abs(Math.cos(this.flip)) / 3)),
      this.h * (0.8 + (Math.abs(Math.sin(this.flip)) / 5))
    );
  }
}

const CanvasPetals = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const TOTAL = 30; // Reduced number of petals
    const petalArray: Petal[] = [];
    let animationFrameId: number;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      petalArray.forEach(petal => petal.draw(ctx));
      animationFrameId = window.requestAnimationFrame(render);
    };

    // Initial canvas setup
    handleResize();

    // Load petal image
    const petalImg = new Image();
    petalImg.src = 'https://djjjk9bjm164h.cloudfront.net/petal.png';
    petalImg.onload = () => {
      // Create petals once image is loaded
      for (let i = 0; i < TOTAL; i++) {
        petalArray.push(new Petal(canvas, petalImg));
      }
      render();
    };

    // Event listener
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />;
};

export default CanvasPetals;
