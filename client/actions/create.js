import { createToken } from '../models';

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

    return createToken(address, stakes, amount)
      .then(result => {
        // console.log('result', result);
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
      });
  }
};
export default createActions;
