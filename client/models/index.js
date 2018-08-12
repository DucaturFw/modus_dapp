import Web3 from 'web3';

import { factoryCreateToken, factoryGetTokens, factoryGetStatuses } from './factory';

let localWeb3, userAccount;

export const init = () => {
  return new Promise((res, rej) => {
    if (typeof web3 !== 'undefined') {
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
