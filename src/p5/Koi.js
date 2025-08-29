import p5 from 'p5';

export default class Koi {
	constructor(p5, x, y, color, params) {
		this.p5 = p5;
		this.color = p5.color(color);
		this.params = params;
		this.position = p5.createVector(x, y);
		this.velocity = p5.constructor.Vector.random2D(); // ✅ CORRETTO con istanza
		this.acceleration = p5.createVector(0, 0);
		this.baseSize = parseInt(p5.random(10, 15));
		this.bodyLength = this.baseSize * 2,5;
		this.body = Array(this.bodyLength).fill({ ...this.position });
	  }
  
	calculateSteer(others, type) {
	  const { p5, params } = this;
	  let steer = p5.createVector();
	  let total = 0;
  
	  for (let other of others) {
		let d = p5.dist(this.position.x, this.position.y, other.position.x, other.position.y);
		if (d < params.perceptionRadius && other !== this) {
		  if (type === 'align') steer.add(other.velocity);
		  if (type === 'cohesion') steer.add(other.position);
		  if (type === 'separation') {
			let diff = this.p5.constructor.Vector.sub(this.position, other.position).div(d);
			steer.add(diff);
		  }
		  total++;
		}
	  }
  
	  if (total > 0) {
		steer.div(total);
		if (type === 'cohesion') steer.sub(this.position);
		steer.setMag(params.maxSpeed);
		steer.sub(this.velocity);
		steer.limit(params.maxForce);
	  }
  
	  return steer;
	}
  
	applyBehaviors(others, mouse) {
	  this.acceleration.mult(0);
  
	  let align = this.calculateSteer(others, 'align').mult(this.params.alignAmp);
	  let cohesion = this.calculateSteer(others, 'cohesion').mult(this.params.cohesionAmp);
	  let separation = this.calculateSteer(others, 'separation').mult(this.params.separationAmp);
	  let avoid = this.calculateAvoid(mouse);
  
	  this.acceleration.add(align).add(cohesion).add(separation).add(avoid);
	  this.acceleration.add(this.p5.constructor.Vector.random2D().mult(0.05)); 
	}
  
	calculateAvoid(obstacle) {
		const { p5, params } = this;
		let steer = p5.createVector();
	
		if (!obstacle || typeof obstacle.x !== 'number' || typeof obstacle.y !== 'number') {
			return steer;
		}
	
		let d = p5.dist(this.position.x, this.position.y, obstacle.x, obstacle.y);
		if (d < params.perceptionRadius) {
			let diff = p5.constructor.Vector.sub(this.position, obstacle).div(d);
			steer
				.add(diff)
				.setMag(params.maxSpeed)
				.sub(this.velocity)
				.limit(params.maxForce);
		}
	
		return steer;
	}
	
	update() {
	  this.velocity.add(this.acceleration).limit(this.params.maxSpeed);
	  this.position.add(this.velocity);
	  this.reenterIfOutOfBounds();
	  this.body.unshift({ ...this.position });
	  this.body.pop();
	}

	reenterIfOutOfBounds() {
		const margin = 50;
		if (this.position.x < -margin) this.position.x = this.p5.width + margin;
		if (this.position.x > this.p5.width + margin) this.position.x = -margin;
		if (this.position.y < -margin) this.position.y = this.p5.height + margin;
		if (this.position.y > this.p5.height + margin) this.position.y = -margin;
	}
  
	show() {
	  const { p5 } = this;
	  this.body.forEach((b, i) => {
		let size = i < this.bodyLength / 6 ? this.baseSize + i * 1.8 : this.baseSize * 2 - i;
		let alpha = (this.bodyLength - i) * 1.5; // Increased opacity by 50%
  
		let borderColor = p5.color('#C59364');
		borderColor.setAlpha(alpha);
		p5.stroke(borderColor);
		p5.strokeWeight(.8);
  
		// Create gradient from existing color to pink
		let gradientRatio = i / this.bodyLength; // 0 at head, 1 at tail
		let pinkColor = p5.color(255, 152, 193); // Pink color
		
		// Interpolate between existing color and pink
		let gradientColor = p5.lerpColor(this.color, pinkColor, gradientRatio);
		gradientColor.setAlpha(alpha);
		
		p5.fill(gradientColor);
		p5.ellipse(b.x, b.y, size, size);
	  });
	}
  
	showShadow() {
	  const { p5 } = this;
	  this.body.forEach((b, i) => {
		let size = i < this.bodyLength / 6 ? this.baseSize + i * 1.8 : this.baseSize * 2 - i;
		p5.noStroke();
		p5.fill(0, 4);
		p5.ellipse(b.x + 10, b.y + 10, size, size);
	  });
	}

	isOutOfBounds() {
		const { x, y } = this.position;
		return (
		  x < -100 || x > this.p5.width + 100 ||
		  y < -100 || y > this.p5.height + 100
		);
	  }
  }
  