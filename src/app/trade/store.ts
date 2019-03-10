import { tassign } from 'tassign';
import { FETCH_USERS, FETCH_USERS_START } from './actions';

export interface IUsersState {
  users: any[],
  loaded: Boolean
}

export const INITIAL_USERS_STATE: IUsersState = {
  users: [],
  loaded: false,
}

function getUsers(state, action) {
  return tassign(state, { users: action.users })
}

function isLoadingUsers(state, action) {
  return tassign(state, { loaded: true })
}




export function userReducer(state: IUsersState = INITIAL_USERS_STATE, action): IUsersState {
  switch (action.type) {
    case FETCH_USERS_START:
      return isLoadingUsers(state, action);
    case FETCH_USERS:
      return getUsers(state, action);
    default:
      break;
  }
  return state;
}