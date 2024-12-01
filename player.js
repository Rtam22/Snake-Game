class Player {
  constructor(direction, location, handleMoveOffGrid, calculateMovement) {
    this.direction = direction;
    this.location = location;
    this.prevLocation = [];
    this.handleMoveOffGrid = handleMoveOffGrid;
    this.calculateMovement = calculateMovement;
  }

  setDirection(direction) {
    this.direction = direction;
  }

  increaseSize() {
    this.prevLocation.unshift(this.location);
  }

  updateLocation(column, row) {
    if (this.prevLocation.length > 0) {
      this.prevLocation.pop();
      this.prevLocation.unshift(this.location);
    }
    const onBorder = this.handleMoveOffGrid(this.location);
    this.location =
      this.location +
      this.calculateMovement(this.direction, column, row, onBorder);
  }
}

export default Player;
