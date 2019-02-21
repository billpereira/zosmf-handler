const ieasys = require('../../config/ieasysExample');

// const result = {};

const testLength = (item) => {
  if (item.length < 72) return true;
  return false;
};

const validate = (content) => {
  const arrIeasys = content.split('\n');
  for (let i = 0; i < arrIeasys.length; i++) {
    const field = arrIeasys[i].split('=');
    console.log(field);
    const a = { [field[0]]: field[1] };
    console.log(a);

    if (field[0].substring(0, 1) !== ' ') {
      console.log('novo parm');
    }
    const lengthLine = testLength(arrIeasys[i]);

    console.log(arrIeasys[i], lengthLine);
  }
};

validate(ieasys.content);
