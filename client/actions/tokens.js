import { TOKENS_LOAD, ERC20_LIST_LOAD, LOAD_COMPLETE } from './../constant/tokens';

// import tokens from './mockTOKENS';
import erc20List from './mockERC20';

import { getAllETF } from './../models';

const TokensActions = {
  load: () => (dispatch, getState) => {
    return new Promise((res, rej) => {
      getAllETF()
        .then(tokens => {
          const erc20 = getState().tokens.erc20;

          return tokens.map(token => {
            const matchTokens = token.tokens.map((address, idx) => {
              const erc20Matched = erc20.find(item => item.address === address);

              return {
                address,
                sign: erc20Matched.sign,
                stake: token.stake[idx],
                price: erc20Matched.price
              };
            });

            return {
              address: token.address,
              tokens: matchTokens
            };
          });
        })
        .then(tokens => {
          dispatch({
            type: TOKENS_LOAD,
            payload: {
              tokens
            }
          });
          res(tokens);
        });
    });
  },
  loadERC20: () => (dispatch, getState) => {
    return new Promise((res, rej) => {
      dispatch({
        type: ERC20_LIST_LOAD,
        payload: {
          tokens: erc20List
        }
      });

      res(erc20List);
    });
  },
  loadComplete: () => (dispatch, getState) => {
    dispatch({
      type: LOAD_COMPLETE
    });
  }
};
export default TokensActions;
