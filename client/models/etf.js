import abi from './etfAbi';

let contractInstance;

const init = (localWeb3, address) => {
  if (!contractInstance) {
    contractInstance = new localWeb3.eth.Contract(abi, address);
  }

  return contractInstance;
};

export const factoryGetETFTokens = (localWeb3, address) => {
  init(localWeb3, address);
  return contractInstance.methods.getRequest().call();
};
