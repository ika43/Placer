import { IUsersState, INITIAL_USERS_STATE, userReducer } from './trade/store';
import { IApartmentState, INITIAL_APARTMENT_STATE, apartmentReducer } from './home/store';
import { combineReducers } from 'redux';


export interface IAppState {
  userStore: IUsersState,
  apartmentStore: IApartmentState,
  //propertiesStore: 
}

export const INITIAL_STATE: IAppState = {
  userStore: INITIAL_USERS_STATE,
  apartmentStore: INITIAL_APARTMENT_STATE
}

export const rootReducer = combineReducers({
  userStore: userReducer,
  apartmentStore: apartmentReducer
})