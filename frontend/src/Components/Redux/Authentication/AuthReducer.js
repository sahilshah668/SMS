import { AUTH_ACTIION_TYPES } from "./AuthAction";
import isEmpty from "../../utils/isEmpty";

const initialState = {
  isAuthenticated: false,
  user: {},
  error:null
};

export default function (state = initialState, action) {
  switch (action.type) {
    case AUTH_ACTIION_TYPES.ON_LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated:!isEmpty(action.payload),
        user:action.payload
      }
    case AUTH_ACTIION_TYPES.ON_LOGIN_FAILURE:
      return {
        ...state,
        error:action.payload
      }
    default:
      return state;
  }
}
