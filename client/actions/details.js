import { DETAIL_CREATE } from './../constant/details';

import { getCreatedToken } from './../models';

const CreatedActions = {
  getHistory: id => (dispatch, getState) => {
    return getCreatedToken(id).then(data => {
      dispatch({
        type: DETAIL_CREATE,
        payload: data
      });
    });
  }
};
export default CreatedActions;
