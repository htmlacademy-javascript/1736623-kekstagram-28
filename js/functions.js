function checkStringLength(someString, strLength) {
  return someString.length <= strLength;
}

checkStringLength('12345678910111213141', 20);

function isPolindrom(someString) {
  let lowerString = someString.toLowerCase();
  lowerString = lowerString.replaceAll(' ', '');

  for (let i = 0, j = lowerString.length - 1; i < j; i++, j--) {
    if (lowerString[i] !== lowerString[j]) {
      return false;
    }
  }

  return true;
}

isPolindrom('ДовОд');
isPolindrom('Kekc');
isPolindrom('Лёша на полке клопа нашёл ');

function positivNumber (someString) {
  let finalnumber = ' ';
  let symbol;
  someString = someString.replaceAll(' ', '');

  for (let i = 0; i < someString.length; i++) {
    symbol = someString[i];
    symbol = Number(symbol);

    if (Number(symbol) !== 'NaN') {
      finalnumber += symbol;
      finalnumber = finalnumber.replaceAll('NaN', '');

      if (finalnumber.at(1) === '0') {
        finalnumber = finalnumber.replaceAll('0', '');
      }
      return finalnumber;
    }
  }

  return false;
}

positivNumber('2023 год');
positivNumber('ECMAScript 2022');
positivNumber('1 кефир, 0.5 батона');
positivNumber('агент 007');
positivNumber('а я томат');

function addString (someString, strLength, addedString) {
  someString = someString.padStart(strLength, addedString);
  return someString;
}

addString('1', 2, '0');
addString('1', 4, '0');
addString('q', 4, 'werty');
addString('q', 4, 'we');
addString('qwerty', 4, '0');
