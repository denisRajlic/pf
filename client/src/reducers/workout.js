import {
  CREATE_WORKOUT,
  WORKOUT_FAIL,
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
      };
    default:
      return state;
  }
}
