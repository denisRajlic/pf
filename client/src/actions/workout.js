import axios from 'axios';
import setAlert from './alert';
import {
  CREATE_WORKOUT,
  WORKOUT_FAIL,
} from './types';

// Create workout
export const createWorkout = ({
  title,
  isPublic,
  exercise,
}) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const exercises = [exercise];

  console.log(title);

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
