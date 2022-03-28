function setup() {
	createCanvas(displayWidth, displayHeight);

	startButton = new Button(windowWidth / 2, windowHeight / 2, 200, 50);
	startGame = false;

	numberOfCards = 8;
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
		const xCoordinate = ((i % cardsPerRows) * windowWidth) / cardsPerRows;
		const yCoordinate =
			(Math.floor(i / cardsPerRows) * windowHeight) / rows;
		const cardWidth = windowWidth / cardsPerRows;
		const cardHeight = windowHeight / rows;

		cards[i] = new Card(xCoordinate, yCoordinate, cardWidth, cardHeight);
	}

	for (let i = 0; i < cardValues.length; i++) {
		for (let j = 0; j < 2; j++) {
			checkIfCardHasValue(i);
		}
	}
}

function draw() {
	background(220);

	if (!startGame) {
		startButton.show();
	} else {
		clear();
		rectMode(CORNER);

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
		for (let i = 0; i < cards.length; i++) {
			if (
				mouseX <= cards[i].x + cards[i].w &&
				mouseX >= cards[i].x &&
				mouseY <= cards[i].y + cards[i].h &&
				mouseY >= cards[i].y
			) {
				cards[i].flip();
			}

			if (
				currentHand.length < 2 &&
				!cards[i].getIsShowingBack() &&
				cards[i] !== currentHand[0]
			) {
				currentHand.push(cards[i]);
			} else if (
				currentHand.length === 1 &&
				currentHand[0].getIsShowingBack()
			) {
				currentHand.shift();
			} else if (
				currentHand.length === 2 &&
				currentHand[0].getValue() === currentHand[1].getValue()
			) {
				cards.splice(cards.indexOf(currentHand[0]), 1);
				currentHand.shift();

				cards.splice(cards.indexOf(currentHand[0]), 1);
				currentHand.shift();

				pairs++;
			} else if (
				currentHand.length === 2 &&
				currentHand[0].getValue() !== currentHand[1].getValue()
			) {
				setTimeout(function () {
					currentHand[0]?.flip();
					currentHand[1]?.flip();

					currentHand.pop();
					currentHand.pop();
				}, 1000);
			}
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
