class GameUI {
  constructor(playerLocation, playePrevLocations, playerSize) {
    this.playerLocation = playerLocation;
    this.playePrevLocations = playePrevLocations;
    this.playerSize = playerSize;
  }

  updatePlayerLocation(location, prevLocation) {
    this.playerLocation = location;
    const mainHead = document.querySelector(".player-main");
    if (mainHead) {
      mainHead.classList.remove("player-main");
    }
    this.addPlayerToBoard();
  }

  updatePlayerSize() {}

  addPlayerToBoard() {
    const boardTiles = Array.from(document.querySelectorAll(".grid-box"));
    const currentLocation = boardTiles.find(
      (tile) => this.playerLocation.toString() === tile.id
    );
    currentLocation.classList.add("player-main");
  }
}

export default GameUI;
