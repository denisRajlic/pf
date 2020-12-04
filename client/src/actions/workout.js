import axios from 'axios';
import setAlert from './alert';
import {
  CREATE_WORKOUT,
  WORKOUT_FAIL,
  WORKOUT_ERROR,
  GET_WORKOUTS,
} from './types';

// Create workout
export const createWorkout = ({
  title,
  isPublic,
  exercises,
}) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ title, isPublic, exercises });

  try {
    const res = await axios.post('/api/workouts', body, config);

    dispatch(setAlert('Workout Created', 'success'));

    dispatch({
      type: CREATE_WORKOUT,
      payload: res.data,
    });
  } catch (err) {
    const { errors } = err.response.data;

    if (errors) errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));

    dispatch({
      type: WORKOUT_FAIL,
    });
  }
};

// Get workouts by user ID
export const getWorkouts = () => async dispatch => {
  try {
    const res = await axios.get('/api/workouts');

    dispatch({
      type: GET_WORKOUTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: WORKOUT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
