"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const CryptoJS = __importStar(require("crypto-js"));
class Block {
    constructor(id, hash, previousHash, data, timestamp) {
        this.id = id;
        this.hash = hash;
        this.previousHash = previousHash;
        this.data = data;
        this.timestamp = timestamp;
    }
}
Block.calculateBlockHash = (id, previousHash, data, timestamp) => CryptoJS.SHA256(id + previousHash + data + timestamp).toString();
Block.validateStructure = (aBlock) => typeof aBlock.id === 'number' &&
    typeof aBlock.hash === 'string' &&
    typeof aBlock.previousHash === 'string' &&
    typeof aBlock.data === 'string' &&
    typeof aBlock.timestamp === 'number';
const genesisBlock = new Block(0, "2020202020", "", "hi!", 123456);
let blockchain = [genesisBlock];
const getBlockchain = () => blockchain;
const getLastBlock = () => blockchain[blockchain.length - 1];
const getTimestamp = () => Math.round(new Date().getTime() / 1000);
const createNewBlock = (data) => {
    const lastBlock = getLastBlock();
    const newId = lastBlock.id + 1;
    const newTimestamp = getTimestamp();
    const newHash = Block.calculateBlockHash(newId, lastBlock.hash, data, newTimestamp);
    const newBlock = new Block(newId, newHash, lastBlock.hash, data, newTimestamp);
    addBlock(newBlock);
    return newBlock;
};
//console.log(createNewBlock('hello there'), createNewBlock("bye"));
const getHashforBlock = (aBlock) => Block.calculateBlockHash(aBlock.id, aBlock.previousHash, aBlock.data, aBlock.timestamp);
const isBlockValid = (candidateBlock, lastBlock) => {
    if (!Block.validateStructure(candidateBlock)) {
        return false;
    }
    else if (lastBlock.id + 1 !== candidateBlock.id) {
        return false;
    }
    else if (lastBlock.hash !== candidateBlock.previousHash) {
        return false;
    }
    else if (getHashforBlock(candidateBlock) !== candidateBlock.hash) {
        return false;
    }
    return true;
};
const addBlock = (candidateBlock) => {
    if (isBlockValid(candidateBlock, getLastBlock())) {
        blockchain.push(candidateBlock);
    }
};
createNewBlock("2");
createNewBlock("3");
createNewBlock("4");
createNewBlock("5");
console.log(blockchain);
//https://www.udemy.com/course/typescript-blockchain/learn/lecture/28869932#overview
//# sourceMappingURL=index.js.map