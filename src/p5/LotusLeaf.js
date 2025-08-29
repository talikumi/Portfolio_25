export default class LotusLeaf {
	constructor(p5, x, y, offset, scale) {
	  this.p5 = p5;
	  this.x = x;
	  this.y = y;
	  this.offset = offset;
	  this.scale = scale;
	  this.color = p5.color(71, 184, 151);
	}
  
	drawShape(vertices, offset, col) {
	  const { p5 } = this;
	  p5.fill(col);
	  p5.beginShape();
	  vertices.forEach(v => p5.vertex(v.x + offset, v.y + offset));
	  p5.endShape();
	}
  
	show() {
	  const { p5 } = this;
	  p5.push();
	  p5.translate(this.x, this.y);
	  p5.noiseDetail(1, 0.8);
  
	  let vertices = [];
	  for (let i = 0; i < p5.TWO_PI; i += p5.radians(1)) {
		let x = this.offset * p5.cos(i) + this.offset;
		let y = this.offset * p5.sin(i) + this.offset;
		let r = 180 + p5.map(p5.noise(x, y), 0, 1, -this.scale, this.scale);
		let x1 = r * p5.cos(i);
		let y1 = r * p5.sin(i);
		vertices.push({ x: x1, y: y1 });
	  }
  
	  p5.noStroke();
	  this.drawShape(vertices, 50, p5.color(0, 0, 0, 5));
	  this.drawShape(vertices, 0, this.color);
  
	  vertices.forEach((v, i) => {
		if ((i + 1) % 40 === 0) {
		  p5.strokeWeight(6);
		  p5.stroke(23, 111, 88, 40);
		  p5.line(v.x * 0.1, v.y * 0.19, v.x * 0.9, v.y * 0.86);
		}
	  });
  
	  p5.pop();
	}
  }
  