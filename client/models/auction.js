import abi from './auctionAbi';

const contractAddress = '0x235b734cb7e0bd10513c8be5f2319a2360ae3d13';

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
