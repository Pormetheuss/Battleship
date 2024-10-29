import "./reset.css";
import "./style.css";
import "./player.js";
import hit_src from "./hitX.png";
import miss_src from "./missO.png";
import Gameboard from "./gameboard.js";
import Ship from "./ship.js";
import Player from "./player.js";

let board = Gameboard();
let player = Player("human", board);
let comp = Player("computer", board);

function randomizeShips() {
  // Reset the player's gameboard
  player.gameboard = Gameboard();

  let ships = [
    Ship(5, 0, false),
    Ship(4, 0, false),
    Ship(3, 0, false),
    Ship(3, 0, false),
    Ship(2, 0, false), // Adjusted length if needed
  ];

  // Keep track of occupied positions to avoid overlaps
  let occupiedPositions = [];

  ships.forEach((ship) => {
    let placed = false;
    while (!placed) {
      // Randomly choose orientation: true = horizontal, false = vertical
      let isHorizontal = Math.random() < 0.5;

      // Randomly select starting point
      let rowIndex = Math.floor(Math.random() * 10); // Rows 0-9
      let colIndex = Math.floor(Math.random() * 10); // Columns 0-9

      // Adjust starting point to ensure the ship fits on the board
      if (isHorizontal && colIndex + ship.length > 10) {
        colIndex = 10 - ship.length;
      } else if (!isHorizontal && rowIndex + ship.length > 10) {
        rowIndex = 10 - ship.length;
      }

      // Generate the positions the ship will occupy
      let positions = [];
      if (isHorizontal) {
        // For horizontal ships, positions are [letter, num], where letter is fixed, num varies
        let letter = indexToLetter(rowIndex);
        let nums = [];
        for (let i = 0; i < ship.length; i++) {
          let c = colIndex + i;
          positions.push([letter, c]);
          nums.push(c);
        }

        // Check for overlap
        let conflict = positions.some((pos) => {
          return occupiedPositions.some(
            (occ) => occ[0] === pos[0] && occ[1] === pos[1]
          );
        });

        if (!conflict) {
          // Build array in format ["letter", num1, num2, ...]
          let array = [letter, ...nums];
          player.gameboard.placeShip(ship, array);
          occupiedPositions.push(...positions);
          placed = true;
        }
      } else {
        // For vertical ships, positions are [letter, num], where num is fixed, letter varies
        let num = colIndex;
        let letters = [];
        for (let i = 0; i < ship.length; i++) {
          let r = rowIndex + i;
          let letter = indexToLetter(r);
          positions.push([letter, num]);
          letters.push(letter);
        }

        // Check for overlap
        let conflict = positions.some((pos) => {
          return occupiedPositions.some(
            (occ) => occ[0] === pos[0] && occ[1] === pos[1]
          );
        });

        if (!conflict) {
          // Build array in format [num, "letter1", "letter2", ...]
          let array = [num, ...letters];
          player.gameboard.placeShip(ship, array);
          occupiedPositions.push(...positions);
          placed = true;
        }
      }
    }
  });
}

