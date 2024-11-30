class Player {
  constructor(size, direction, location, handleMoveOffGrid, calculateMovement) {
    this.size = size;
    this.direction = direction;
    this.location = location;
    this.prevLocation = [];
    this.handleMoveOffGrid = handleMoveOffGrid;
    this.calculateMovement = calculateMovement;
  }

  setDirection(direction) {
    this.direction = direction;
    console.log("Snake direction = " + this.direction);
  }

  increaseSize() {
    this.size += this.size;
  }

  updateLocation(column, row) {
    const onBorder = this.handleMoveOffGrid(this.location);
    console.log(onBorder);
    this.location =
      this.location +
      this.calculateMovement(this.direction, column, row, onBorder);
  }
}

export default Player;
