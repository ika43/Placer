import { tassign } from 'tassign';
import { FETCH_APARTMENT, APARTMENT_FETCHED } from './actions';

export interface IApartmentState {
  apartments: any[],
  properties: any[],
  loaded: Boolean
}

export const INITIAL_APARTMENT_STATE: IApartmentState = {
  apartments: [],
  properties: [],
  loaded: false,
}

function getApartmentAndProperties(state, action) {
  return tassign(state, { apartments: action.apartments, properties: action.properties })
}

function isLoadingApartment(state, action) {
  return tassign(state, { loaded: true })
}

export function apartmentReducer(state: IApartmentState = INITIAL_APARTMENT_STATE, action): IApartmentState {
  switch (action.type) {
    case APARTMENT_FETCHED:
      return isLoadingApartment(state, action);
    case FETCH_APARTMENT:
      return getApartmentAndProperties(state, action);
    default:
      break;
  }
  return state;
}