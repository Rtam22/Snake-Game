import Player from "/player.js";
import Board from "/board.js";
import GameUI from "/gameUI.js";

class GameLogic {
  constructor() {
    this.startButton = document.getElementById("start-button");
    this.restartButton = document.getElementById("restart-button");
    this.board = new Board(30, 30);
    this.player = new Player(1, "right", 465);
    this.gameUI = new GameUI(
      this.player.location,
      this.player.prevLocation,
      this.player.playerSize
    );
    this.assignControls();
    this.intervalId = null;
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

  handleAutoMovement() {
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
    }
    this.intervalId = setInterval(() => {
      console.log("1");
    }, 1000);
  }

  startGame() {
    this.handleAutoMovement();
  }

  restartGame() {
    this.handleAutoMovement();
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
