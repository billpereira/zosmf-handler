// ------------------------------------------------------------
//
//  Author:   William Pereira
//  Date:     02/11/2019
//  Function: This should check IPL flow and validate sintax
//            and requirements for a system IPL
//
// ------------------------------------------------------------
// How to use:
// require('iplCheck')
// iplCheck({
//   hostname: 'host.ip',
//   auth: 'user:password',
//   l1: {unit: '9999'},
//   l2: {parm: '999900M1'},
// })
//   .then((res) => res)
//   .catch((e) => e);
// ------------------------------------------------------------
// 1- Check IPL Address
//   a- Get the volume address -> ok
//   b- from volser info check if IPL Text is available ??
//   c- check sys1.nucleus
//   d- read LOADPARM
//      - Search IODF
//          1-LOADxx in SYS0.IPLPARM
//            |
//            V
//            SYS9.IPLPARM
//          n-SYS1.IPLPARM

// * Import of needed modules
const sendCmd = require('../console/sendCmd');
const listDsn = require('../datasets/listDsn');
const listMembers = require('../datasets/listMembers');
const listDsnContent = require('../datasets/listDsnContent');

// * Test options
// const options = require('../../config/tstServer');

// * Check volser of L1 unit
// const optionsVolume = options;
// const l1 = {unit: '4502'};
// const l2 = '451700M1';

// * Taking the answer and extracting only the volser
const extractVolser = (volDisplay) => {
  const rawAnswer = JSON.stringify(volDisplay);
  const reg = /3390[\w\s]+PRIV/g;
  let volserArray = reg.exec(rawAnswer);
  let volserString = volserArray[0];
  volserString = volserString.replace(/\s\s+/g, ' ');
  volserArray = volserString.split(' ');
  volserString = volserArray[2];

  return volserString;
};

//* Return true if SYS1.NUCLEUS are on volser and false if not
const checkNucleus = async (volser, optionsVolume) => {
  optionsVolume.hlq = 'SYS1.NUCLEUS';
  optionsVolume.volume = volser;
  const request = await listDsn(optionsVolume);
  if (request.returnedRows > 0) return true;
  return false;
};

// * Load info from LOADnn
const checkIPLParm = async (loadInfo, optionsVolume) => {
  let results = '';
  let iplParm = '';
  for (let i = 0; i <= 9; i++) {
    iplParm = `SYS${i}.IPLPARM`;
    optionsVolume.pds = iplParm;
    results = await listMembers(optionsVolume);
    if (!results.rc) return iplParm;
  }
};

const checkLoadParm = async (l1, l2, optionsVolume) => {
  const loadInfo = {
    unit: l2.substring(0, 4),
    load: l2.substring(4, 6),
    mLevel: l2.substring(6, 8),
  };

  if (l1 === loadInfo.unit) {
    loadInfo.loadLocation = 'sys1.parmlib';
    loadInfo.volser = 'l1.volser';
  } else {
    optionsVolume.body = {cmd: `d u,,,${loadInfo.unit},1`};
    const volDisplay = await sendCmd(optionsVolume).catch((e) =>
      console.log(e)
    );
    loadInfo.loadLocation = await checkIPLParm(loadInfo, optionsVolume).catch(
        (e) => console.log(e)
    );
    loadInfo.volser = extractVolser(volDisplay);
  }
  return loadInfo;
};

const getLoad = async (loadInfo, optionsVolume) => {
  optionsVolume.pds = `${loadInfo.loadLocation}(LOAD${loadInfo.load})`;
  const load = await listDsnContent(optionsVolume);
  return load;
};

// options should have hostname, username, password, l1, l2
const iplCheck = async (options) => {
  console.log('1');

  const optionsVolume = options;
  const {l1} = optionsVolume;
  const {l2} = optionsVolume;

  optionsVolume.body = {
    cmd: `d u,,,${l1.unit},1`,
  };

  console.log('optionsVolume :', optionsVolume);
  const volDisplay = await sendCmd(optionsVolume).catch((e) => console.log(e));
  if (volDisplay.error) throw volDisplay;
  console.log('2');

  console.log('\n\nl2 :\n', l2);
  l1.volser = extractVolser(volDisplay);
  l1.isNucleusPresent = await checkNucleus(l1.volser, optionsVolume).catch(
      (e) => console.log('e :', e)
  );

  console.log('\n\nl1 :\n', l1);

  l2.loadInfo = await checkLoadParm(l1, l2.parm, optionsVolume).catch((e) =>
    console.log(e)
  );
  console.log('3');
  l2.content = await getLoad(l2.loadInfo, optionsVolume).catch((e) =>
    console.log(e)
  );

  console.log('\n\nl2 :\n', l2);

  return {l1, l2};
};

// main(options).catch((e) => {
//   console.error(e);
// });

module.exports = iplCheck;
