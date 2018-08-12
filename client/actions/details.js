import { DETAIL_CREATE, BET_LOAD, BET_PUSH, LOT_LOAD, LOT_PUSH } from './../constant/details';

import { getCreatedToken } from './../models';

const CreatedActions = {
  getHistory: id => (dispatch, getState) => {
    return getCreatedToken(id).then(data => {
      dispatch({
        type: DETAIL_CREATE,
        payload: data
      });
    });
  },
  betPush: evnt => (dispatch, getState) => {
    dispatch({
      type: BET_PUSH,
      payload: evnt
    });
  },
  betLoad: data => (dispatch, getState) => {
    dispatch({
      type: BET_LOAD,
      payload: data
    });
  },
  lotPush: evnt => (dispatch, getState) => {
    dispatch({
      type: LOT_PUSH,
      payload: evnt
    });
  },
  lotLoad: data => (dispatch, getState) => {
    dispatch({
      type: LOT_LOAD,
      payload: data
    });
  }
};
export default CreatedActions;
