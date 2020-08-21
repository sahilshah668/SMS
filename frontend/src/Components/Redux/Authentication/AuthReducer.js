import { AUTH_ACTIION_TYPES } from "./AuthAction";
import isEmpty from "../../utils/isEmpty";

const initialState = {
  authenticated: false,
  user: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
