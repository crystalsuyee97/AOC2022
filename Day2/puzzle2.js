const { readFileSync } = require('fs');
const contents = readFileSync("Day2/input2.txt", 'utf-8').split(/\r?\s/)

let moves = { A: { score: 1 }, B: { score: 2 }, C: { score: 3 }, X: { score: 1 }, Y: { score: 2 }, Z: { score: 3 }};

function myLoss(myTotal, myScore) {
  return myTotal + myScore;
}
function draw(myTotal, myScore) {
  return myTotal + 3 + myScore;
}
function myWin(myTotal, myScore) {
  return myTotal + 6 + myScore;
}

let oppMoves = [];
let myMoves = [];
contents.forEach((move, index) => {
  if (index % 2 != 0) {
    myMoves.push(move);
  } else if (index % 2 == 0) {
    oppMoves.push(move);
  }
})

let myScore = 0;
let myTotal = 0;
let oppScore = 0;
for (let index = 0; index < myMoves.length; index++) {
  oppScore = moves[oppMoves[index]].score;
  myScore = moves[myMoves[index]].score;
  if (myScore == oppScore) {
    myTotal = draw(myTotal, myScore);
  } else {
    if (myScore === 1) {
      if (oppScore === 2) {
        myTotal = myLoss(myTotal, myScore);
      }
      if (oppScore === 3) {
        myTotal = myWin(myTotal, myScore);
      }
    } else if (myScore === 2) {
      if (myScore < oppScore) {
        myTotal = myLoss(myTotal, myScore);
      }
      if (myScore > oppScore) {
        myTotal = myWin(myTotal, myScore);
      }
    } else if (myScore === 3) {
      if (oppScore === 1) {
        myTotal = myLoss(myTotal, myScore);
      }
      if (oppScore === 2) {
        myTotal = myWin(myTotal, myScore);
      }
    }
  }
}
console.log(myTotal);

// when X means lose(+0), Y means draw(+3), Z means win(+6)
moves.X.score = 0;
moves.Y.score = 3;
moves.Z.score = 6;
console.log(moves)

let myNewTotal = 0;
let oppMoveScore;
let myStrategy;
for (let index = 0; index < oppMoves.length; index++) {
  oppMoveScore = moves[oppMoves[index]].score;
  myStrategy = moves[myMoves[index]].score;
  // if draw, match my move to opponent's move
  if (myStrategy === 3) {
    myNewTotal = draw(myNewTotal, oppMoveScore)
  }
  // if lose(X)
  if (myStrategy === 0) {
    // if opponent chooses rock(A), I have to choose scissors(C)
    // if opponent chooses paper(B), I have to choose rock(A)
    if (oppMoveScore === 1) {
      myNewTotal = myLoss(myNewTotal, 3);
    } else if (oppMoveScore > 1) {
      myNewTotal = myLoss(myNewTotal, oppMoveScore - 1);
    }
  }
  // if win(Z)
  if(myStrategy === 6) {
    // if opponent chooses rock(A), I have to choose paper(B)
    // if opponent chooses paper(B), I have to choose scissors(C)
    // if opponent chooses scissors(C), I have to choose rock(A)
    if (oppMoveScore === 3) {
      myNewTotal = myWin(myNewTotal, 1);
    } else if (oppMoveScore < 3) {
      myNewTotal = myWin(myNewTotal, oppMoveScore + 1);
    }
  }
}
console.log(myNewTotal)