class Player {
  constructor(size, direction, location) {
    this.size = 1;
    this.direction = "right";
    this.location = 1;
    this.prevLocation = [];
  }

  setDirection(direction) {
    this.direction = direction;
    console.log("Snake direction = " + this.direction);
  }

  increaseSize() {
    this.size += this.size;
  }

  updateLocation(column) {
    this.location =
      this.location + this.calculateMovement(this.direction, column);
    console.log(this.location);
  }

  calculateMovement(direction, column) {
    const movement = {
      Right: 1,
      Left: -1,
      Up: -column,
      Down: column,
    };
    return movement[direction];
  }
}

export default Player;
