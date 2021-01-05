import { api } from '../store';
import setAlert from './alert';

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

export const createProfile = ({
  birthDate,
  weight,
  height,
  gender,
}) => async dispatch => {
  const body = { birthDate, weight, height, gender };

  try {
    const res = await api.post('/profile', body);

    dispatch(setAlert('Profile Created', 'success'));

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    const { errors } = err.response.data;

    if (errors) errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));

    dispatch({
      type: PROFILE_ERROR,
    });
  }

};
