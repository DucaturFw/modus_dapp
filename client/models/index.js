import Web3 from 'web3';

import { factoryCreateToken, factoryGetTokens } from './factory';
import { factoryGetETFTokens } from './etf';

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

export const getETFToken = address => {
  // return factoryGetETFTokens(localWeb3, address).then(result => {
  //   return {
  //     address,
  //     tokens: result._tokens,
  //     stake: result._weights
  //   };
  // });
};

export const getAllETF = () => {
  // return getAllTokens().then(list => {
  //   return Promise.all(list.map(item => getETFToken(item.token)));
  // });
};
