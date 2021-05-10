import { isRejected } from "@reduxjs/toolkit";
import { User, Credential } from "./entities";
import { db } from "./firebaseConfig";

export async function signUpUser(
  user: User,
  credential: Credential
): Promise<User> {
  return new Promise((resolve, reject) => {
    db.app
      .auth()
      .createUserWithEmailAndPassword(credential.email, credential.password)
      .then((authData) => {
        db.app
          .database()
          .ref("users/" + authData.user.uid)
          .set({
            uid: authData.user.uid,
            email: credential.email,
            firstName: user.firstName,
            lastName: user.lastName,
          })
          .then(() => {
            resolve(user);
          });
      })
      .catch((error) => {
        reject(error);
      });
  });
}
