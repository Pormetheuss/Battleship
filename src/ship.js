function Ship(length, hits, sunk) {
  return {
    length,
    hits,
    sunk,
    hit() {
      this.hits++;
    },
    isSunk() {
      if (this.hits == this.length) {
        this.sunk = true;
        return true;
      } else {
        this.sunk = false;
        return false;
      }
    },
  };
}

export default Ship;
