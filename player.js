class Player {
  constructor(direction, location, handleMovementOffGrid, handleMovement) {
    this.direction = direction;
    this.location = location;
    this.prevLocation = [];
    this.handleMovementOffGrid = handleMovementOffGrid;
    this.handleMovement = handleMovement;
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
    const onBorder = this.handleMovementOffGrid(this.location);
    this.location =
      this.location +
      this.handleMovement(this.direction, column, row, onBorder);
  }
}

export default Player;
