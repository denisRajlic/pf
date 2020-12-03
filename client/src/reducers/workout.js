import {
  CREATE_WORKOUT,
  WORKOUT_FAIL,
  GET_WORKOUT,
  GET_WORKOUTS,
  WORKOUT_ERROR,
} from '../actions/types';

const initialState = {
  workouts: [],
  workout: null,
  loading: true,
  error: {},
};

export default function workoutReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_WORKOUT:
      return {
        ...state,
        workout: payload,
        loading: false,
      };
    case GET_WORKOUTS:
      return {
        ...state,
        workouts: payload,
        loading: false,
      };
    case CREATE_WORKOUT:
      return {
        ...state,
        workouts: [payload, ...state.workouts],
        workout: payload,
        loading: false,
      };
    case WORKOUT_FAIL:
      return {
        ...state,
        payload,
        loading: false,
      };
    case WORKOUT_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
