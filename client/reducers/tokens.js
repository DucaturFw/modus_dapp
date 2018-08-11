import { TOKENS_LOAD, ERC20_LIST_LOAD, LOAD_COMPLETE } from './../constant/tokens';

const initialState = {
  loading: true,
  list: [],
  erc20: []
};

export default function accountReducer(state = initialState, action) {
  switch (action.type) {
    case TOKENS_LOAD: {
      return {
        ...state,
        list: action.payload.tokens
      };
    }
    case ERC20_LIST_LOAD: {
      return {
        ...state,
        erc20: action.payload.tokens
      };
    }
    case LOAD_COMPLETE: {
      return {
        ...state,
        loading: false
      };
    }
    default:
      return state;
  }
}
