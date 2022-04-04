let titleFont;
let gameState = 0;
let isPlaySpaceDrawn = false;

/**
 * Preload the font used in the game
 */
function preload() {
	titleFont = loadFont("assets/ChelseaMarket-Regular.ttf");
}

/**
 * Setup of the game
 */
function setup() {
	createCanvas(displayWidth, displayHeight);

	createMenuButtons();
}

/**
 * What the player sees
 */
function draw() {
	background("#caffbf");

	if (gameState === 0) {
		fill("#4DA346");
		textFont(titleFont);
		textSize(windowWidth * 0.1);
		text("Two Peas in a Pod", windowWidth / 2, windowHeight / 4);
		textAlign(CENTER, CENTER);

		if (windowWidth >= 800) {
			easyMode.update(windowWidth / 4, windowHeight / 2);
			normalMode.update((2 * windowWidth) / 4, windowHeight / 2);
			hardMode.update((3 * windowWidth) / 4, windowHeight / 2);
		} else {
			easyMode.update(windowWidth / 2, (3 * windowHeight) / 6);
			normalMode.update(windowWidth / 2, (4 * windowHeight) / 6);
			hardMode.update(windowWidth / 2, (5 * windowHeight) / 6);
		}

		easyMode.show();
		normalMode.show();
		hardMode.show();
	} else {
		clear();
		background("#caffbf");

		if (!isPlaySpaceDrawn) {
			createPlaySpace(gameState);
			isPlaySpaceDrawn = true;
		}

		for (let i = 0; i < cards.length; i++) {
			cards[i].show();
		}

		if (startTime === 0) {
			startTime = millis();
		}
	}
}

/**
 * Checks if the card has a value,
 * else it assigns one
 *
 * @param {*} i - index of card
 * @returns
 */
function checkIfCardHasValue(i) {
	const randomCardIndex = Math.floor(Math.random() * cards.length);

	if (cards[randomCardIndex].getValue() === undefined) {
		cards[randomCardIndex].setValue(cardValues[i]);
		return;
	} else {
		checkIfCardHasValue(i);
	}
}

/**
 * Method used to compare one number to another
 * If difference is negative, a comes before b
 * If difference is positive, b comes before a
 * If diffence is zero, a and b are the same number
 *
 * @param {*} a - first number
 * @param {*} b - second number
 * @returns the difference of the two numbers
 */
function compareNumbers(a, b) {
	return a - b;
}

function createMenuButtons() {
	if (windowWidth >= 800) {
		easyMode = new Button(
			windowWidth / 4,
			windowHeight / 2,
			200,
			50,
			"Easy Mode"
		);
		normalMode = new Button(
			(2 * windowWidth) / 4,
			windowHeight / 2,
			200,
			50,
			"Normal Mode"
		);
		hardMode = new Button(
			(3 * windowWidth) / 4,
			windowHeight / 2,
			200,
			50,
			"Hard Mode"
		);
	} else {
		easyMode = new Button(
			windowWidth / 2,
			(3 * windowHeight) / 6,
			200,
			50,
			"Easy Mode"
		);
		normalMode = new Button(
			windowWidth / 2,
			(4 * windowHeight) / 6,
			200,
			50,
			"Normal Mode"
		);
		hardMode = new Button(
			windowWidth / 2,
			(5 * windowHeight) / 6,
			200,
			50,
			"Hard Mode"
		);
	}
}

