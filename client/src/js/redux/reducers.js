import { DUID_SET, DUID_LOAD } from './actions';

let duid;

export function userApi(state, action) {
  console.log(state, action);
  switch (action.type) {
    case DUID_SET:
      setDUID(action);
      break;
  }
  return Object.assign({}, state, action);
}

const setDUID = action=>{
  duid = action.duid;
}
