import { combineReducers } from 'redux';
import { LOGIN, JOIN, DUID_SET, DUID_LOAD } from './actions';

let duid = "AAAA";

export function userApi(state, action) {
  switch (action.type) {
    case LOGIN:
      login(action);
      break;
    case JOIN:
      join(action);
      break;
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

const login = action=>{
  const aType = action.accountType;
  const id = action.id;
  const pw = action.pw;
}

const join = action=>{
  const aType = action.accountType;
  const id = action.id;
  const pw = action.pw;
}

const setDUID = action=>{
  duid = action.duid;
  localStorage.setItem('duid', action.duid);
  console.log("set duid : ", action.duid);
}

const loadDUID = action=>{
  let value = localStorage.getItem('duid');
  duid = value;
  action.duid = duid;
  console.log("load duid : ", duid);
}
