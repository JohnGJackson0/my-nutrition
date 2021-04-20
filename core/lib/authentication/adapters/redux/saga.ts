import { all, put, takeLatest } from "redux-saga/effects";
import { Credential } from "../../entities";
import { updateUserAction } from "./user";
import { SignInInteractor, SignUpInteractor } from "../../useCases";
import { FirebaseLogin } from "../../services";

export const SIGN_IN = "user/saga/sign_in";
export const SIGN_UP = "user/saga/sign_up";

interface SignInActionType {
  type: string;
  credential: Credential;
}

interface SignUpActionType {
  type: string;
  firstName: string;
  lastName: string;
  credential: Credential;
}

export const signInAction = (credential: Credential): SignInActionType => ({
  type: SIGN_IN,
  credential,
});

export const signUpAction = (
  firstName: string,
  lastName: string,
  credential: Credential
): SignUpActionType => ({
  type: SIGN_UP,
  credential,
  firstName,
  lastName,
});

function* signInSaga(action: SignInActionType) {
  const { credential } = action;
  try {
    const service = new FirebaseLogin();
    const interactor = new SignInInteractor(service);

    const user = yield interactor.signIn(credential);
    yield put(updateUserAction(user));
  } catch (error) {
    console.error(error);
    // DO SOMETHING ELSE
  }
}

function* signUpSaga(action: SignUpActionType) {
  try {
    const { firstName, lastName, credential } = action;
    const service = new FirebaseLogin();
    const interactor = new SignUpInteractor(service);
    const user = yield interactor.signUp(firstName, lastName, credential);
    yield put(updateUserAction(user));
  } catch (error) {
    console.log("CAUGHT");
  }
}

export function* rootSaga() {
  yield all([takeLatest(SIGN_IN, signInSaga), takeLatest(SIGN_UP, signUpSaga)]);
}
