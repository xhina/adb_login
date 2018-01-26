import { combineReducers } from 'redux';
import { DUID_SET, DUID_LOAD } from './actions';

let duid;

export function userApi(state, action) {
  switch (action.type) {
    case DUID_SET:
      setDUID(action);
      break;
    case DUID_LOAD:
      loadDUID(action);
      break;
    default:
      return state;
  }
  return Object.assign({}, state, action);
}

const setDUID = action=>{
  duid = action.duid;
  localStorage.setItem('duid', action.duid);
}

const loadDUID = action=>{
  let value = localStorage.getItem('duid');
  duid = value;
  action.duid = duid;
  console.log("duid : ", duid);
}
