import Web3 from 'web3';

import { factoryCreateToken, factoryGetTokens, factoryGetStatuses, factoryGetSubscriber } from './factory';
import { getBetSubscriber, getLotSubscriber, getAuctionBetData, getAuctionLotData } from './auction';

let localWeb3, userAccount, auctionWeb3;

const AUCTION_PROVIDER_URL = 'ws://172.16.30.127:4267';

export const init = () => {
  return new Promise((res, rej) => {
    if (typeof web3 !== 'undefined') {
      auctionWeb3 = new Web3(new Web3.providers.WebsocketProvider(AUCTION_PROVIDER_URL));
      // eslint-disable-next-line
        // localWeb3 = new Web3(web3.currentProvider);
      localWeb3 = new Web3(window.multiWeb.getWeb3Provider());
      // eslint-disable-next-line
        // userAccount = web3.eth.defaultAccount;
      localWeb3.eth.getAccounts().then(accounts => {
        console.log(accounts);
        userAccount = accounts[0].toLowerCase();

        res();
      });
    } else {
      rej();
    }
  });
};
export const getAccount = () => {
  return userAccount;
};

export const createToken = (addr, stake, amount) => {
  return factoryCreateToken(localWeb3, userAccount)(addr, stake, amount);
};

export const getAllTokens = () => {
  return factoryGetTokens(localWeb3).then(events => {
    return events.map(({ returnValues: data }) => data);
  });
};

export const getCreatedToken = id => {
  return factoryGetTokens(localWeb3).then(events => {
    const event = events.find(ev => ev.returnValues.tokenId === id);

    return localWeb3.eth.getBlock(event.blockNumber).then(result => {
      return {
        timestamp: result.timestamp,
        transactionHash: event.transactionHash
      };
    });
  });
};

export const getHistoryStates = id => {
  return factoryGetStatuses(localWeb3, id);
};

export const getEventSubscriber = () => {
  return factoryGetSubscriber(localWeb3);
};

export const getAuctionEvents = () => {
  return getBetSubscriber(auctionWeb3);
};

export const getAuctionLotEvents = () => {
  return getLotSubscriber(auctionWeb3);
};

export const getBetData = () => {
  // let events;
  return getAuctionBetData(auctionWeb3);
  // .then(evnts => {
  //   events = event;

  //   return Promise.all(){}
  // })
};

export const getLotData = () => {
  return getAuctionLotData(auctionWeb3);
};