function randomizeShipsOpp() {
  // Reset the player's gameboard
  comp.gameboard = Gameboard();

  // Array of ships to place
  let ships = [
    Ship(5, 0, false),
    Ship(4, 0, false),
    Ship(3, 0, false),
    Ship(3, 0, false),
    Ship(2, 0, false), // Adjusted length if needed
  ];

  // Keep track of occupied positions to avoid overlaps
  let occupiedPositions = [];

  ships.forEach((ship) => {
    let placed = false;
    while (!placed) {
      // Randomly choose orientation: true = horizontal, false = vertical
      let isHorizontal = Math.random() < 0.5;

      // Randomly select starting point
      let rowIndex = Math.floor(Math.random() * 10); // Rows 0-9
      let colIndex = Math.floor(Math.random() * 10); // Columns 0-9

      // Adjust starting point to ensure the ship fits on the board
      if (isHorizontal && colIndex + ship.length > 10) {
        colIndex = 10 - ship.length;
      } else if (!isHorizontal && rowIndex + ship.length > 10) {
        rowIndex = 10 - ship.length;
      }

      // Generate the positions the ship will occupy
      let positions = [];
      if (isHorizontal) {
        // For horizontal ships, positions are [letter, num], where letter is fixed, num varies
        let letter = indexToLetter(rowIndex);
        let nums = [];
        for (let i = 0; i < ship.length; i++) {
          let c = colIndex + i;
          positions.push([letter, c]);
          nums.push(c);
        }

        // Check for overlap
        let conflict = positions.some((pos) => {
          return occupiedPositions.some(
            (occ) => occ[0] === pos[0] && occ[1] === pos[1]
          );
        });

        if (!conflict) {
          // Build array in format ["letter", num1, num2, ...]
          let array = [letter, ...nums];
          comp.gameboard.placeShip(ship, array);
          occupiedPositions.push(...positions);
          placed = true;
        }
      } else {
        // For vertical ships, positions are [letter, num], where num is fixed, letter varies
        let num = colIndex;
        let letters = [];
        for (let i = 0; i < ship.length; i++) {
          let r = rowIndex + i;
          let letter = indexToLetter(r);
          positions.push([letter, num]);
          letters.push(letter);
        }

        // Check for overlap
        let conflict = positions.some((pos) => {
          return occupiedPositions.some(
            (occ) => occ[0] === pos[0] && occ[1] === pos[1]
          );
        });

        if (!conflict) {
          // Build array in format [num, "letter1", "letter2", ...]
          let array = [num, ...letters];
          comp.gameboard.placeShip(ship, array);
          occupiedPositions.push(...positions);
          placed = true;
        }
      }
    }
  });
}

// Helper function to convert row index to letter
function indexToLetter(index) {
  return String.fromCharCode(65 + index); // 65 is 'A' in ASCII
}

function randomAttack() {
  let x = Math.floor(Math.random() * 10 + 1);
  let y = Math.floor(Math.random() * 10);
  let letter;
  if (x == 1) {
    letter = "A";
  } else if (x == 2) {
    letter = "B";
  } else if (x == 3) {
    letter = "C";
  } else if (x == 4) {
    letter = "D";
  } else if (x == 5) {
    letter = "E";
  } else if (x == 6) {
    letter = "F";
  } else if (x == 7) {
    letter = "G";
  } else if (x == 8) {
    letter = "H";
  } else if (x == 9) {
    letter = "I";
  } else if (x == 10) {
    letter = "J";
  }
  for (let t = 0; t < player.gameboard.misses.length; t++) {
    if (
      player.gameboard.misses[t][0] == letter &&
      player.gameboard.misses[t][1] == y
    ) {
      return randomAttack();
    }
  }
  for (let t = 0; t < player.gameboard.hits.length; t++) {
    if (
      player.gameboard.hits[t][0] == letter &&
      player.gameboard.hits[t][1] == y
    ) {
      return randomAttack();
    }
  }
  return [letter, y];
}

