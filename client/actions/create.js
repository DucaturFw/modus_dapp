import { createToken } from '../models';

import tokenActions from './tokens';

const createActions = {
  createToken: (tokensStake, amount) => (dispatch, getState) => {
    const erc20 = getState().tokens.erc20;
    const address = [],
      stakes = [];

    for (let i = 0; i < tokensStake.length; i++) {
      let token = erc20.find(tkn => tkn.sign === tokensStake[i].sign);

      address.push(token.address);
      stakes.push(tokensStake[i].stake);
    }

    setTimeout(() => {
      tokenActions
        .load()(dispatch, getState)
        .then(() => {
          window.history.pushState({ page: 'Detail' }, 'New ETF-Token', '/');
        });
    }, 60 * 1000);

    return createToken(address, stakes, amount)
      .then(result => {
        console.log('result', result);
        const {
          events: {
            NewToken: { address }
          }
        } = result;

        return {
          address
        };
      })
      .then(({ address }) => {
        console.log('newToken', address);
        tokenActions
          .load()(dispatch, getState)
          .then(() => {
            window.history.pushState({ page: 'Detail' }, 'New ETF-Token', `/${address}`);
          });
      });
  }
};
export default createActions;
