import abi from './etfAbi';

export const factoryGetETFTokens = (localWeb3, address) => {
  let contractInstance = new localWeb3.eth.Contract(abi, address);
  return contractInstance.methods.getRequest().call();
};
