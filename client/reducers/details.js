import { DETAIL_CREATE } from './../constant/details';

const initialState = {
  created: null
};

export default function accountReducer(state = initialState, action) {
  switch (action.type) {
    case DETAIL_CREATE: {
      return {
        ...state,
        created: action.payload
      };
    }
    default:
      return state;
  }
}
