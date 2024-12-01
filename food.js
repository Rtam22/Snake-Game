class Food {
  constructor() {
    this.location = 0;
  }

  generateFoodLocation(maxSize, playerLocation, playerTailLocation) {
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
      this.generateFoodLocation(gridSize, playerLocation, playerPrevLocation);
      console.log(this.location);
      updateFoodLocation(this.location);
    }
  }
}

export default Food;
