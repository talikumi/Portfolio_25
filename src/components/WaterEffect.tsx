import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import {
  simulationVertexShader,
  simulationFragmentShader,
  renderVertexShader,
  renderFragmentShader,
} from '../shaders/waterShaders';

const WaterEffect = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const simSceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.OrthographicCamera | null>(null);
  const rtARef = useRef<THREE.WebGLRenderTarget | null>(null);
  const rtBRef = useRef<THREE.WebGLRenderTarget | null>(null);
  const simMaterialRef = useRef<THREE.ShaderMaterial | null>(null);
  const renderMaterialRef = useRef<THREE.ShaderMaterial | null>(null);
  const textTextureRef = useRef<THREE.CanvasTexture | null>(null);
  const mouseRef = useRef<THREE.Vector2>(new THREE.Vector2());
  const frameRef = useRef<number>(0);
  const animationIdRef = useRef<number | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    const width = rect.width * window.devicePixelRatio;
    const height = rect.height * window.devicePixelRatio;

    // Scene setup
    const scene = new THREE.Scene();
    const simScene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      preserveDrawingBuffer: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(rect.width, rect.height);
    container.appendChild(renderer.domElement);

    // Mouse tracking
    const mouse = new THREE.Vector2();
    let frame = 0;

    // Render targets
    const options = {
      format: THREE.RGBAFormat,
      type: THREE.FloatType,
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      stencilBuffer: false,
      depthBuffer: false,
    };
    let rtA = new THREE.WebGLRenderTarget(width, height, options);
    let rtB = new THREE.WebGLRenderTarget(width, height, options);

    // Materials
    const simMaterial = new THREE.ShaderMaterial({
      uniforms: {
        textureA: { value: null },
        mouse: { value: mouse },
        resolution: { value: new THREE.Vector2(width, height) },
        time: { value: 0 },
        frame: { value: 0 },
      },
      vertexShader: simulationVertexShader,
      fragmentShader: simulationFragmentShader,
    });

    const renderMaterial = new THREE.ShaderMaterial({
      uniforms: {
        textureA: { value: null },
        textureB: { value: null },
      },
      vertexShader: renderVertexShader,
      fragmentShader: renderFragmentShader,
      transparent: true,
    });

    // Geometry
    const plane = new THREE.PlaneGeometry(2, 2);
    const simQuad = new THREE.Mesh(plane, simMaterial);
    const renderQuad = new THREE.Mesh(plane, renderMaterial);

    simScene.add(simQuad);
    scene.add(renderQuad);

    // Create a background texture matching ProjectGrid
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d", { alpha: true });

    // Fill with blush-white background (same as ProjectGrid)
    ctx.fillStyle = '#FFF8F2'; // blush-white color
    ctx.fillRect(0, 0, width, height);

    // Calculate positions based on canvas size
    const centerX = width / 2;
    const startY = height * 0.1; // Increased padding to match ProjectGrid (pt-20)
    const lineHeight = 80; // Much bigger spacing
    let currentY = startY;

    // "ABOUT" title - editorial-subtitle style (same as "Selected Works")
    ctx.fillStyle = '#C68C1C'; // blush-gold color
    ctx.font = '300 32px Poppins, sans-serif'; // font-poppins, font-light, text-base
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.letterSpacing = '2px'; // Add 2px letter spacing
    ctx.fillText("ABOUT", centerX, currentY);
    ctx.letterSpacing = 'normal'; // Reset letter spacing
    currentY += lineHeight * 1.32; // Double the spacing for more separation

    // "In a Nutshell" title - editorial-title style (same as "Back In Time")
    ctx.fillStyle = '#B76E79'; // blush-rosegold color
    ctx.font = '98px Voyage, serif'; // font-voyage, text-6xl (same as ProjectGrid)
    ctx.textAlign = 'center';
	ctx.letterSpacing = '4px'
    ctx.textBaseline = 'middle';
    ctx.fillText("In a Nutshell", centerX, currentY);
    currentY += lineHeight * 2;

    // Main text content - Voyage font, blush-rosegold color, much bigger
    ctx.fillStyle = '#B76E79'; // blush-rosegold color (same as "Back In Time")
    ctx.font = 'bold 45px Voyage, serif'; // font-voyage, much bigger than before
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    const mainText = "With an eye for detail and a passion for blending aesthetics with functionality, I create digital experiences that are both beautiful and intuitive.";
    
    // Word wrap for the main text
    const maxWidth = width * 0.8;
    const words = mainText.split(' ');
    let line = '';
    const lines = [];
    
    for (let i = 0; i < words.length; i++) {
      const testLine = line + words[i] + ' ';
      const metrics = ctx.measureText(testLine);
      if (metrics.width > maxWidth && i > 0) {
        lines.push(line);
        line = words[i] + ' ';
      } else {
        line = testLine;
      }
    }
    lines.push(line);
    
    lines.forEach(line => {
      ctx.fillText(line.trim(), centerX, currentY);
      currentY += lineHeight;
    });

    currentY += lineHeight;

    // Technology logos - blush-rosegold color
    ctx.fillStyle = '#B76E79'; // blush-rosegold color
    ctx.font = 'bold 32px Poppins, sans-serif'; // Much bigger font
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    const technologies = ['React', 'JavaScript', 'HTML5', 'CSS3', 'Node.js', 'Git', 'Figma', 'AWS', 'Docker', 'Python', 'PHP', 'WordPress', 'Shopify', 'Stripe', 'GitHub', 'npm', 'LinkedIn', 'Twitter', 'Instagram', 'Facebook'];
    const techSpacing = width / (technologies.length + 1);
    
    technologies.forEach((tech, index) => {
      const x = techSpacing * (index + 1);
      ctx.fillText(tech, x, currentY);
    });

    currentY += lineHeight * 2;

    // Expertise section - blush-rosegold color
    ctx.fillStyle = '#B76E79'; // blush-rosegold color
    ctx.font = 'bold 40px Poppins, sans-serif'; // Much bigger font
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText("Expertise", centerX, currentY);
    currentY += lineHeight;

    // Skills - blush-rosegold color
    ctx.fillStyle = '#B76E79'; // blush-rosegold color
    ctx.font = '28px Poppins, sans-serif'; // Much bigger font
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    const skills = ['Web Design', 'Frontend Development', 'User Experience', 'Visual Design', 'Creative Direction', 'Interaction Design'];
    const skillSpacing = width / (skills.length + 1);
    
    skills.forEach((skill, index) => {
      const x = skillSpacing * (index + 1);
      ctx.fillText(skill, x, currentY);
    });

    currentY += lineHeight * 2;

    // What I bring to the table - blush-rosegold color
    ctx.fillStyle = '#B76E79'; // blush-rosegold color
    ctx.font = 'bold 40px Poppins, sans-serif'; // Much bigger font
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText("What I bring to the table", centerX, currentY);
    currentY += lineHeight;

    // Deliverables - blush-rosegold color
    ctx.fillStyle = '#B76E79'; // blush-rosegold color
    ctx.font = '28px Poppins, sans-serif'; // Much bigger font
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    const deliverables = ['Responsive web design', 'Design systems', 'Creative strategy & direction', 'Accessible UI components', 'Brand-aligned visual storytelling', 'Client-ready prototypes'];
    const deliverableSpacing = width / (deliverables.length + 1);
    
    deliverables.forEach((deliverable, index) => {
      const x = deliverableSpacing * (index + 1);
      ctx.fillText(deliverable, x, currentY);
    });

    const textTexture = new THREE.CanvasTexture(canvas);
    textTexture.minFilter = THREE.LinearFilter;
    textTexture.magFilter = THREE.LinearFilter;
    textTexture.format = THREE.RGBAFormat;

    // Mouse event handlers
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) * window.devicePixelRatio;
      const y = (rect.height - (e.clientY - rect.top)) * window.devicePixelRatio;
      mouse.x = x;
      mouse.y = y;
    };

    const handleMouseLeave = () => {
      mouse.set(0, 0);
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    // Animation loop
    const animate = () => {
      simMaterial.uniforms.frame.value = frame++;
      simMaterial.uniforms.time.value = performance.now() / 1000;

      simMaterial.uniforms.textureA.value = rtA.texture;
      renderer.setRenderTarget(rtB);
      renderer.render(simScene, camera);

      renderMaterial.uniforms.textureA.value = rtB.texture;
      renderMaterial.uniforms.textureB.value = textTexture;
      renderer.setRenderTarget(null);
      renderer.render(scene, camera);

      const temp = rtA;
      rtA = rtB;
      rtB = temp;

      animationIdRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Store refs for cleanup
    rendererRef.current = renderer;
    sceneRef.current = scene;
    simSceneRef.current = simScene;
    cameraRef.current = camera;
    rtARef.current = rtA;
    rtBRef.current = rtB;
    simMaterialRef.current = simMaterial;
    renderMaterialRef.current = renderMaterial;
    textTextureRef.current = textTexture;
    mouseRef.current = mouse;
    frameRef.current = frame;

    // Cleanup function
    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
      
      if (renderer && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      
      renderer?.dispose();
      rtA?.dispose();
      rtB?.dispose();
      simMaterial?.dispose();
      renderMaterial?.dispose();
      textTexture?.dispose();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0"
      style={{ zIndex: 5 }}
    />
  );
};

export default WaterEffect;
