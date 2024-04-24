window.onload = function () {
  let winCombinations = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
  ];

  let combinations = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  let countClick = 0;

  let isClicked = [
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ];

  const symbol = document.getElementById("symbol");
  const cells = document.querySelectorAll(".cell");
  const restart = document.getElementById("restart");
  const overlay = document.getElementById("overlay");

  function isWinX() {
    for (elem of winCombinations) {
      if (
        combinations[elem[0] - 1] == "X" &&
        combinations[elem[1] - 1] == "X" &&
        combinations[elem[2] - 1] == "X"
      )
        return setTimeout(win, 100, "Win X!");
    }
    return false;
  }

  function isWinO() {
    for (elem of winCombinations) {
      if (
        combinations[elem[0] - 1] == "O" &&
        combinations[elem[1] - 1] == "O" &&
        combinations[elem[2] - 1] == "O"
      )
        return setTimeout(win, 100, "Win O!");
    }
    return false;
  }

  function isDraw() {
    if (!(isWinX() || isWinO()) && countClick == 9) {
      setTimeout(win, 100, "It's draw!");
    }
  }

  function win(result) {
    overlay.classList.add("overlay-on");
    overlay.innerText = result;
    restart.classList.add("restart-game-over");
  }

  function changeValue(cell, indexCell) {
    cell.innerText = symbol.innerText;
    combinations[indexCell - 1] = symbol.innerText;
    cell.className = "cell-deactive";
    countClick++;

    switchSymbol();
    isWinX();
    isWinO();
    isDraw();
  }

  cells.forEach((cell, index) => {
    cell.onclick = function () {
      let indexCell = index + 1;
      if (!isClicked[index]) {
        changeValue(this, indexCell);
      }
      isClicked[index] = true;
    };
  });

  let symbols = ["O", "X"];
  switchSymbol = function () {
    let char = symbols.shift();
    symbol.innerText = char;
    symbols.push(char);
  };

  function restartGame() {
    for (let i = 1; i <= cells.length; i++) {
      cells[i - 1].className = `cell cell-${i}`;
      cells[i - 1].innerText = "";
      isClicked[i - 1] = false;
    }

    symbol.innerText = "X";
    symbols = ["O", "X"];

    combinations = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    countClick = 0;

    overlay.classList.remove("overlay-on");
    restart.classList.remove("restart-game-over");
  }

  restart.onclick = function () {
    restartGame();
  };
};
