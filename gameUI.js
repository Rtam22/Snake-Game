class GameUI {
  constructor(playerLocation, playePrevLocations, playerSize) {
    this.playerLocation = playerLocation;
    this.playePrevLocations = playePrevLocations;
    this.playerSize = playerSize;
  }

  updatePlayerLocation(location, prevLocation) {
    this.playerLocation = location;
  }

  updatePlayerSize() {}

  addPlayerToBoard() {
    const player = document.createElement("div");
    player.classList.add("player-main");
    console.log(this.playerLocation);
    const boardTiles = Array.from(document.querySelectorAll(".grid-box"));
    const currentLocation = boardTiles.find(
      (tile) => this.playerLocation.toString() === tile.id
    );

    currentLocation.appendChild(player);
  }
}

export default GameUI;