function createPlaySpace(gameState) {
	switch (gameState) {
		case 1:
			numberOfCards = 6;
			break;
		case 2:
			numberOfCards = 12;
			break;
		case 3:
			numberOfCards = 24;
			break;
		default:
			break;
	}

	cards = [];
	cardValues = [];
	currentHand = [];
	factors = [];
	pairs = 0;

	startTime = 0;

	for (let i = 1; i <= numberOfCards / 2; i++) {
		if (numberOfCards % i === 0) {
			factors.push(i);
			factors.push(numberOfCards / i);
		}
	}

	factors.sort(compareNumbers);

	rows = factors[factors.length / 2 - 1];
	cardsPerRows = factors[factors.length / 2];

	while (cardValues.length !== numberOfCards / 2) {
		const randomValue = Math.floor(Math.random() * numberOfCards) + 1;
		if (cardValues.indexOf(randomValue) === -1) {
			cardValues.push(randomValue);
		} else {
			continue;
		}
	}

	for (let i = 0; i < numberOfCards; i++) {
		const xCoordinate =
			((i % cardsPerRows) * windowWidth) / cardsPerRows +
			windowWidth / cardsPerRows / 2;
		const yCoordinate =
			(Math.floor(i / cardsPerRows) * windowHeight) / rows +
			windowHeight / rows / 2;

		if (windowWidth / cardsPerRows > windowHeight / rows) {
			diameter = (0.9 * windowHeight) / rows;
		} else {
			diameter = (0.9 * windowWidth) / cardsPerRows;
		}

		cards[i] = new Card(xCoordinate, yCoordinate, diameter);
	}

	for (let i = 0; i < cardValues.length; i++) {
		for (let j = 0; j < 2; j++) {
			checkIfCardHasValue(i);
		}
	}
}

/**
 * Logic that happens when mouse is clicked
 *
 * Here for Firefox compatibility
 */
// function mouseClicked() {
// 	touchStarted();
// }

/**
 * Logic to happen for mobile device taps
 */
function touchStarted() {
	if (gameState === 0) {
		if (
			mouseX <= easyMode.x + easyMode.w / 2 &&
			mouseX >= easyMode.x - easyMode.w / 2 &&
			mouseY <= easyMode.y + easyMode.h / 2 &&
			mouseY >= easyMode.y - easyMode.h / 2
		) {
			gameState = 1;
		} else if (
			mouseX <= normalMode.x + normalMode.w / 2 &&
			mouseX >= normalMode.x - normalMode.w / 2 &&
			mouseY <= normalMode.y + normalMode.h / 2 &&
			mouseY >= normalMode.y - normalMode.h / 2
		) {
			gameState = 2;
		} else if (
			mouseX <= hardMode.x + hardMode.w / 2 &&
			mouseX >= hardMode.x - hardMode.w / 2 &&
			mouseY <= hardMode.y + hardMode.h / 2 &&
			mouseY >= hardMode.y - hardMode.h / 2
		) {
			gameState = 3;
		}
	} else {
		let clickedCard = null;

		for (let i = 0; i < cards.length; i++) {
			if (
				Math.sqrt(
					(mouseX - cards[i].x) ** 2 + (mouseY - cards[i].y) ** 2
				) <=
				cards[i].diameter / 2
			) {
				clickedCard = cards[i];
				clickedCard.flip();
				break;
			}
		}

		if (
			currentHand.length < 2 &&
			!clickedCard.getIsShowingBack() &&
			clickedCard !== currentHand[0]
		) {
			currentHand.push(clickedCard);
		} else if (
			currentHand.length === 1 &&
			currentHand[0].getIsShowingBack()
		) {
			currentHand.shift();
		}

		if (
			currentHand.length === 2 &&
			currentHand[0].getValue() !== currentHand[1].getValue()
		) {
			setTimeout(function () {
				currentHand[0]?.flip();
				currentHand[1]?.flip();

				currentHand.pop();
				currentHand.pop();
			}, 1000);
		} else if (
			currentHand.length === 2 &&
			currentHand[0].getValue() === currentHand[1].getValue()
		) {
			cards.splice(cards.indexOf(currentHand[0]), 1);
			currentHand.shift();

			cards.splice(cards.indexOf(currentHand[0]), 1);
			currentHand.shift();

			pairs++;
		}

		if (pairs === numberOfCards / 2) {
			const endTime = millis();
			let gameTime = ((endTime - startTime) / 1000).toFixed(2);

			alert(`Congratulations! You finished in ${gameTime} seconds`);
			clear();
		}
	}
}
