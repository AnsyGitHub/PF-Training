const PromptSync = require("prompt-sync");

const prompt = require("prompt-sync")();

const ROW = 3;
const COL = 3;

const SYMBOL_COUNT = {
  A: 2,
  B: 4,
  C: 6,
  D: 8,
};

const SYMBOL_VALUES = {
  A: 5,
  B: 4,
  C: 3,
  D: 2,
};

const spin = () => {
  let symbols = [];
  for (const [symbol, count] of Object.entries(SYMBOL_COUNT)) {
    for (let i = 0; i < count; i++) {
      symbols.push(symbol);
    }
  }
  let reels = [];
  for (let i = 0; i < COL; i++) {
    reels.push([]);
    let newReels = [...symbols];
    for (let j = 0; j < ROW; j++) {
      const randomIndex = Math.floor(Math.random() * newReels.length);
      reels[i].push(newReels[randomIndex]);
      newReels.splice(randomIndex, 1);
    }
  }
  return reels;
};

const deposit = () => {
  while (true) {
    const depositMoney = prompt("Hey, Enter some money: ");
    const numberDepositMoney = parseFloat(depositMoney);

    if (isNaN(numberDepositMoney) || numberDepositMoney <= 0) {
      console.log("Invalid amount entered, please try again");
    } else {
      return numberDepositMoney;
    }
  }
};

const numberOfLines = () => {
  while (true) {
    const lines = prompt("Hey, Enter the lines (1-3): ");
    const numberLines = parseFloat(lines);

    if (isNaN(numberLines) || numberLines <= 0 || numberLines > 3) {
      console.log("Invalid number, Choose between 1-3 ");
    } else {
      return numberLines;
    }
  }
};

const getBet = (depositMoney, lines) => {
  while (true) {
    const bet = prompt("Enter the bet: ");
    const numberBet = parseFloat(bet);
    if (
      isNaN(numberBet) ||
      numberBet <= 0 ||
      numberBet > depositMoney / lines
    ) {
      console.log("Invalid bet, Try again ");
    } else {
      return numberBet;
    }
  }
};

const transpose = (reels) => {
  const rows = [];
  for (let i = 0; i < ROW; i++) {
    rows.push([]);
    for (let j = 0; j < COL; j++) {
      rows[i].push(reels[j][i]);
    }
  }
  return rows;
};

const printReel = (rows) => {
  for (const row of rows) {
    let rowString = "";
    for (const [i, symbol] of row.entries()) {
      rowString += symbol;
      if (i < row.length - 1) {
        rowString += " | ";
      }
    }
    console.log(rowString);
  }
};
const getWin = (lines, bet, transposeRow) => {
  let win = 0;
  for (let i = 0; i < lines; i++) {
    const symbols = transposeRow[i];
    check = true;
    for (const symbol of symbols) {
      if (symbol != symbols[0]) {
        check = false;
        break;
      }
    }
    if (check) {
      win += bet * SYMBOL_VALUES[symbols[0]];
    }
  }
  return win;
};

const game = () => {
  let depositMoney = deposit();
  while (true) {
    const reels = spin();
    const transposeRow = transpose(reels);
    const lines = numberOfLines();
    const bet = getBet(depositMoney, lines);
    depositMoney -= lines * bet;
    printReel(transposeRow);
    const winning = getWin(lines, bet, transposeRow);
    depositMoney += winning;
    console.log(`You won ${winning.toString()}`);

    if (depositMoney <= 0) {
      console.log("You ran out of money");
      break;
    }
    console.log(`You have ${depositMoney} amount of money left. `);
    let permission = prompt("Want to play more? (Y/N): ");
    if (permission != "y") {
      break;
    }
  }
};
game();
