class Player {
  constructor(direction, location, boardEdges) {
    this.direction = direction;
    this.location = location;
    this.prevLocation = [this.location - 1];
    this.queueDirection = this.direction;
    this.boardEdges = boardEdges;
  }

  setDirection(direction) {
    this.queueDirection = direction;
  }

  increaseSize() {
    this.prevLocation.unshift(this.location);
  }

  updateLocation(column, row) {
    this.direction = this.queueDirection;
    this.prevLocation.pop();
    this.prevLocation.unshift(this.location);
    const onBorder = this.handleMovementOffGrid(this.location, this.direction);
    this.location =
      this.location +
      this.handleMovement(this.direction, column, row, onBorder);
  }

  handleMovement(direction, column, row, isOnBorder) {
    const borderMovementKey = {
      Right: -column + 1,
      Left: column - 1,
      Up: column * row - column,
      Down: -(column * row - column),
    };
    const movementKey = {
      Right: 1,
      Left: -1,
      Up: -column,
      Down: column,
    };

    if (isOnBorder === this.direction) {
      return borderMovementKey[direction];
    } else {
      return movementKey[direction];
    }
  }

  handleMovementOffGrid(playerLocation, direction) {
    let borderSide = null;
    this.boardEdges.forEach((border) => {
      border.borderLocation.forEach((edge) => {
        if (edge === playerLocation) {
          if (border.border === direction) {
            borderSide = border.border;
          }
        }
      });
    });
    return borderSide;
  }
}

export default Player;
