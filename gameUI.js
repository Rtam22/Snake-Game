class GameUI {
  constructor(playerPrevLocations) {
    this.playerPrevLocations = playerPrevLocations;
    this.boardTiles = Array.from(document.querySelectorAll(".grid-box"));
  }

  clearPlayerFromBoard() {
    const mainHead = document.querySelector(".player-main");
    const body = document.querySelectorAll(".snake-body");
    if (mainHead) {
      mainHead.classList.remove("player-main");
    }
    if (body) {
      body.forEach((bodyPart) => {
        bodyPart.classList.remove("snake-body");
      });
    }
  }

  clearFoodFromBoard() {
    document.querySelector(".food").classList.remove("food");
  }

  updatePlayerLocation(location, prevLocations) {
    this.clearPlayerFromBoard();
    this.addPlayerToBoard(location, prevLocations);
  }

  updateFoodLocation(location) {
    this.clearFoodFromBoard();
    this.addFoodToBoard(location);
  }

  addPlayerToBoard(location, prevLocations) {
    const currentLocation = this.boardTiles.find(
      (tile) => location.toString() === tile.id
    );
    currentLocation.classList.add("player-main");

    if (prevLocations.length > 0) {
      prevLocations.forEach((prev) => {
        const tileFound = this.boardTiles.find(
          (tile) => prev.toString() === tile.id
        );
        tileFound.classList.add("snake-body");
      });
    }
  }

  addFoodToBoard(location) {
    const currentLocation = this.boardTiles.find(
      (tile) => location.toString() === tile.id
    );
    currentLocation.classList.add("food");
  }
}

export default GameUI;
