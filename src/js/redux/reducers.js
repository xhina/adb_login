import { combineReducers } from 'redux';
import { LOGIN, LOGOUT, CREATE } from './actions';

export function userApi(state, action) {
  switch (action.type) {
    case LOGIN:
      // login api
      action.accountType = Math.random(10);
      return Object.assign({}, action);
      break;
    case LOGOUT:
      // logout api
      break;
    case CREATE:
        // logout api
        break;
    default:
      break;
  }
}