function updateDOM(player, comp) {
  for (let i = 0; i < 10; i++) {
    Object.keys(player.gameboard).forEach((key) => {
      if (/^[A-Z]$/.test(key)) {
        // This regex matches single uppercase letters
        let square = document.querySelector(
          "." + key + " .square:nth-child(" + (i + 1) + ")"
        );
        if (player.gameboard[key][i] != undefined) {
          square.classList.add("green");
          for (let j = 0; j < player.gameboard.hits.length; j++) {
            if (
              player.gameboard.hits[j][0] == key &&
              player.gameboard.hits[j][1] == i
            ) {
              square.classList.remove("green");
              square.classList.add("red");
            }
          }
        } else {
          square.classList.remove("green");
          square.classList.remove("red");
          square.innerHTML = "";
          for (let t = 0; t < player.gameboard.misses.length; t++) {
            if (
              player.gameboard.misses[t][0] == key &&
              player.gameboard.misses[t][1] == i
            ) {
              let dot = document.createElement("img");
              dot.src = miss_src;
              dot.alt = "Miss marker";
              dot.style.marginLeft = "5px";
              dot.style.marginTop = "5px";
              dot.style.height = "25px";
              dot.classList.add("missMarker");
              square.appendChild(dot);
            }
          }
        }
      }
    });
    Object.keys(comp.gameboard).forEach((key) => {
      if (/^[A-Z]$/.test(key)) {
        let square = document.querySelector(
          ".computer." + key + " .square:nth-child(" + (i + 1) + ")"
        );
        square.classList.remove("green");
        square.classList.remove("red");
        square.innerHTML = "";
        if (comp.gameboard[key][i] != undefined) {
          for (let j = 0; j < comp.gameboard.hits.length; j++) {
            if (
              comp.gameboard.hits[j][0] == key &&
              comp.gameboard.hits[j][1] == i
            ) {
              let cross = document.createElement("img");
              cross.src = hit_src;
              cross.alt = "Hit marker";
              cross.style.marginLeft = "5px";
              cross.classList.add("hitMarker");
              square.appendChild(cross);
            }
          }
        } else {
          square.classList.remove("green");
          square.classList.remove("red");
          square.innerHTML = "";
          for (let t = 0; t < comp.gameboard.misses.length; t++) {
            if (
              comp.gameboard.misses[t][0] == key &&
              comp.gameboard.misses[t][1] == i
            ) {
              let dot = document.createElement("img");
              dot.src = miss_src;
              dot.alt = "Miss marker";
              dot.style.marginLeft = "5px";
              dot.style.marginTop = "5px";
              dot.style.height = "25px";
              dot.classList.add("missMarker");
              square.appendChild(dot);
            }
          }
        }
      }
    });
  }
}

for (let i = 0; i < 10; i++) {
  Object.keys(comp.gameboard).forEach((key) => {
    if (/^[A-Z]$/.test(key)) {
      let square = document.querySelector(
        ".computer." + key + " .square:nth-child(" + (i + 1) + ")"
      );
      square.addEventListener("click", function () {
        for (let t = 0; t < comp.gameboard.misses.length; t++) {
          if (
            comp.gameboard.misses[t][0] == key &&
            comp.gameboard.misses[t][1] == i
          ) {
            return;
          }
        }
        for (let t = 0; t < comp.gameboard.hits.length; t++) {
          if (
            comp.gameboard.hits[t][0] == key &&
            comp.gameboard.hits[t][1] == i
          ) {
            return;
          }
        }
        comp.gameboard.receiveAttack([key, i]);
        player.gameboard.receiveAttack(randomAttack());
        isGameOver();
        updateDOM(player, comp);
      });
    }
  });
}

updateDOM(player, comp);

let randomize = document.querySelector("button");

randomize.addEventListener("mousedown", function () {
  randomize.classList.add("down");
});
randomize.addEventListener("click", function () {
  randomizeShips();
  randomizeShipsOpp();
  updateDOM(player, comp);
});
randomize.addEventListener("mouseup", function () {
  randomize.classList.remove("down");
});

const closePopupButton = document.getElementById("closePopup");
const popupHead = document.querySelector(".popupHead");
function isGameOver() {
  if (comp.gameboard.allSunk() == true) {
    popup.style.display = "block";
    popupHead.style.color = "rgb(58, 234, 58)";
    popupHead.innerText = "You Won!!! :)";
    closePopupButton.addEventListener("click", () => {
      popup.style.display = "none";
      randomizeShips();
      randomizeShipsOpp();
      updateDOM(player, comp);
    });
  } else if (player.gameboard.allSunk() == true) {
    popup.style.display = "block";
    popupHead.style.color = "red";
    popupHead.innerText = "You Lost, The Computer Won :(";
    closePopupButton.addEventListener("click", () => {
      popup.style.display = "none";
      randomizeShips();
      randomizeShipsOpp();
      updateDOM(player, comp);
    });
  }
}
