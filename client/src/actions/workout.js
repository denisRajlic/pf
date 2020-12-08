import axios from 'axios';
import setAlert from './alert';
import {
  CREATE_WORKOUT,
  WORKOUT_FAIL,
  WORKOUT_ERROR,
  GET_WORKOUTS,
  DELETE_WORKOUT,
  GET_WORKOUT,
} from './types';

// Create workout
export const createWorkout = ({
  title,
  isPublic,
  exercises,
  _id = null,
  edit = false,
}) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({
    title, isPublic, exercises, _id,
  });

  try {
    const res = await axios.post('/api/workouts', body, config);

    dispatch(setAlert(edit ? 'Workout Updated' : 'Workout Created', 'success'));

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

// Delete Workout
export const deleteWorkout = id => async dispatch => {
  if (window.confirm('Are you sure you want to delete this workout?')) {
    try {
      await axios.delete(`/api/workouts/${id}`);
      dispatch({
        type: DELETE_WORKOUT,
        payload: id,
      });

      dispatch(setAlert('Workout deleted', 'success'));
    } catch (err) {
      dispatch({
        type: WORKOUT_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  }
};

// Get Workout
export const getWorkout = id => async dispatch => {
  try {
    const res = await axios.get(`/api/workouts/${id}`);

    dispatch({
      type: GET_WORKOUT,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: WORKOUT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
