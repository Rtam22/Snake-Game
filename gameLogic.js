import Player from "/player.js";
import Board from "/board.js";
import GameUI from "/gameUI.js";
import Food from "/food.js";

class GameLogic {
  constructor() {
    this.column = 30;
    this.row = 30;
    this.board = new Board(this.column, this.row);
    this.player = new Player(
      "Right",
      465,
      this.handleMovementOffGrid.bind(this),
      this.handleMovement
    );
    this.gameUI = new GameUI();
    this.food = new Food();
    this.intervalId = null;
  }

  handleMovement(direction, column, row, isOnBorder) {
    const borderMovement = {
      Right: -column + 1,
      Left: column - 1,
      Up: column * row - column,
      Down: -(column * row - column),
    };
    const movement = {
      Right: 1,
      Left: -1,
      Up: -column,
      Down: column,
    };

    if (isOnBorder === this.direction) {
      return borderMovement[direction];
    } else {
      return movement[direction];
    }
  }

  handleMovementOffGrid(playerLocation, direction) {
    let borderSide = null;
    this.board.boardEdges.forEach((border) => {
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
          this.food.generateFoodLocation(
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
    }, 50);
  }

  startGame() {
    this.handleInterval();
  }

  restartGame() {
    clearInterval(this.intervalId);
  }

  initializeGame() {
    this.gameUI.addPlayerToBoard(
      this.player.location,
      this.player.prevLocation
    );
    this.assignControls();
    this.food.generateFoodLocation(
      this.column * this.row,
      this.player.location,
      this.player.prevLocation
    );
    this.gameUI.addFoodToBoard(this.food.location);
    document
      .getElementById("start-button")
      .addEventListener("click", () => this.startGame());
    document
      .getElementById("restart-button")
      .addEventListener("click", () => this.restartGame());
  }
}

const game = new GameLogic();
game.initializeGame();
