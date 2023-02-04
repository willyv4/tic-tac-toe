class TicTacToe {
  constructor(height = 3, width = 3) {
    this.height = height;
    this.width = width;
    this.makeBoard();
    this.makeHTMLBoard();
    this.currPlayer = 0;
    this.winCombos();
  }

  makeBoard() {
    this.board = Array.from({ length: this.height }, () => Array(this.width));
  }

  makeHTMLBoard() {
    let $board = $("#game");
    $board.empty();

    for (let y = 0; y < this.height; y++) {
      const $row = $("<tr>");

      for (let x = 0; x < this.width; x++) {
        const $cell = $("<td>");
        $cell.attr("id", `${y}-${x}`);

        $row.append($cell);
        $cell.on("click", this.handleClick.bind(this));
      }
      $board.append($row);
    }
  }

  handleClick(event) {
    console.log("working");

    // change between player one and player two
    this.currPlayer = (this.currPlayer + 1) % 2;
    console.log(`currPlayer: ${this.currPlayer}`);

    // update board
    const id = event.target.id.split("-");
    const row = parseInt(id[0]);
    const col = parseInt(id[1]);
    this.board[row][col] = this.currPlayer === 0 ? "X" : "O";
    console.log(`board: ${JSON.stringify(this.board)}`);

    // update UI
    $(event.target).text(this.board[row][col]);

    // check for win
    if (this.checkWinningCombination()) {
      const winner = this.currPlayer === 0 ? "Player 1" : "Player 2";
      console.log(`${winner} wins!`);
    }
  }

  checkWinningCombination() {
    const winningCombinations = [
      [
        [0, 0],
        [0, 1],
        [0, 2],
      ],
      [
        [1, 0],
        [1, 1],
        [1, 2],
      ],
      [
        [2, 0],
        [2, 1],
        [2, 2],
      ],
      [
        [0, 0],
        [1, 0],
        [2, 0],
      ],
      [
        [0, 1],
        [1, 1],
        [2, 1],
      ],
      [
        [0, 2],
        [1, 2],
        [2, 2],
      ],
      [
        [0, 0],
        [1, 1],
        [2, 2],
      ],
      [
        [2, 0],
        [1, 1],
        [0, 2],
      ],
    ];
    for (let i = 0; i < winningCombinations.length; i++) {
      const [a, b, c] = winningCombinations[i];
      console.log("a", a);
      console.log("b", b);
      console.log("c", c);
      const symbolA = this.board[a[0]][a[1]];
      const symbolB = this.board[b[0]][b[1]];
      const symbolC = this.board[c[0]][c[1]];

      if (symbolA && symbolA === symbolB && symbolA === symbolC) {
        console.log("true");
        return true;
      }
    }
    console.log("false");
    return false;
  }
}

new TicTacToe();

const myTic = new TicTacToe();
console.log(myTic.makeBoard());
console.log(myTic.handleClick());
