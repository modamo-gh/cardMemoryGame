class Card {
	/**
	 * Constructor for cards
	 * @param {*} x - x-coordinate of origin of card
	 * @param {*} y - y-coordinate of origin of card
	 * @param {*} diameter - diameter of card
	 */
	constructor(x, y, diameter) {
		this.x = x;
		this.y = y;
		this.diameter = diameter;
		this.value;
		this.isShowingBack = true;
	}

	/**
	 * Flips card to opposite side
	 */
	flip() {
		this.isShowingBack = !this.isShowingBack;
	}

	/**
	 * Getter for the isShowingBack field
	 *
	 * @returns if the back of the card is showing
	 */
	getIsShowingBack() {
		return this.isShowingBack;
	}

	/**
	 * Getter for the value field
	 *
	 * @returns value of the card
	 */
	getValue() {
		return this.value;
	}

	/**
	 * Sets value of the card
	 *
	 * @param {*} value - value card will be given
	 */
	setValue(value) {
		this.value = value;
	}

	/**
	 * Display function of the card
	 * depending on what side of the card is showing
	 */
	show() {
		if (this.isShowingBack) {
			this.showBack();
		} else {
			this.showFront();
		}
	}

	/**
	 * Draws the back of the card
	 */
	showBack() {
		fill("#4DA346");
		circle(this.x, this.y, this.diameter);
	}

	/**
	 * Draws the front of the card
	 * showing the value of said card
	 */
	showFront() {
		fill(255, 255, 255);
		circle(this.x, this.y, this.diameter);

		fill(0, 0, 0);
		text(this.value, this.x, this.y);
		textAlign(CENTER, CENTER);
		textSize(32);
	}
}
