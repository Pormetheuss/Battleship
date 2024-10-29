function Gameboard() {
  return {
    A: new Array(10),
    B: new Array(10),
    C: new Array(10),
    D: new Array(10),
    E: new Array(10),
    F: new Array(10),
    G: new Array(10),
    H: new Array(10),
    I: new Array(10),
    J: new Array(10),
    misses: new Array(),
    hits: new Array(),

    placeShip(ship, array) {
      let hold = array[0];
      if (typeof hold == "string") {
        //Preform if first is string and rest are num
        for (let i = 1; i < array.length; i++) {
          for (let j = 0; j < this[hold].length; j++) {
            if (j == array[i]) {
              this[hold][j] = ship;
            }
          }
        }
      } else {
        //Preform if first is num and rest are letters
        for (let i = 1; i < array.length; i++) {
          let letter = array[i];
          this[letter][hold] = ship;
        }
      }
    },
    receiveAttack(array) {
      let hold = array[0];
      let num = array[1];
      if (this[hold][num] != undefined) {
        this[hold][num].hit();
        this.hits.push(array);
      } else {
        this.misses.push(array);
      }
    },
    allSunk() {
      const ships = [
        this.A,
        this.B,
        this.C,
        this.D,
        this.E,
        this.F,
        this.G,
        this.H,
        this.I,
        this.J,
      ];

      // Loop through each array and check each item
      for (let i = 0; i < 10; i++) {
        for (let ship of ships) {
          if (ship[i] != undefined && !ship[i].isSunk()) {
            return false;
          }
        }
      }
      return true;
    },
  };
}

export default Gameboard;
