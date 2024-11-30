import Player from "/player.js";
import Board from "/Board.js";

class GameLogic {
  constructor() {
    this.startButton = document.getElementById("start-button");
    this.restartButton = document.getElementById("restart-button");
    this.board = new Board(20, 20);
    this.player = new Player(1, "right", this.board.boardSize / 2);
    this.assignControls();
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

  startGame() {}

  restartGame() {}

  initializeGame() {
    this.board.generateBoard();
    this.startButton.addEventListener("click", this.startGame());
    this.restartButton.addEventListener("click", this.restartGame());
  }
}

const game = new GameLogic();
game.initializeGame();
