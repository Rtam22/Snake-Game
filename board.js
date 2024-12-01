class Board {
  constructor(boardCols, boardRows) {
    this.boardCols = boardCols;
    this.boardRows = boardRows;
    this.boardSize = this.boardCols * this.boardRows;
    this.boardEdges = [
      { border: "Up", borderLocation: [] },
      { border: "Down", borderLocation: [] },
      { border: "Left", borderLocation: [] },
      { border: "Right", borderLocation: [] },
    ];
    this.generateBoard();
  }

  mapBoardEdges() {
    let left = 1 - this.boardCols;
    let right = 0;
    for (let i = 0; i < this.boardCols; i++) {
      this.boardEdges[0].borderLocation.push(i + 1);
      this.boardEdges[1].borderLocation.unshift(this.boardSize - i);
    }
    for (let i = 0; i < this.boardRows; i++) {
      this.boardEdges[2].borderLocation.push((left += this.boardCols));
      this.boardEdges[3].borderLocation.push((right += this.boardCols));
    }
  }

  generateBoard() {
    for (let i = 0; i < this.boardSize; i++) {
      const divBox = document.createElement("div");
      divBox.classList.add("grid-box");
      divBox.setAttribute("id", i + 1);
      document.querySelector(".game-grid").appendChild(divBox);
    }
    this.mapBoardEdges();
  }
}

export default Board;
