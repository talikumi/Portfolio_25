import React, { useState, useEffect } from 'react';
import Flock from '../p5/Flock';
import Koi from '../p5/Koi';
import Ripple from '../p5/Ripple';
import LotusLeaf from '../p5/LotusLeaf';
import FlockParams from '../p5/FlockParams';
import Sketch from 'react-p5'; 

const P5Sketch = () => {
  const [flock, setFlock] = useState(null);
  const [ripples, setRipples] = useState([]);
  const [lotusLeaves, setLotusLeaves] = useState([]);
  const [params] = useState(() => new FlockParams());
  const [lastRippleTime, setLastRippleTime] = useState(0);


  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef);
    p5.pixelDensity(1);
    p5.canvas.style.backgroundColor = 'transparent'; 

    if (!flock) {
      const f = new Flock(p5, params);
      for (let i = 0; i < 8; i++) {
        const x = p5.random(p5.width);
        const y = p5.random(p5.height);
        const koi = new Koi(p5, x, y, '#F7C873', params);
        f.addKoi(koi);
      }
      setFlock(f);
    }
  };

  const draw = (p5) => {
	if (!flock) return;
	
	// Clear with transparent background
	p5.clear();
	p5.background(0, 0, 0, 0); // Transparent background
  
	lotusLeaves.forEach(leaf => leaf.show());
  
	if (flock) {
	  for (let i = flock.kois.length - 1; i >= 0; i--) {
		const koi = flock.kois[i];
		koi.update();
		koi.showShadow();
		koi.show();
  
		// ✅ Ora passiamo il mouse correttamente
		const mouse = p5.createVector(p5.mouseX, p5.mouseY);
		flock.run(koi, mouse);
  
	  }
  
	  if (flock.kois.length < 10) {
		const x = p5.random(p5.width);
		const y = p5.random(p5.height);
		const newKoi = new Koi(p5, x, y, '#F7C873', params);
		flock.addKoi(newKoi);
	  }
	}
  
	// Add random ripples
	const currentTime = Date.now();
	if (currentTime - lastRippleTime > p5.random(2000, 5000)) { // Random interval between 2-5 seconds
	  const rippleCount = p5.random([1, 2, 3]); // Random number of ripples (1, 2, or 3)
	  for (let i = 0; i < rippleCount; i++) {
		const x = p5.random(p5.width);
		const y = p5.random(p5.height);
		setRipples(prev => [...prev, new Ripple(p5, x, y)]);
	  }
	  setLastRippleTime(currentTime);
	}
  
	for (let i = ripples.length - 1; i >= 0; i--) {
	  ripples[i].update();
	  ripples[i].show();
	  if (ripples[i].isFinished()) {
		ripples.splice(i, 1);
	  }
	}
  };
  

  const mousePressed = (p5) => {
    setRipples(prev => [...prev, new Ripple(p5, p5.mouseX, p5.mouseY)]);
  };

  const windowResized = (p5) => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
  };

  return (
    <div style={{ zIndex: 100, position: 'relative' }}>
      <Sketch
        setup={setup}
        draw={draw}
        mousePressed={mousePressed}
        windowResized={windowResized}
      />
    </div>
  );
};

export default P5Sketch;
