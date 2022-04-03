class Button {
	/**
	 * Constructor for start button
	 *
	 * @param {*} x - x coordinate of origin
	 * @param {*} y - y coordinate of origin
	 * @param {*} w - width of button
	 * @param {*} h - height of button
	 */
	constructor(x, y, w, h, mode) {
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.mode = mode;
	}

	/**
	 * Displays button with the appropriate mode text
	 */
	show() {
		fill("#FFFFFF");
		rectMode(CENTER);
		rect(this.x, this.y, this.w, this.h);
		textSize(24);
		fill(0);
		text(this.mode, this.x, this.y);
		textAlign(CENTER, CENTER);
	}

	/**
	 * Updates the x and y coordinates so even when resizing the window,
	 * the start button is centered
	 *
	 * @param {number} x - x coordinate
	 * @param {number} y - y coordinate
	 */
	update(x, y) {
		this.x = x;
		this.y = y;
	}
}
