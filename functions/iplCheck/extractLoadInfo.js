const content = require('../../config/loadExample');

const extractLoadInfo = cont => {
  const arrCont = cont.split("\n");
  //   return arrCont;
  const IODF = {};
  let NUCLEUS = 1;
  const NUCLST = {};
  const SYSCAT = {};
  const PARMLIB = [];
  let SYSPARM = "";
  let IEASYM = "";
  for (let i = 0; i < arrCont.length; i++) {
    const str = arrCont[i];
    if (str.indexOf("IODF") > -1) {
      IODF.SUFFIX = str.substring(9, 11);
      IODF.HLQ = str.substring(12, 20).trim();
      IODF.SYSNAME = str.substring(21, 29).trim();
    }
    if (str.indexOf("NUCLEUS") > -1) {
      NUCLEUS = str.substring(9, 11).trim();
    }
    if (str.indexOf("NUCLST") > -1) {
      NUCLST.SUFFIX = str.substring(9, 11).trim();
      NUCLST.WaitState = str.substring(12, 13).trim() || "N";
    }
    if (str.indexOf("SYSCAT") > -1) {
      SYSCAT.VOLSER = str.substring(9, 15).trim();
      SYSCAT.Char = str.substring(15, 16).trim();
      SYSCAT.Alias = str.substring(16, 17).trim();
      SYSCAT.CAS = str.substring(17, 19).trim();
      SYSCAT.MCAT = str.substring(19).trim();
    }
    if (str.indexOf("PARMLIB") > -1) {
      PARMLIB.push(str.substring(9).trim());
    }
    if (str.indexOf("SYSPARM") > -1) {
      SYSPARM = str.substring(9).trim();
    }
    if (str.indexOf("IEASYM") > -1) {
      IEASYM = str.substring(9).trim();
    }
  }

  return { IODF, NUCLEUS, NUCLST, SYSCAT, SYSPARM, IEASYM, PARMLIB };
};

console.log('content :', extractLoadInfo(content.content));

// module.exports = extractLoadInfo;
