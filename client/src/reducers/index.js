import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import workout from './workout';
import profile from './profile';

export default combineReducers({
  alert,
  auth,
  workout,
  profile,
});
