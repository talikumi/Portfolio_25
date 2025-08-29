export default class Flock {
	constructor(p5, params) {
	  this.p5 = p5;
	  this.params = params;
	  this.kois = [];
	}
  
	addKoi(koi) {
	  this.kois.push(koi);
	}
  
	run(koi, mouse) {
	  koi.applyBehaviors(this.kois, mouse);
	}
  }
  