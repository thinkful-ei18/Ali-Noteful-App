'use strict';

// setTimeout(() => {
//   console.log('HEADS!');
// }, 1000);

function coinFlip(delay) {
  return new Promise((resolve, reject) => {
    const rand = Boolean(Math.round(Math.random()));
    setTimeout(function () {
      if (rand) {
        resolve('Heads!');
      } else {
        reject('Tails!');
      }
    }, delay);
  });
}

// coinFlip(500)
//   .then(res => {
//     console.log(1, res);
//     return coinFlip();
//   })
//   .then(res => {
//     console.log(2, res);
//     return coinFlip();
//   })
//   .then(res => {
//     console.log(3, res);
//     return 'You Win!';
//   })
//   .then(res => {
//     console.log(4, res);
//   })
//   .catch(err => {
//     console.error(err);
//   });

const coin1 = coinFlip(100).catch(err => err);
const coin2 = coinFlip(100).catch(err => err);
const coin3 = coinFlip(100).catch(err => err);

Promise.all([coin1, coin2, coin3])
  .then(array => {
    console.log(array);
  })
  .catch(err => {
    console.error(err);
  });
