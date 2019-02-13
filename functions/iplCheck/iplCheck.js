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
//   a- Get the volume address
//   b- from volser info check if IPL Text is available
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

// * Test options
const options = require('../../config/options');

// * Check volser of L1 unit
let optionsVolume = options;
let l1 = '4502';

optionsVolume.body = {
	"cmd": `d u,,,${l1},1`
};

const main = async () => {
	let l1Volser = await sendCmd(optionsVolume).catch(e => e);
	console.log(l1Volser);
};

main().catch((e)=>{console.error(e)});
