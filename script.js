const gameContainer = document.getElementById("game");
let card1 = null;
let card2 = null;
let checking = false;

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want to research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);
    
   
    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  
  }
}

let flippedArr = [];
function handleCardClick(event) {
  //Experiment
  if (checking) return;
  //
  let currentCard = event.target;
  //assign background color to target card
  currentCard.style.backgroundColor = currentCard.classList[0];

  //add cards to array and assign cards
  flippedArr.push(event.target);
  card1 = flippedArr[0];
  card2 = flippedArr[1];

  //Remove event listener to prevent same card click
  card1.removeEventListener('click', handleCardClick);
  
 //check for match
 if (card1 && card2) {
    checking = true;
  if (card1.style.backgroundColor === card2.style.backgroundColor) {
    flippedArr = [];
    card1.removeEventListener('click', handleCardClick);
    card2.removeEventListener('click', handleCardClick);
    checking = false;
  } else {
    flippedArr = [];
    card1.addEventListener('click', handleCardClick);
    setTimeout(unflip, 1000);
  }
}
  console.log("you just clicked", event.target);
}

//Remove color from cards if they don't match
function unflip() {
  card1.style.backgroundColor = '';
  card2.style.backgroundColor = '';
  card1 = null;
  card2 = null;
  checking = false;
}

// when the DOM loads
createDivsForColors(shuffledColors);



// 