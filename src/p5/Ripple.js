export default class Ripple {
	constructor(p5, x, y) {
	  this.p5 = p5;
	  this.position = p5.createVector(x, y);
	  this.size = p5.random(50, 100);
	  this.lifespan = 255;
	  this.sizeStep = p5.random(2, 3);
	  this.lifeStep = p5.random(2, 10);
	}
  
	update() {
	  this.size += this.sizeStep;
	  this.lifespan -= this.lifeStep;
	}
  
	isFinished() {
	  return this.lifespan <= 0;
	}
  
	show() {
	  const { p5 } = this;
	  let main = p5.color('rgba(243, 217, 194, 0.1)');
	   main.setAlpha(this.lifespan);
	  let shadow = p5.color(0, 0, 0, 5);
  
	  p5.stroke(main);
	  p5.noFill();
	  p5.ellipse(this.position.x, this.position.y, this.size);
  
	  p5.stroke(shadow);
	  p5.ellipse(this.position.x + 50, this.position.y + 50, this.size);
	}
  }
  