// ------------------------------------------------------------
//
//  Author:   William Pereira
//  Date:     02/11/2019
//  Function: This should check IPL flow and validate sintax
//            and requirements for a system IPL
//
// ------------------------------------------------------------
// How to use:
//
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

// * Test options
const options = require('../../config/options');

// * Check volser of L1 unit
let optionsVolume = options;
let l1 = { unit: '4502' };
let l2 = '451700M1';

optionsVolume.body = {
	cmd: `d u,,,${l1.unit},1`
};

// * Taking the answer and extracting only the volser
const extractVolser = volDisplay => {
	let rawAnswer = JSON.stringify(volDisplay);
	let reg = /3390[\w\s]+PRIV/g;
	let volserArray = reg.exec(rawAnswer);
	let volserString = volserArray[0];
	volserString = volserString.replace(/\s\s+/g, ' ');
	volserArray = volserString.split(' ');
	volserString = volserArray[2];

	return volserString;
};

//* Return true if SYS1.NUCLEUS are on volser and false if not
const checkNucleus = async volser => {
	optionsVolume.hlq = 'SYS1.NUCLEUS';
	optionsVolume.volume = volser;
	let request = await listDsn(optionsVolume);
	if (request.returnedRows > 0) return true;
	return false;
};

// * Load info from LOADnn
const checkLoadParm = async (l1, l2) => {
	let loadInfo = { unit: l2.substring(0, 4), load: l2.substring(4, 6),mLevel:l2.substring(6,8) };

	if (l1 === loadInfo.unit) {
		loadInfo.loadLocation = 'sys1.parmlib';
		loadInfo.volser = 'l1.volser';
	} else {
		optionsVolume.body = { cmd: `d u,,,${loadInfo.unit},1` };
		loadInfo.loadLocation = 'sys1.iplparm';
		let volDisplay = await sendCmd(optionsVolume).catch(e =>
			console.log(e)
		);
		loadInfo.volser = extractVolser(volDisplay);
	}

	// console.log('loadInfo :', loadInfo);
	return loadInfo;
};

const main = async () => {
	let volDisplay = await sendCmd(optionsVolume).catch(e => console.log(e));
	l1.volser = extractVolser(volDisplay);

	let isNucleusPresent = await checkNucleus(l1.volser).catch(e =>
		console.log('e :', e)
	);
	if (isNucleusPresent)
		console.log(
			`\n ** From L1 ${
				l1.unit
			} was possible to see that SYS1.NUCLEUS was on ${l1.volser} ** \n`
		);

	let loadInfo = await checkLoadParm(l1, l2);

	console.log('loadInfo :', loadInfo);
};

main().catch(e => {
	console.error(e);
});
