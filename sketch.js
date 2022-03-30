let titleFont;

function preload() {
	titleFont = loadFont("assets/ChelseaMarket-Regular.ttf");
}
function setup() {
	createCanvas(displayWidth, displayHeight);

	startButton = new Button(windowWidth / 2, windowHeight / 2, 200, 50);
	startGame = false;

	numberOfCards = 24;
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

function draw() {
	background("#caffbf");

	if (!startGame) {
		fill("#4DA346");
		textFont(titleFont);
		textSize(48);
		text("Two Peas in a Pod", windowWidth / 2, windowHeight / 4);
		textAlign(CENTER, CENTER);

		fill(255);
		startButton.update(windowWidth / 2, windowHeight / 2);
		startButton.show();
	} else {
		clear();
		background("#caffbf");

		for (let i = 0; i < cards.length; i++) {
			cards[i].show();
		}

		if (startTime === 0) {
			startTime = millis();
		}
	}
}

function checkIfCardHasValue(i) {
	const randomCardIndex = Math.floor(Math.random() * cards.length);

	if (cards[randomCardIndex].getValue() === undefined) {
		cards[randomCardIndex].setValue(cardValues[i]);
		return;
	} else {
		checkIfCardHasValue(i);
	}
}

function mouseClicked() {
	if (!startGame) {
		if (
			mouseX <= startButton.x + startButton.w / 2 &&
			mouseX >= startButton.x - startButton.w / 2 &&
			mouseY <= startButton.y + startButton.h / 2 &&
			mouseY >= startButton.y - startButton.h / 2
		) {
			startGame = true;
		}
	} else {
		let clickedCard = null;

		for (let i = 0; i < cards.length; i++) {
			if (
				Math.sqrt(
					(mouseX - cards[i].x) ** 2 + (mouseY - cards[i].y) ** 2
				) <=
				cards[i].d / 2
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
			alert(
				`Congratulations! You finished in ${
					(endTime - startTime) / 1000
				} seconds`
			);
		}
	}
}

function compareNumbers(a, b) {
	return a - b;
}
