// 1. The amount of money user wants to deposit in the sloth machine
// 2. Determine number of lines user wants to bet on
// 3. Collect a specified bet amount 
// 4. spin the slot machine
// 5. check if the user won
// 6. Give the user their wining 
// 7. Play again


//Step 1(To collect a deposit from the user we are going to create a function)
// A function is a reusable block of code that we can call to do something for us

 /*function deposit() {
 return 1
 }
 function is called by invoking the name/ it can also be initialized to a variable such as
 deposit() or var x = deposit();
*/

//we get user input through the package we installed known as prompt sync
const prompt = require("prompt-sync")(); // Importing the prompt-sync module to get user input

const ROWS = 3; // Number of rows in the symbol arrangement
const COLS = 3; // Number of columns in the symbol arrangement

const SYMBOLS_COUNT = { // Object that specifies the count of each symbol
  A: 2,
  B: 4,
  C: 6,
  D: 8,
};

const SYMBOL_VALUES = { // Object that specifies the value of each symbol
  A: 5,
  B: 4,
  C: 3,
  D: 2,
};



// The current way of writing functions(deposit is both a variable and a function) 
const deposit = () => {

    while (true) { // This a loop to ensure user keeps getting a prompt until valid inpiut is acquired

  const depositAmount = prompt("Enter a deposit amount: "); //since this is a string
  const numberDepositAmount = parseFloat(depositAmount); //convert the string to float and stores in variable

  //To check if user input is not a number we use if/else
  // isNaN means not a number || means OR operand
   if (isNaN(numberDepositAmount) || numberDepositAmount <= 0) {
    console.log("Invalid deposit amount, try again.");// while loop is invoked
   }
   
   else{
    return numberDepositAmount; // while loop is broken
   }
  }
};

  //const depositAmount = deposit(); //Displays output
  //console.log(depositAmount)

  //Step 2
  const getNumberOfLines = () => {
    while (true) { // This a loop 

        const lines = prompt("Enter the number of lines to bet on (1-3): ");
        const numberOfLines = parseFloat(lines); //convert the string to float

        //To check if user input is valid or between 3
        if (isNaN(numberOfLines) || numberOfLines <= 0 || numberOfLines > 3) {
            console.log("Invalid number of lines, try again."); // while loop is invoked
        }

        else {
            return numberOfLines; // while loop is broken
        }
    }
}
   //const numberOfLines = getNumberOfLines(); //Displays output
   //console.log(numberOfLines);


 //Step 3 ( The Amount user can bet is based on balance)
 const getBet = (balance, lines) => {

    while (true) { // This a loop 

        const bet = prompt("Enter the bet per line: ");
        const numberBet = parseFloat(bet); //convert the string to float
      
        //To check if user input is valid or between 3
         if (isNaN(numberBet) || numberBet <= 0 || numberBet > balance / lines) {
          console.log("Invalid bet, try again."); // while loop is invoked
         }
         else{
          return numberBet; // while loop is broken
         }
        }

 }
 // Function to simulate spinning the reels and generate a random arrangement of symbols
const spin = () => {
  const symbols = [];

  // Iterate over SYMBOLS_COUNT object to get symbols and their corresponding count
  for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)) {
    // Add the symbol to the symbols array 'count' number of times
    for (let i = 0; i < count; i++) {
      symbols.push(symbol);
    }
  }

  const reels = [];

  // Create an array for each reel and populate it with symbols
  for (let i = 0; i < COLS; i++) {
    reels.push([]);
    const reelSymbols = [...symbols];

    // Randomly select symbols from the reelSymbols array and push them into the current reel
    for (let j = 0; j < ROWS; j++) {
      const randomIndex = Math.floor(Math.random() * reelSymbols.length);
      const selectedSymbol = reelSymbols[randomIndex];
      reels[i].push(selectedSymbol);

      // Remove the selected symbol from the reelSymbols array to avoid duplication
      reelSymbols.splice(randomIndex, 1);
    }
  }

  return reels; // Return the generated arrangement of symbols on the reels
};

// Function to transpose the reels array to get the symbol arrangements by rows instead of columns
const transpose = (reels) => {
  const rows = [];

  // Iterate over the ROWS and COLS to create rows array and fill it with symbols from the reels array
  for (let i = 0; i < ROWS; i++) {
    rows.push([]);
    for (let j = 0; j < COLS; j++) {
      rows[i].push(reels[j][i]);
    }
  }

  return rows; // Return the symbol arrangements by rows
};

// Function to print the symbol arrangements row by row
const printRows = (rows) => {
  for (const row of rows) {
    let rowString = "";
    for (const [i, symbol] of row.entries()) {
      rowString += symbol;
      if (i != row.length - 1) {
        rowString += " | ";
      }
    }
    console.log(rowString);
  }
};

// Function to calculate the winnings based on the symbol arrangements, bet, and lines played
const getWinnings = (rows, bet, lines) => {
  let winnings = 0;

  // Iterate over the symbol arrangements row by row
  for (let row = 0; row < lines; row++) {
    const symbols = rows[row];
    let allSame = true;

    // Check if all symbols in the row are the same
    for (const symbol of symbols) {
      if (symbol != symbols[0]) {
        allSame = false;
        break;
      }
    }

    // If all symbols in the row are the same, calculate the winnings
    if (allSame) {
      winnings += bet * SYMBOL_VALUES[symbols[0]];
    }
  }

  return winnings; // Return the total winnings
};

// Main game function
const game = () => {
  let balance = deposit(); // Function to get the initial balance from the user

  while (true) {
    console.log("You have a balance of $" + balance);

    const numberOfLines = getNumberOfLines(); // Function to get the number of lines to play
    const bet = getBet(balance, numberOfLines); // Function to get the bet amount based on the balance and lines

    balance -= bet * numberOfLines; // Subtract the bet amount from the balance

    const reels = spin(); // Spin the reels and get the symbol arrangements
    const rows = transpose(reels); // Transpose the symbol arrangements to rows

    printRows(rows); // Print the symbol arrangements

    const winnings = getWinnings(rows, bet, numberOfLines); // Calculate the winnings
    balance += winnings; // Add the winnings to the balance

    console.log("You won, $" + winnings.toString()); // Display the winnings

    if (balance <= 0) {
      console.log("You ran out of money!");
      break;
    }

    const playAgain = prompt("Do you want to play again (y/n)? "); // Ask the user if they want to play again

    if (playAgain != "y") break; // If the user does not want to play again, exit the game loop
  }
};

game(); // Start the game
