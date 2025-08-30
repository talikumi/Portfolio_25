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

    // Brand icons with image loading - using your actual icons
    const icons = [
      { type: 'image', src: '/src/images/react-brands-solid-full.svg', name: 'React', image: null },
      { type: 'image', src: '/src/images/github-brands-solid-full.svg', name: 'GitHub', image: null },
      { type: 'image', src: '/src/images/html5-brands-solid-full.svg', name: 'HTML5', image: null },
      { type: 'image', src: '/src/images/square-js-brands-solid-full.svg', name: 'JavaScript', image: null },
      { type: 'image', src: '/src/images/python-brands-solid-full.svg', name: 'Python', image: null },
      { type: 'image', src: '/src/images/node-brands-solid-full.svg', name: 'Node.js', image: null },
      { type: 'image', src: '/src/images/aws-brands-solid-full.svg', name: 'AWS', image: null },
      { type: 'image', src: '/src/images/docker-brands-solid-full.svg', name: 'Docker', image: null },
      { type: 'image', src: '/src/images/figma-brands-solid-full.svg', name: 'Figma', image: null },
      { type: 'image', src: '/src/images/wordpress-brands-solid-full.svg', name: 'WordPress', image: null },
      { type: 'image', src: '/src/images/bootstrap-brands-solid-full.svg', name: 'Bootstrap', image: null },
      { type: 'image', src: '/src/images/git-brands-solid-full.svg', name: 'Git', image: null },
      { type: 'image', src: '/src/images/github-alt-brands-solid-full.svg', name: 'GitHub Alt', image: null }
    ];

    // Load all images using fetch for SVG files and make them pink
    let loadedImages = 0;
    const totalImages = icons.length;
    
    icons.forEach(async (icon, index) => {
      try {
        const response = await fetch(icon.src);
        let svgText = await response.text();
        
        // More comprehensive SVG color replacement
        // Replace any color values with our pink color
        svgText = svgText.replace(/fill="[^"]*"/g, 'fill="#B76E79"');
        svgText = svgText.replace(/fill='[^']*'/g, "fill='#B76E79'");
        svgText = svgText.replace(/stroke="[^"]*"/g, 'stroke="#B76E79"');
        svgText = svgText.replace(/stroke='[^']*'/g, "stroke='#B76E79'");
        
        // Also replace any style attributes with pink
        svgText = svgText.replace(/style="[^"]*fill:[^"]*"/g, 'style="fill:#B76E79"');
        svgText = svgText.replace(/style='[^']*fill:[^']*'/g, "style='fill:#B76E79'");
        
        // Remove any existing color attributes and add our pink
        svgText = svgText.replace(/color="[^"]*"/g, 'color="#B76E79"');
        svgText = svgText.replace(/color='[^']*'/g, "color='#B76E79'");
        
        // Add a global style to force pink color
        if (svgText.includes('<svg')) {
          svgText = svgText.replace('<svg', '<svg style="color:#B76E79; fill:#B76E79; stroke:#B76E79;"');
        }
        
        const img = new Image();
        img.onload = () => {
          loadedImages++;
          icon.image = img;
          // If all images are loaded, trigger a redraw
          if (loadedImages === totalImages) {
            // Clear the logo area to prevent overlapping
            ctx.fillStyle = '#FFF8F2'; // blush-white background
            ctx.fillRect(0, logoSliderY - 50, width, 100); // Clear logo area with padding
            
            // Use same narrower width for initial drawing
            const logoSliderWidth = width * 0.7; // 70% of canvas width
            const logoSliderStartX = (width - logoSliderWidth) / 2; // Center the logo slider
            
            for (let set = 0; set < 4; set++) {
              icons.forEach((icon, index) => {
                const x = logoSliderStartX + (set * icons.length * iconSpacing) + (index * iconSpacing);
                if (x > logoSliderStartX - iconSpacing && x < logoSliderStartX + logoSliderWidth + iconSpacing && icon.image) {
                  const iconSize = 60;
                  
                  // Apply pink tint using canvas filters
                  ctx.save();
                  ctx.filter = 'hue-rotate(320deg) saturate(1.5) brightness(0.8)';
                  ctx.drawImage(icon.image, x - iconSize/2, logoSliderY - iconSize/2, iconSize, iconSize);
                  ctx.restore();
                }
              });
            }
            textTexture.needsUpdate = true;
          }
        };
        img.src = 'data:image/svg+xml;base64,' + btoa(svgText);
      } catch (error) {
        console.log(`Failed to load image: ${icon.src}`, error);
        loadedImages++;
      }
    });
    
    const iconSpacing = 80; // Space between icons

    // Fill with gradient background from blush-white to light blue
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, '#FFF8F2'); // blush-white at top
    gradient.addColorStop(0.50, '#FFF8F2'); // blush-white extends to 70% down
    gradient.addColorStop(1, '#93C5FD'); // light blue at bottom
    ctx.fillStyle = gradient;
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
    ctx.fillText("The ( Work ) flow", centerX, currentY);
    currentY += lineHeight * 2;

    // Main text content - Voyage font, blush-rosegold color, much bigger
    ctx.fillStyle = '#B76E79'; // blush-rosegold color (same as "Back In Time")
    ctx.font = 'bold 45px Voyage, serif'; // font-voyage, much bigger than before
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    const mainText = [
      "My approach to the web is about creating spaces where people feel at ease.",
      "I focus on minimizing friction and noise, while prioritizing clean and intuitive interactions.",
      "On the other hand, when not coding, you'll usually find me experimenting with messy new recipes,",
	  "heating up over videogames, or fueling my competitive edge on the tennis court."
    ];
    
    // Draw each sentence on its own line
    mainText.forEach(sentence => {
      ctx.fillText(sentence, centerX, currentY);
      currentY += lineHeight * 0.8; // Reduced spacing between sentences
    });

    // Set logo slider position (fixed, independent of expertise section)
    const logoSliderY = currentY + 180; // 30px after the paragraph

    // Add subtitle above logo slider
    ctx.fillStyle = '#B76E79'; // blush-rosegold color (same as other elements)
    ctx.font = '300 32px Poppins, sans-serif'; // Bigger professional subtitle font
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.letterSpacing = '1px'; // Subtle letter spacing
    ctx.fillText("Technologies I work with most", centerX, logoSliderY - (lineHeight * 1.2));
    ctx.letterSpacing = 'normal'; // Reset letter spacing

    // Move expertise section way down (independent of logo slider)
    currentY += lineHeight * 4; // Move expertise section way down

    // Expertise section - same style as technologies subtitle
    ctx.fillStyle = '#B76E79'; // blush-rosegold color
    ctx.font = '300 32px Poppins, sans-serif'; // Same font and size as technologies subtitle
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.letterSpacing = '1px'; // Subtle letter spacing
    ctx.fillText("Expertise", centerX, currentY);
    ctx.letterSpacing = 'normal'; // Reset letter spacing
    currentY += lineHeight * 1.5; // More space between title and skill boxes

    // Skills - styled as table-like elements
    const skills = ['Web Design', 'Frontend Development', 'User Experience', 'Visual Design', 'Creative Direction', 'Interaction Design'];
    const skillBoxWidth = width * 0.4; // 40% of canvas width for each skill box
    const skillBoxHeight = 80; // Bigger height for each skill box
    const skillBoxSpacing = 40; // More space between skill boxes
    
    // Create two columns for skills
    const skillsPerColumn = Math.ceil(skills.length / 2);
    const leftColumnX = centerX - skillBoxWidth - skillBoxSpacing/2;
    const rightColumnX = centerX + skillBoxSpacing/2;
    
    skills.forEach((skill, index) => {
      const column = Math.floor(index / skillsPerColumn);
      const row = index % skillsPerColumn;
      const boxX = column === 0 ? leftColumnX : rightColumnX;
      const boxY = currentY + (row * (skillBoxHeight + skillBoxSpacing));
      
      // Draw skill box with transparent background
      ctx.strokeStyle = '#B76E79'; // blush-rosegold border
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(boxX, boxY - skillBoxHeight/2, skillBoxWidth, skillBoxHeight, 8);
      ctx.stroke();
      
      // Draw skill text
      ctx.fillStyle = '#B76E79'; // blush-rosegold text
      ctx.font = '600 28px Poppins, sans-serif'; // Bigger, bold font
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(skill, boxX + skillBoxWidth/2, boxY);
    });
    
    // Update currentY to account for the skill boxes
    const totalRows = Math.ceil(skills.length / 2);
    currentY += (totalRows * (skillBoxHeight + skillBoxSpacing)) + lineHeight;



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

      // Update canvas with scrolling logos
      const currentTime = performance.now();
      const scrollOffset = (currentTime * 0.02) % (icons.length * iconSpacing);
      
      // Clear the logo area to prevent overlapping
      ctx.fillStyle = '#FFF8F2'; // blush-white background
      ctx.fillRect(0, logoSliderY - 50, width, 100); // Clear logo area with padding
      
      // Redraw logos with updated scroll position (narrower than full width)
      const logoSliderWidth = width * 0.7; // 70% of canvas width (bigger than paragraph's 60%)
      const logoSliderStartX = (width - logoSliderWidth) / 2; // Center the logo slider
      
      for (let set = 0; set < 4; set++) {
        icons.forEach((icon, index) => {
          const x = logoSliderStartX + (set * icons.length * iconSpacing) + (index * iconSpacing) - scrollOffset;
          if (x > logoSliderStartX - iconSpacing && x < logoSliderStartX + logoSliderWidth + iconSpacing && icon.image) {
            // Draw loaded image with pink tint
            const iconSize = 65;
            ctx.save();
            ctx.drawImage(icon.image, x - iconSize/2, logoSliderY - iconSize/2, iconSize, iconSize);
            ctx.restore();
          }
        });
      }
      
      // Update texture
      textTexture.needsUpdate = true;

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
    >

    </div>
  );
};

export default WaterEffect;
