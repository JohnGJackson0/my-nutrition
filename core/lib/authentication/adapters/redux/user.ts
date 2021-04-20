import { User } from "../../entities";
import { initialState, StateType } from "./state";

const SIGN_OUT = "user/signOut";
const UPDATE_USER = "user/update";

type StateSlice = StateType["user"];

export const createAction = (type, ...argNames) => {
  return (...args) => {
    let action = { type };
    argNames.forEach((arg, index) => {
      action[arg] = args[index];
    });
    return action;
  };
};

interface SignUpActionType {
  type: string;
  credential: Credential;
}

export interface ActionType {
  type: string;
}

interface SignInActionType {
  type: string;
  credential: Credential;
}

export interface UpdateUserActionType {
  type: string;
  user: User | null;
}

export const updateUserAction = (user: User | null): UpdateUserActionType => ({
  type: UPDATE_USER,
  user,
});

export const signOutAction = (): ActionType => ({
  type: SIGN_OUT,
});

export const userSelector = (state: StateType): StateSlice => state.user;

const updateHandler = (
  state: StateSlice,
  action: UpdateUserActionType
): StateType["user"] => {
  return action.user;
};

const signOutHandler = () => null;

export const userReducer = (
  state: StateSlice = initialState.user,
  action: UpdateUserActionType
): StateSlice => {
  switch (action.type) {
    case UPDATE_USER:
      return updateHandler(state, action);
    //case UPDATE_ERROR:
    //  return {
    //    ...state,
    //    error:action:error,
    //  }
    case SIGN_OUT:
      return signOutHandler();
    default:
      return state;
  }
};
