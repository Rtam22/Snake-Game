import Player from "/player.js";
import Board from "/board.js";
import GameUI from "/gameUI.js";
import Food from "/food.js";

class GameLogic {
  constructor() {
    this.column = 25;
    this.row = 25;
    this.board = new Board(this.column, this.row);
    this.player = new Player("Right", 338, this.board.boardEdges);
    this.gameUI = new GameUI();
    this.food = new Food();
    this.intervalId = null;
    this.overlay = document.querySelector(".overlay");
  }

  assignControls() {
    addEventListener("keydown", (e) => {
      switch (e.key) {
        case "ArrowRight":
          if (this.player.direction != "Left") {
            this.player.setDirection("Right", "Left");
          }
          break;
        case "ArrowLeft":
          if (this.player.direction != "Right") {
            this.player.setDirection("Left", "Right");
          }
          break;
        case "ArrowUp":
          if (this.player.direction != "Down") {
            this.player.setDirection("Up", "Down");
          }
          break;
        case "ArrowDown":
          if (this.player.direction != "Up") {
            this.player.setDirection("Down", "Up");
          }
          break;
        case "a":
          this.player.increaseSize();
          this.food.randomFoodLocation(
            this.column * this.row,
            this.player.location,
            this.player.prevLocation
          );
          break;
      }
    });
  }

  handleInterval() {
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
    }
    this.intervalId = setInterval(() => {
      this.player.updateLocation(this.column, this.row);
      this.gameUI.updatePlayerLocation(
        this.player.location,
        this.player.prevLocation
      );
      this.food.foodEatenCheck(
        this.row * this.column,
        this.player.location,
        this.player.prevLocation,
        this.player.increaseSize.bind(this.player),
        this.gameUI.updateFoodLocation.bind(this.gameUI)
      );
      this.deathCheck();
    }, 50);
  }

  deathCheck() {
    this.player.prevLocation.forEach((prev, index) => {
      if (prev === this.player.location && index != 0) {
        this.endGame();
      }
    });
  }

  startGame(type) {
    if (type === "restart") {
      this.player = new Player("Right", 338, this.board.boardEdges);
      this.gameUI.clearBoard();
      this.addFoodToGame();
    }
    this.handleInterval();
    this.overlay.classList.add("hidden");
  }

  endGame() {
    clearInterval(this.intervalId);
    this.overlay.classList.remove("hidden");
    document.getElementById("start-button").classList.add("hidden");
    document.getElementById("restart-button").classList.remove("hidden");
  }

  addFoodToGame() {
    this.food.randomFoodLocation(
      this.column * this.row,
      this.player.location,
      this.player.prevLocation
    );
    this.gameUI.addFoodToBoard(this.food.location);
  }

  initializeGame() {
    this.gameUI.addPlayerToBoard(
      this.player.location,
      this.player.prevLocation
    );
    this.assignControls();
    this.addFoodToGame();
    document
      .getElementById("start-button")
      .addEventListener("click", () => this.startGame("start"));
    document
      .getElementById("restart-button")
      .addEventListener("click", () => this.startGame("restart"));
  }
}

const game = new GameLogic();
game.initializeGame();
