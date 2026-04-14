import bwipjs from 'bwip-js';

export const generateQRCode = async (text) => {
  return new Promise((resolve, reject) => {
    bwipjs.toBuffer({
      bcid: 'qrcode',
      text: text,
      scale: 3,
      height: 10,
      width: 10,
      includetext: false,
    }, function (err, png) {
      if (err) {
        reject(err);
      } else {
        resolve(png);
      }
    });
  });
};
