const req = require('express/lib/request');
const ChainUtil = require('../chain-util');
const Transaction = require('./transaction');

const { INITIAL_BALANCE } = require('../config');

class Wallet {
    constructor() {
        this.balance = INITIAL_BALANCE;
        this.keyPair = ChainUtil.genkeyPair();
        this.publicKey = this.keyPair.getPublic().encode('hex');
    }

    toString() {
        return `Wallet - 
        publicKey   : ${this.publicKey.toString()}
        balance     : ${this.balance}`
    }

    sign(dataHash) {
        return this.keyPair.sign(dataHash);
    }

    createTransaction(recipient, amount, transactionPool) {
        if (amount > this.balance) {
            console.log(`Amount: ${amount} exceeds the current balance`);
            return;
        }

        let transaction = transactionPool.existingTransaction(this.publicKey);

        if(transaction) {
            transaction.update(this, recipient, amount);
        } else {
            transaction = Transaction.newTransaction(this, recipient, amount);
            transactionPool.updateOrAddTransaction(transaction);
        }
        return transaction;
    }

    calculateBalance(blockchain) {
        let balance = this.balance;
        let transactions = [];
        blockchain.chain.forEach(block => block.data.forEach(transaction => {
            transaction.push(transaction)
        }));

        const walletInputTransactions = transactions
        .filter(transaction => transaction.input.address === this.publicKey);

        let startTime = 0;

        if (walletInputTransactions.length > 1) {
            const recentInputTransaction = walletInputTransactions.reduce(
                (prev, current) => prev.input.timestamp > current.input.timestamp ? prev : current
        );

        balance = recentInputTransaction.outputs.find(output => output.address === this.publicKey).amount;
        startTime = recentInputTransaction.input.timestamp;
    }
        transactions.forEach(transaction => {
            if (transactions.input.timestamp > startTime) {
                transactions.outputs.find(output => {
                    if(output.address === this.publicKey) {
                        balance += output.amount;
                    }
                })
            }
        });
        return balance
    }

    static blockchainWallet() {
        const blockchainWallet = new this();
        blockchainWallet.address = 'blockchain-wallet';
        return blockchainWallet;
    }

}

module.exports = Wallet;