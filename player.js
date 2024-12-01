class Player {
  constructor(direction, location, handleMovementOffGrid, handleMovement) {
    this.direction = direction;
    this.location = location;
    this.prevLocation = [this.location - 1];
    this.handleMovementOffGrid = handleMovementOffGrid;
    this.handleMovement = handleMovement;
    this.queueDirection = this.direction;
  }

  setDirection(direction) {
    this.queueDirection = direction;
  }

  increaseSize() {
    this.prevLocation.unshift(this.location);
  }

  updateLocation(column, row) {
    this.direction = this.queueDirection;
    if (this.prevLocation.length > 0) {
      this.prevLocation.pop();
      this.prevLocation.unshift(this.location);
    }
    const onBorder = this.handleMovementOffGrid(this.location, this.direction);
    this.location =
      this.location +
      this.handleMovement(this.direction, column, row, onBorder);
  }
}

export default Player;
