const EC = require('elliptic').ec;
const uuidv1 = require('uuid');
const ec = new EC('secp256k1');

class ChainUtil {
    static genkeyPair() {
        return ec.genKeyPair();
    }

    static id() {
        return uuidv1();
    }
}

module.exports = ChainUtil;