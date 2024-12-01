class GameUI {
  constructor(playerPrevLocations) {
    this.playerPrevLocations = playerPrevLocations;
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

  updatePlayerLocation(location, prevLocations) {
    this.clearPlayerFromBoard();
    this.addPlayerToBoard(location, prevLocations);
  }

  addPlayerToBoard(location, prevLocations) {
    const boardTiles = Array.from(document.querySelectorAll(".grid-box"));
    const currentLocation = boardTiles.find(
      (tile) => location.toString() === tile.id
    );
    currentLocation.classList.add("player-main");

    if (prevLocations.length > 0) {
      prevLocations.forEach((prev) => {
        const tileFound = boardTiles.find(
          (tile) => prev.toString() === tile.id
        );
        tileFound.classList.add("snake-body");
      });
    }
  }
}

export default GameUI;
