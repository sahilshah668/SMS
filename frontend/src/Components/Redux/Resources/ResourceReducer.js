import { RESOURCE_ACTION_TYPES } from "./ResourceAction";
import { DATA_STATE } from "../dataState";

const initialState = {
  resources: null,
  error: null,
  dataState: DATA_STATE.NOT_INITIALIZED,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case RESOURCE_ACTION_TYPES.FETCHING:
      return {
        ...state,
        dataState: DATA_STATE.FETCHING,
      };
    case RESOURCE_ACTION_TYPES.RESOURCE_FETCH_SUCCESS:
      return {
        ...state,
        dataState: DATA_STATE.FETCH_SUCCESS,
        resources: action.payload,
      };
    case RESOURCE_ACTION_TYPES.RESOURCE_FETCH_FAILED:
      return {
        ...state,
        dataState: DATA_STATE.FETCH_FAILED,
        error: action.payload,
      };
    case RESOURCE_ACTION_TYPES.RESOURCE_UPDATE_SUCCESS:
      return {
        ...state,
        dataState:DATA_STATE.SEND_SUCCESS,
        resources:[...state.resources, action.payload]
      }
    default:
      return state;
  }
}
