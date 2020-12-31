import {
 GET_PROFILE,
 PROFILE_ERROR,
}
  from '../actions/types';

const initialState = {
  profile: {},
  loading: true,
  error: {},
};

export default function authReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false
      };
    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
        profile: null
      };
    default:
      return state;
  }
}
