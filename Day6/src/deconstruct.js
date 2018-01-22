let user = {
  parent: {
    mom: {
      name: 'Mom',
    },
    dad: {
      name: 'Dad',
    },
  },
};

//Without desctructuring
let daddy4 = user.parent.dad;

// Destructuring
let {parent: hisParrent} = user;
let {dad: daddy} = hisParrent;
// or one liner version
// Can't rename except for the last part in one liner
let {parent: {dad: daddy2}} = user;
console.log(daddy === daddy2 && daddy === daddy4);

let {...newParent} = user.parent;

daddy.name = 'Not your daddy';
console.log(user);

newParent.dad.name = 'Still your daddy';
console.log(user);

let arr = [[1, 2, 3], 4, [5], 6, 7];

//Using just comma to skip unwanted element in array when desctructuring
let [, secondValue, , fourthValue] = arr;
