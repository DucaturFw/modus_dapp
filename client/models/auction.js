import abi from './auctionAbi';

const contractAddress = '0xb7140a87b2144732d9bd1d159c5c606f2b7e9ae2';

let contractInstance;

const init = localWeb3 => {
  if (!contractInstance) {
    contractInstance = new localWeb3.eth.Contract(abi, contractAddress);
  }

  return contractInstance;
};

export const getBetSubscriber = localWeb3 => {
  init(localWeb3);
  return contractInstance.events.CreateBet();
};

export const getLotSubscriber = localWeb3 => {
  init(localWeb3);
  return contractInstance.events.CreateLot();
};

export const getAuctionBetData = localWeb3 => {
  init(localWeb3);
  return contractInstance.getPastEvents('CreateBet', { fromBlock: 0, toBlock: 'latest' });
};

export const getAuctionLotData = localWeb3 => {
  init(localWeb3);
  return contractInstance.getPastEvents('CreateLot', { fromBlock: 0, toBlock: 'latest' });
};
