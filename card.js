class Card {
	constructor(x, y, d) {
		this.x = x;
		this.y = y;
		this.d = d;
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
		fill("#4DA346");
		circle(this.x, this.y, this.d);
	}

	showFront() {
		fill(255, 255, 255);
		circle(this.x, this.y, this.d);

		fill(0, 0, 0);
		text(this.value, this.x, this.y);
		textAlign(CENTER, CENTER);
		textSize(32);
	}
}
