import { TOKENS_LOAD, ERC20_LIST_LOAD, LOAD_COMPLETE } from './../constant/tokens';

// import tokens from './mockTOKENS';
import erc20List from './mockERC20';

import { getAllTokens, getCreatedToken } from './../models';

const TokensActions = {
  load: () => (dispatch, getState) => {
    return new Promise((res, rej) => {
      getAllTokens()
        .then(tokens => {
          const erc20 = getState().tokens.erc20;

          return tokens.map(token => {
            const matchTokens = token.tokens.map((address, idx) => {
              const erc20Matched = erc20.find(item => item.address.toLowerCase() === address.toLowerCase());

              if (erc20Matched) {
                return {
                  address,
                  sign: erc20Matched.sign,
                  stake: token.parts[idx],
                  price: erc20Matched.price,
                  name: erc20Matched.name
                };
              }
            });
            return {
              tokenId: token.tokenId,
              tokens: matchTokens,
              stake: token.stake,
              holder: token.holder
            };
          });
        })
        .then(tokens => {
          console.log('tokens', tokens);
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
    return new Promise((res, rej) => {
      dispatch({
        type: LOAD_COMPLETE
      });

      res();
    });
  }
};
export default TokensActions;
