import Player from "/player.js";
import Board from "/board.js";
import GameUI from "/gameUI.js";

class GameLogic {
  constructor() {
    this.column = 30;
    this.row = 30;
    this.startButton = document.getElementById("start-button");
    this.restartButton = document.getElementById("restart-button");
    this.board = new Board(this.column, this.row);
    this.player = new Player(
      1,
      "Right",
      465,
      this.handleMoveOffGrid.bind(this),
      this.calculateMovement
    );
    this.gameUI = new GameUI(
      this.player.location,
      this.player.prevLocation,
      this.player.playerSize
    );
    this.assignControls();
    this.intervalId = null;
  }

  calculateMovement(direction, column, row, isOnBorder) {
    console.log(-(column * row - column));
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

  handleMoveOffGrid(playerLocation) {
    let borderSide = null;
    this.board.boardEdges.forEach((border) => {
      border.borderLocation.forEach((edge) => {
        if (edge === playerLocation) {
          borderSide = border.border;
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
            this.player.setDirection("Right");
          }
          break;
        case "ArrowLeft":
          if (this.player.direction != "Right") {
            this.player.setDirection("Left");
          }
          break;
        case "ArrowUp":
          if (this.player.direction != "Down") {
            this.player.setDirection("Up");
          }
          this.player.setDirection("Up");
          break;
        case "ArrowDown":
          if (this.player.direction != "Up") {
            this.player.setDirection("Down");
          }
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
      this.gameUI.updatePlayerLocation(this.player.location);
    }, 50);
  }

  startGame() {
    this.handleInterval();
  }

  restartGame() {
    clearInterval(this.intervalId);
  }

  initializeGame() {
    this.board.generateBoard();
    this.gameUI.addPlayerToBoard();
    this.startButton.addEventListener("click", () => this.startGame());
    this.restartButton.addEventListener("click", () => this.restartGame());
  }
}

const game = new GameLogic();
game.initializeGame();
