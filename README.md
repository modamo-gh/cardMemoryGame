# Two Peas in a Pod

Demo: http://twopeasinapod.morganthemosaic.com

"Two Peas in a Pod" is a card matching game, developed as a submission to [Dev Jam](https://www.devjam.org/project/793b9a62-8d32-4ba7-b113-b2c5707ec3e9).

## Requirements

<ul>
  <li>User can see a grid with n x n cards (n is an integer). All the cards are faced down initially (hidden state)</li>
  <ul>
    <li>Once the user starts the game, they are presented with a 4 x 6 board</li>
  </ul>
	<li>User can click a button to start the game. When this button is clicked, a timer will start</li>
	<li>User can click on any card to unveil the image that is underneath it (change it to visible state). The image will be displayed until the user clicks on a 2nd card</li>
	<li>If there is a match, the 2 cards will be eliminated from the game (either hide/remove them or leave them in the visible state)</li>
	<ul>
		<li>When a pair is found, the matching pair disappears from the board</li>
	</ul>
	<li>If there isn't a match, the 2 cards will flip back to their original state (hidden state)</li>
	<li>When all the matches have been found, the User can see a dialog box showing a Congratulations message with a counter displaying the time it took to finish the game</li>
</ul>
