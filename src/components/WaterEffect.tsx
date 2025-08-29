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
  const logoAnimationRef = useRef<number>(0);

  // Logo data with FontAwesome icons
  const logos = [
    { name: 'Apple', color: '#000000', icon: '🍎' },
    { name: 'Google', color: '#4285F4', icon: 'G' },
    { name: 'Facebook', color: '#1877F2', icon: 'f' },
    { name: 'Twitter', color: '#1DA1F2', icon: '𝕏' },
    { name: 'React', color: '#61DAFB', icon: '⚛' },
    { name: 'JavaScript', color: '#F7DF1E', icon: 'JS' },
    { name: 'HTML5', color: '#E34F26', icon: 'HTML' },
    { name: 'CSS3', color: '#1572B6', icon: 'CSS' },
    { name: 'Node.js', color: '#339933', icon: 'Node' },
    { name: 'Git', color: '#F05032', icon: 'Git' },
    { name: 'Figma', color: '#F24E1E', icon: 'Figma' },
    { name: 'AWS', color: '#FF9900', icon: 'AWS' },
    { name: 'Docker', color: '#2496ED', icon: 'Docker' },
    { name: 'Python', color: '#3776AB', icon: 'Python' },
    { name: 'PHP', color: '#777BB4', icon: 'PHP' },
    { name: 'WordPress', color: '#21759B', icon: 'WP' },
    { name: 'Shopify', color: '#7AB55C', icon: 'Shopify' },
    { name: 'Stripe', color: '#008CDD', icon: 'Stripe' },
    { name: 'GitHub', color: '#181717', icon: 'GitHub' },
    { name: 'npm', color: '#CB3837', icon: 'npm' }
  ];

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

    // Create a background texture with animated logo slider
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d", { alpha: true });

    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Set background
    ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.fillRect(0, 0, width, height);

    // Calculate positions
    const centerX = width / 2;
    let currentY = height * 0.15;
    const lineHeight = height * 0.08;

    // "In a Nutshell" title
    ctx.fillStyle = '#B76E79';
    ctx.font = '98px Voyage, serif';
    ctx.textAlign = 'center';
    ctx.letterSpacing = '4px';
    ctx.textBaseline = 'middle';
    ctx.fillText("In a Nutshell", centerX, currentY);
    currentY += lineHeight * 2;

    // Main text content
    ctx.fillStyle = '#B76E79';
    ctx.font = 'bold 45px Voyage, serif';
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

    // Animated logo slider
    const logoSize = Math.min(width * 0.08, height * 0.08);
    const logoSpacing = logoSize * 1.5;
    const totalLogoWidth = logos.length * logoSpacing;
    const animationSpeed = 0.5; // pixels per frame
    
    // Calculate animation offset
    const animationOffset = (Date.now() * animationSpeed) % (totalLogoWidth + width);
    const startX = -totalLogoWidth + (animationOffset % (totalLogoWidth + width));
    
    // Draw logos with sliding animation
    logos.forEach((logo, index) => {
      const x = startX + index * logoSpacing;
      const y = currentY;
      
      // Only draw if logo is visible on screen
      if (x > -logoSize && x < width + logoSize) {
        // Draw logo background
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.strokeStyle = 'rgba(183, 110, 121, 0.2)';
        ctx.lineWidth = 2;
        
        const logoX = x + logoSize / 2;
        const logoY = y;
        const radius = logoSize / 2;
        
        // Draw rounded rectangle background
        ctx.beginPath();
        ctx.roundRect(logoX - radius, logoY - radius, logoSize, logoSize, 8);
        ctx.fill();
        ctx.stroke();
        
        // Draw logo symbol/text
        ctx.fillStyle = logo.color;
        ctx.font = `${logoSize * 0.4}px Arial, sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(logo.icon, logoX, logoY);
        
        // Draw logo name below
        ctx.fillStyle = '#B76E79';
        ctx.font = `${logoSize * 0.2}px Arial, sans-serif`;
        ctx.fillText(logo.name, logoX, logoY + logoSize * 0.6);
      }
    });

    currentY += lineHeight * 2;

    // Expertise section
    ctx.fillStyle = '#B76E79';
    ctx.font = 'bold 40px Poppins, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText("Expertise", centerX, currentY);
    currentY += lineHeight;

    // Skills
    ctx.fillStyle = '#B76E79';
    ctx.font = '28px Poppins, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    const skills = ['Web Design', 'Frontend Development', 'User Experience', 'Visual Design', 'Creative Direction', 'Interaction Design'];
    const skillSpacing = width / (skills.length + 1);
    
    skills.forEach((skill, index) => {
      const x = skillSpacing * (index + 1);
      ctx.fillText(skill, x, currentY);
    });

    currentY += lineHeight * 2;

    // What I bring to the table
    ctx.fillStyle = '#B76E79';
    ctx.font = 'bold 40px Poppins, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText("What I bring to the table", centerX, currentY);
    currentY += lineHeight;

    // Deliverables
    ctx.fillStyle = '#B76E79';
    ctx.font = '28px Poppins, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    const deliverables = ['Responsive web design', 'Design systems', 'Creative strategy & direction', 'Accessible UI components', 'Brand-aligned visual storytelling', 'Client-ready prototypes'];
    const deliverableSpacing = width / (deliverables.length + 1);
    
    deliverables.forEach((deliverable, index) => {
      const x = deliverableSpacing * (index + 1);
      ctx.fillText(deliverable, x, currentY);
    });

    // Create texture from canvas
    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;

    // Animation loop
    const animate = () => {
      frame++;
      
      // Update logo animation
      logoAnimationRef.current = Date.now();
      
      // Recreate canvas with updated animation
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.fillRect(0, 0, width, height);

      // Recalculate positions
      currentY = height * 0.15;

      // "In a Nutshell" title
      ctx.fillStyle = '#B76E79';
      ctx.font = '98px Voyage, serif';
      ctx.textAlign = 'center';
      ctx.letterSpacing = '4px';
      ctx.textBaseline = 'middle';
      ctx.fillText("In a Nutshell", centerX, currentY);
      currentY += lineHeight * 2;

      // Main text content
      ctx.fillStyle = '#B76E79';
      ctx.font = 'bold 45px Voyage, serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      
      lines.forEach(line => {
        ctx.fillText(line.trim(), centerX, currentY);
        currentY += lineHeight;
      });

      currentY += lineHeight;

      // Animated logo slider with updated animation
      const updatedAnimationOffset = (Date.now() * animationSpeed) % (totalLogoWidth + width);
      const updatedStartX = -totalLogoWidth + (updatedAnimationOffset % (totalLogoWidth + width));
      
      logos.forEach((logo, index) => {
        const x = updatedStartX + index * logoSpacing;
        const y = currentY;
        
        if (x > -logoSize && x < width + logoSize) {
          // Draw logo background
          ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
          ctx.strokeStyle = 'rgba(183, 110, 121, 0.2)';
          ctx.lineWidth = 2;
          
          const logoX = x + logoSize / 2;
          const logoY = y;
          const radius = logoSize / 2;
          
          ctx.beginPath();
          ctx.roundRect(logoX - radius, logoY - radius, logoSize, logoSize, 8);
          ctx.fill();
          ctx.stroke();
          
          // Draw logo symbol/text
          ctx.fillStyle = logo.color;
          ctx.font = `${logoSize * 0.4}px Arial, sans-serif`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(logo.icon, logoX, logoY);
          
          // Draw logo name below
          ctx.fillStyle = '#B76E79';
          ctx.font = `${logoSize * 0.2}px Arial, sans-serif`;
          ctx.fillText(logo.name, logoX, logoY + logoSize * 0.6);
        }
      });

      currentY += lineHeight * 2;

      // Expertise section
      ctx.fillStyle = '#B76E79';
      ctx.font = 'bold 40px Poppins, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText("Expertise", centerX, currentY);
      currentY += lineHeight;

      // Skills
      ctx.fillStyle = '#B76E79';
      ctx.font = '28px Poppins, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      
      skills.forEach((skill, index) => {
        const x = skillSpacing * (index + 1);
        ctx.fillText(skill, x, currentY);
      });

      currentY += lineHeight * 2;

      // What I bring to the table
      ctx.fillStyle = '#B76E79';
      ctx.font = 'bold 40px Poppins, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText("What I bring to the table", centerX, currentY);
      currentY += lineHeight;

      // Deliverables
      ctx.fillStyle = '#B76E79';
      ctx.font = '28px Poppins, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      
      deliverables.forEach((deliverable, index) => {
        const x = deliverableSpacing * (index + 1);
        ctx.fillText(deliverable, x, currentY);
      });

      // Update texture
      texture.needsUpdate = true;

      // Water simulation
      simMaterial.uniforms.time.value = Date.now() * 0.001;
      simMaterial.uniforms.frame.value = frame;
      simMaterial.uniforms.mouse.value = mouse;

      // Ping-pong rendering
      renderer.setRenderTarget(rtA);
      renderer.render(simScene, camera);

      renderMaterial.uniforms.textureA.value = rtA.texture;
      renderMaterial.uniforms.textureB.value = texture;

      renderer.setRenderTarget(null);
      renderer.render(scene, camera);

      animationIdRef.current = requestAnimationFrame(animate);
    };

    // Mouse event handlers
    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    };

    const handleTouchMove = (event: TouchEvent) => {
      event.preventDefault();
      const rect = container.getBoundingClientRect();
      const touch = event.touches[0];
      mouse.x = ((touch.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((touch.clientY - rect.top) / rect.height) * 2 + 1;
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('touchmove', handleTouchMove, { passive: false });

    // Start animation
    animate();

    // Store refs
    rendererRef.current = renderer;
    sceneRef.current = scene;
    simSceneRef.current = simScene;
    cameraRef.current = camera;
    rtARef.current = rtA;
    rtBRef.current = rtB;
    simMaterialRef.current = simMaterial;
    renderMaterialRef.current = renderMaterial;
    textTextureRef.current = texture;
    mouseRef.current = mouse;
    frameRef.current = frame;

    // Cleanup
    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('touchmove', handleTouchMove);
      
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      
      if (renderer && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      
      renderer?.dispose();
      rtA?.dispose();
      rtB?.dispose();
      texture?.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 10 }}
    />
  );
};

export default WaterEffect;
