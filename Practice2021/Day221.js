const { readFileSync } = require('fs');
// const contents = readFileSync("Practice2021/2021Day2TestInput.txt", 'utf-8').split(/\r?\s/)
const contents = readFileSync("Practice2021/Day221Input.txt", 'utf-8').split(/\r?\s/)

let position = { h: 0, d: 0 };

function switchCase(direction, value) {
  switch (direction) {
    case "forward" :
      position.h += value;
      break;
    case "down" :
      position.d -= value;
      break;
    case "up" :
      position.d += value;
      break;
  }
}

let direction;
let value;
for (let index = 0; index < contents.length; index++) {
  if (index % 2 == 0) {
    direction = contents[index];
    value = Number(contents[index + 1]);
    switchCase(direction, value);
  }
}
console.log(Math.abs(position.h * position.d))

position = { h: 0, d: 0, a: 0 };

function newSwitchCase(direction, value) {
  switch (direction) {
    case "forward" :
      position.h += value;
      position.a += 0;
      position.d += (value * position.a)
      break;
    case "down" :
      // position.d -= value;
      position.a += value;
      break;
    case "up" :
      // position.d += value;
      position.a -= value;
      break;
  }
}

direction = value = 0;
for (let index = 0; index < contents.length; index++) {
  if (index % 2 == 0) {
    direction = contents[index];
    value = Number(contents[index + 1]);
    newSwitchCase(direction, value);
  }
}

console.log(Math.abs(position.h * position.d))