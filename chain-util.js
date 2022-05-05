const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

class ChainUtil {
    static genkeyPair() {
        return ec.genKeyPair();
    }
}

module.exports = ChainUtil;