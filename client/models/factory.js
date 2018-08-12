import abi from './factoryAbi';

const contractAddress = '0x7371ea969af4bc5b8ac03cbd3dcbb654003a8ffe';

let contractInstance;

const init = localWeb3 => {
  if (!contractInstance) {
    contractInstance = new localWeb3.eth.Contract(abi, contractAddress);
  }

  return contractInstance;
};

export const factoryCreateToken = (localWeb3, userAccount) => (addr, stake, amount) => {
  init(localWeb3);

  return new Promise((res, rej) => {
    contractInstance.methods
      .createToken(addr, stake)
      .send({
        value: localWeb3.utils.toWei(amount.toString(), 'ether'),
        from: userAccount
      })
      .on('receipt', receipt => res(receipt))
      .on('error', error => rej(error));
  });
};

export const factoryGetTokens = localWeb3 => {
  init(localWeb3);
  return contractInstance.getPastEvents('NewToken', { fromBlock: 0, toBlock: 'latest' });
};
