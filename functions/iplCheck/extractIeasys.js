// PARMLIB, SYSPARM, request
// Use columns 1 through 71 to specify parameters. The system ignores columns 72 through 80.
// Leading blanks in records are acceptable. Therefore, a parameter need not start at column 1.
// Enter data in uppercase characters only; the system does not recognize lowercase characters.
// Use commas to separate multiple parameters in a record, but do not leave blanks between commas
// and subsequent parameters.
// Enclose multiple subparameters in parentheses. The number of subparameters is not limited.
// Indicate record continuation with a comma followed by at least one blank.
// Lines that begin with an asterisk in column 1 are comments.
// The system ignores anything after a comma followed by one or more blanks. You can use the remainder
// of the line for comments, as Figure 1 shows.
// Start of changeThe system considers the first record that does not end in a comma to be the end of
//  the member and ignores subsequent lines. You can use the remainder of the record, which contains
// the last parameter, for comments, providing there is at least one blank between the last parameter
// and the comments. You can also use additional lines after the last parameter for comments, as
// Figure 1 shows.End of change
// A minimum IEASYSxx member can be created by specifying a blank line as the only record. Blank
// lines can also be used in comments, after the last statement in the record. Otherwise, do not use
// blank lines within record specifications.

// const listDsnContent = require('../datasets/listDsnContent');
const ieasys = require('../../config/ieasysExample');
const tstIeasys = require('../../config/tstIEASYS');
const checkLength = require('../syntax/checkLength');
const checkBlankLine = require('../syntax/blankLine');
const checkUpperCase = require('../syntax/checkUpperCase');

// const tstAnswer = {};

const validate = (content) => {
  const arrIeasys = content.split('\n');

  for (let i = 0; i < arrIeasys.length; i++) {
    if (!(checkLength(arrIeasys[i]) && checkBlankLine(arrIeasys[i]) && checkUpperCase(arrIeasys[i]))) {
      console.log(`line ${i} with syntax error`);
    }

    // console.log(lengthLine);
  }
};

const getIEASYS = async () => {
  // const getIEASYS = async (options) => {
  // tstAnswer.ieasysContent = await listDsnContent(options);
  // validate(tstAnswer.ieasysContent);

  validate(ieasys.content);

  // console.log('IEASYS', ieasys.content);
};

getIEASYS(tstIeasys);
