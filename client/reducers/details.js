import { DETAIL_CREATE, BET_LOAD, BET_PUSH, LOT_PUSH, LOT_LOAD } from './../constant/details';

const initialState = {
  created: null,
  bet: [],
  lot: []
};

export default function accountReducer(state = initialState, action) {
  switch (action.type) {
    case DETAIL_CREATE: {
      return {
        ...state,
        created: action.payload
      };
    }
    case BET_LOAD: {
      return {
        ...state,
        bet: action.payload
      };
    }
    case BET_PUSH: {
      return {
        ...state,
        bet: [...state.bet, action.payload]
      };
    }
    case LOT_PUSH: {
      return {
        ...state,
        lot: [...state.lot, action.payload]
      };
    }
    case LOT_LOAD: {
      return {
        ...state,
        lot: action.payload
      };
    }
    default:
      return state;
  }
}
