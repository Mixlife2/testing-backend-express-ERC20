const Web3 = require('web3').default; 
const contractABI = require('../ERC20Token/artifacts/contracts/ERC20Token.sol/ERC20Token.json').abi;
const contractAddress = '0x5FC8d32690cc91D4c39d9d3abcBD16989F875707';

const web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));

const tokenContract = new web3.eth.Contract(contractABI, contractAddress);

exports.getBalance = async (address) => {
    try {
        const balance = await tokenContract.methods.balanceOf(address).call();
        return web3.utils.fromWei(balance, 'ether');
    } catch (error) {
        console.error('Error al obtener el balance:', error);
        throw error;
    }
};

exports.transferTokens = async (from, to, amount, privateKey) => {
    try {
        const amountInWei = web3.utils.toWei(amount.toString(), 'ether');
        const nonce = await web3.eth.getTransactionCount(from);
        const gasPrice = await web3.eth.getGasPrice();
        const gasLimit = await tokenContract.methods.transfer(to, amountInWei).estimateGas({ from });

        const tx = {
            from,
            to: contractAddress,
            nonce,
            gasPrice,
            gasLimit,
            data: tokenContract.methods.transfer(to, amountInWei).encodeABI()
        };

        const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);
        const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

        return receipt;
    } catch (error) {
        console.error('Error al transferir tokens:', error);
        throw error;
    }
};