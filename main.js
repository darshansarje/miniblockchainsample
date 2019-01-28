const SHA256 = require('crypto-js/sha256')
class Block{
    constructor(index, timestamp, data, previousHash = ''){
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculate();
        this.nonce = 0;
    }

    calculate(){
        return SHA256(this.index+this.previousHash+this.timestamp+JSON.stringify(this.data)+this.nonce).toString();
    }

    miningBlock(difficulty){
        while (this.hash.substring(0,difficulty) !== Array(difficulty+1).join(0)) {
            this.nonce ++ ;
            this.hash = this.calculate()
        }
         
        console.log("block mined",this.hash);
        
    }
}


class BlockChain{
    constructor(){
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 4;
        //console.log(JSON.stringify(this.chain));
    }

    createGenesisBlock(){
        return new Block(0,'01/01/2019',"Genesis Block", "0");
    }

    getLatestBlock(){
        return this.chain[this.chain.length-1];
    }

    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.miningBlock(this.difficulty);
        //newBlock.hash = newBlock.calculate();
        this.chain.push(newBlock);
    }

    checkValid(){
        for(let i =1; i<this.chain.length;i++){
            const current = this.chain[i];
            const previous = this.chain[i-1];

            if(current.hash !== current.calculate()){
                return false;
            }

            if(current.previousHash !== previous.hash){
                return false
            }
        }
        return true;
    }

}



let test = new BlockChain();

console.log("mining 1");

test.addBlock(new Block(1,"02/01/2019",{amount:10}));
console.log("mining 2")
test.addBlock(new Block(2,"03/01/2019",{amount:11}));
console.log("mining 3")
test.addBlock(new Block(3,"04/01/2019",{amount:12}));

//console.log(JSON.stringify(test,null,4));

//test.chain[3].data.amount = 16;


console.log(JSON.stringify(test,null,4));
console.log(test.checkValid())