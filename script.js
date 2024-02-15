const gameContainer = document.getElementById("game");


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

function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    const newDiv = document.createElement("div");
    newDiv.classList.add(color);
    newDiv.addEventListener("click", handleCardClick);
    gameContainer.append(newDiv);
  }
}

let tileOne = null;
let tileTwo = null;
let noClick = false;
let cardsFlipped = 0;
let clickCount = 0

//Main function
function handleCardClick(event) {
  clickCount++
  if (noClick) { return }
  if (event.target.classList.contains("flipped")) return;

  event.target.style.backgroundColor = event.target.classList.value;


  if (tileOne === null || tileTwo === null) { //if either one tile is null
    event.target.classList.add('flipped'); //add class flipped to the clicked tile.
    tileOne = tileOne || event.target; // tile one is either null or even.target once the event is regestered;
    tileTwo = event.target === tileOne ? null : event.target; // if tileOne is set, 
  }

  if (tileOne && tileTwo) { //if both tileOne and TileTwo are set and has value
    noClick = true; // user can still pick a tile

    if (tileOne.className === tileTwo.className) { // if user click the matching tile i.e tileOne and tileTwo are same
      cardsFlipped += 2;
      tileOne.removeEventListener("click", handleCardClick); //remove the click event from tileOne
      tileTwo.removeEventListener("click", handleCardClick); //remove the click event from tileTwo
      tileOne = null; //Set tileOne to null for getting new value;
      tileTwo = null; //Set tileTwo to null for getting new value;
      noClick = false; //Set noClick to false so user can click tiles again;
    } else { // if tileOne and tileTwo does not match:
      setTimeout(function () { // runs the following code with 1000ms of 1 second delay. 
        tileOne.style.backgroundColor = ""; //removes the backgroundColor of tileOne
        tileTwo.style.backgroundColor = ""; //removes the backgroundColor of tilewo
        tileOne.classList.remove("flipped");  //removes the class 'flipped' from tileOne
        tileTwo.classList.remove("flipped");  //removes the class 'flipped' from tiletwo
        tileOne = null; //Set tileOne to null for getting new value;
        tileTwo = null; //Set tileTwo to null for getting new value;
        noClick = false; // enables clicking tiles
      }, 1000);
    }
  }
  if (cardsFlipped === COLORS.length) alert(`game over!", "It took you ${clickCount} clicks to win `);

}



// when the DOM loads
createDivsForColors(shuffledColors);

