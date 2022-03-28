class Button {
	constructor(x, y, w, h) {
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
	}

	show() {
		rectMode(CENTER);
		rect(this.x, this.y, this.w, this.h);
		textSize(24);
		text("Start Game", this.x, this.y);
		textAlign(CENTER, CENTER);
	}

	update(x, y) {
		this.x = x;
		this.y = y;
	}
}
