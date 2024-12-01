class Food {
  constructor() {
    this.location = 0;
  }

  randomFoodLocation(maxSize, playerLocation, playerTailLocation) {
    let location = Math.floor(Math.random() * maxSize);
    while (
      this.foodSpawnOnPlayer(location, playerLocation, playerTailLocation)
    ) {
      location = Math.floor(Math.random() * maxSize);
    }
    this.location = location;
  }

  foodSpawnOnPlayer(location, playerLocation, playerTailLocation) {
    if (location === playerLocation) {
      return true;
    }
    return playerTailLocation.includes(location);
  }

  foodEatenCheck(
    gridSize,
    playerLocation,
    playerPrevLocation,
    increaseSize,
    updateFoodLocation
  ) {
    if (playerLocation === this.location) {
      increaseSize();
      this.randomFoodLocation(gridSize, playerLocation, playerPrevLocation);
      updateFoodLocation(this.location);
    }
  }
}

export default Food;
