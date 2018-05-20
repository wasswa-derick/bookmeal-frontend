import { GOT_MESSAGE } from "../reducers/constants";

export const gotMessage = data => ({
  type: GOT_MESSAGE,
  data
});

export const setMessage = message => dispatch => dispatch(gotMessage(message));
