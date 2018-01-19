// @flow

let minimumUpper = 1;
let minimumLower = 1;
let minimumNumbers = 2;

//TODO merge upper and lower case _count_ to char _check_ in range instead
//TODO use regex instead of parse per char

function checkPassword(password: string) {
  if (password.length < 6) {
    return {success: false, reason: 'Pass is less than 6 char.'};
  } else if (countLowerCase(password) < minimumLower) {
    return {
      success: false,
      reason: `Pass need at least ${minimumLower} lower case.`,
    };
  } else if (countUpperCase(password) < minimumUpper) {
    return {
      success: false,
      reason: `Pass need at least ${minimumUpper} upper case.`,
    };
  } else if (countNumbers(password) < minimumNumbers) {
    return {
      success: false,
      reason: `Pass need at least ${minimumNumbers} number(s).`,
    };
  } else {
    return {success: true, reason: 'Pass is okay, kind of.'};
  }
}

// Function to check whether inputted string has specified range of char like
// capitals or lower cases.
function checkCharInRange(
  string: string,
  minBound: string,
  maxBound: string,
  minCharAmount: number = 1,
) {
  let minCharCode = minBound.charCodeAt(0);
  let maxCharCode = maxBound.charCodeAt(0);
  let charAmount = 0;

  for (let i = 0; i < string.length; i++) {
    let charCode = string.charCodeAt(i);
    if (charCode >= minCharCode || charCode <= maxCharCode) {
      charAmount += 1;
    }
  }
  if (charAmount >= minCharAmount) {
    return true;
  } else {
    return false;
  }
}

function countLowerCase(string) {
  let chars = string.toLowerCase();
  let lowerCounter = 0;
  for (let char of chars) {
    if (string.includes(char)) {
      lowerCounter += 1;
    }
  }
  return lowerCounter;
}

function countUpperCase(string) {
  let chars = string.toUpperCase();
  let upperCounter = 0;
  for (let char of chars) {
    if (string.includes(char)) {
      upperCounter += 1;
    }
  }
  return upperCounter;
}

function countNumbers(string) {
  let chars = string.split('');
  let numberCounter = 0;
  for (let char of chars) {
    if (!global.isNaN(char)) {
      numberCounter += 1;
    }
  }
  return numberCounter;
}

export default checkPassword;
