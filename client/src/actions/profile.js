import { api } from '../store';
import {
  GET_PROFILE,
  PROFILE_ERROR,
} from './types';

export const getProfile = () => async dispatch => {
  try {
    const res = await api.get('/profile');

    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
