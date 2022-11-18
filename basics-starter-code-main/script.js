// Get a random index ranging from 0 (inclusive) to max (exclusive).
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

// Shuffle the elements in the cardDeck array
var shuffleCards = function (cardDeck) {
  // Loop over the card deck array once
  var currentIndex = 0;
  while (currentIndex < cardDeck.length) {
    // Select a random index in the deck
    var randomIndex = getRandomIndex(cardDeck.length);
    // Select the card that corresponds to randomIndex
    var randomCard = cardDeck[randomIndex];
    // Select the card that corresponds to currentIndex
    var currentCard = cardDeck[currentIndex];
    // Swap positions of randomCard and currentCard in the deck
    cardDeck[currentIndex] = randomCard;
    cardDeck[randomIndex] = currentCard;
    // Increment currentIndex
    currentIndex = currentIndex + 1;
  }
  // Return the shuffled deck
  return cardDeck;
};

var makeDeck = function () {
  // Initialise an empty deck array
  var cardDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  var suits = ["hearts", "diamonds", "clubs", "spades"];

  // Loop over the suits array
  var suitIndex = 0;
  while (suitIndex < suits.length) {
    // Store the current suit in a variable
    var currentSuit = suits[suitIndex];

    // Loop from 1 to 13 to create all cards for a given suit
    // Notice rankCounter starts at 1 and not 0, and ends at 13 and not 12.
    // This is an example of a loop without an array.
    var rankCounter = 1;
    while (rankCounter <= 13) {
      // By default, the card name is the same as rankCounter
      var cardName = rankCounter;
      var rank = rankCounter;
      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName == 1) {
        cardName = "ace";
        rank = 1;
      } else if (cardName == 11) {
        cardName = "jack";
        rank = 10;
      } else if (cardName == 12) {
        cardName = "queen";
        rank = 10;
      } else if (cardName == 13) {
        cardName = "king";
        rank = 10;
      }

      // Create a new card with the current name, suit, and rank
      var card = {
        name: cardName,
        suit: currentSuit,
        rank,
      };

      // Add the new card to the deck
      cardDeck.push(card);

      // Increment rankCounter to iterate over the next rank
      rankCounter += 1;
    }

    // Increment the suit index to iterate over the next suit
    suitIndex += 1;
  }

  // Return the completed card deck
  return cardDeck;
};

var gameState = "";
var myOutputValue = "";
var getShuffledDeck;
var playerHand = [];
var computerHand = [];
var playerHandTotal;
var computerHandTotal;

var playerOutputLineTwoCards = function () {
  myOutputValue = `${playerHand[0].Name}, ${playerHand[1]}`;
};

var computerOutputLineTwoCards = function () {
  myOutputValue = `${computerHand[0]}, ${computerHand[1]}`;
};

var firstDraw = function () {
  getShuffledDeck = shuffleCards(makeDeck());
  var playerFirstDraw = getShuffledDeck.pop();
  var computerFirstDraw = getShuffledDeck.pop();
  var playerSecondDraw = getShuffledDeck.pop();
  var computerSecondDraw = getShuffledDeck.pop();
  playerHand.push(playerFirstDraw, playerSecondDraw);
  computerHand.push(computerFirstDraw, computerSecondDraw);
  var playerHandTotal = sumOfPlayerHand();
  var computerHandTotal = sumOfComputerHand();
  myOutputValue = `Player drew: ${playerHand[0].name}, ${playerHand[1].name} <br>Sum = ${playerHandTotal}<br><br>Computer drew: ${computerHand[0].name}, ${computerHand[1].name} <br>Sum = ${computerHandTotal}`;
};

var sumOfPlayerHand = function () {
  var sum = 0;
  for (i = 0; i < playerHand.length; i++) {
    sum += playerHand[i].rank;
  }
  return sum;
};

var sumOfComputerHand = function () {
  var sum = 0;
  for (i = 0; i < computerHand.length; i++) {
    sum += computerHand[i].rank;
  }
  return sum;
};

var main = function (input) {
  if (gameState == "") {
    var getFirstDraw = firstDraw();
    playerHandTotal = sumOfPlayerHand();
    computerHandTotal = sumOfComputerHand();
    // if (playerHandTotal == 21) {
    //   return;
    // }
    myOutputValue += `</br><br> Please input "hit" or "stand" to continue`;
    gameState = "Hit or Stand";
  } else if (gameState == "Hit or Stand" && input == "hit") {
    var playerThirdDraw = getShuffledDeck.pop();
    playerHand.push(playerThirdDraw);
    playerHandTotal = sumOfPlayerHand();
    return `Player drew: ${playerHand[0].name}, ${playerHand[1].name}, ${playerHand[2].name}<br> 
    Sum = ${playerHandTotal}<br><br>Computer drew: ${computerHand[0].name}, ${computerHand[1].name}<br>
     Sum = ${computerHandTotal}<br><br>Please input "hit" or "stand" to continue`;
  } else myOutputValue = `Invalid input, please input "hit" or "stand"`;
  if (gameState == "Hit or Stand" && input == "stand") {
    if (computerHandTotal < 17) {
      var computerThirdDraw = getShuffledDeck.pop();
      computerHand.push(computerThirdDraw);
      computerHandTotal = sumOfComputerHand();
      return `Player sum = ${playerHandTotal}<br><br>Computer drew: ${computerHand[0].name}, ${computerHand[1].name}, ${computerHand[2].name}<br>Sum = ${computerHandTotal}`;
    } else
      return `Player sum = ${playerHandTotal}<br><br>Computer drew: ${computerHand[0].name}, ${computerHand[1].name}<br>Sum = ${computerHandTotal}`;
  }
  return myOutputValue;
};
