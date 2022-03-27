class Card {
	constructor(x, y, w, h) {
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.value;
		this.isShowingBack = true;
	}

	flip() {
		this.isShowingBack = !this.isShowingBack;
	}

	getIsShowingBack() {
		return this.isShowingBack;
	}

	getValue() {
		return this.value;
	}

	setValue(value) {
		this.value = value;
	}

	show() {
		if (this.isShowingBack) {
			this.showBack();
		} else {
			this.showFront();
		}
	}

	showBack() {
		fill("#bdb2ff");
		rect(this.x, this.y, this.w, this.h, 10);
	}

	showFront() {
		fill(255, 255, 255);
		rect(this.x, this.y, this.w, this.h, 10);
		fill(0, 0, 0);
		text(this.value, this.x + this.w / 2, this.y + this.h / 2);
		textAlign(CENTER, CENTER);
		textSize(32);
	}
}
