import { SnapshotViewIOSComponent } from "react-native";
import { User, Credential, Email } from "./entities";
import { db } from "./firebaseConfig";

export async function resetPassword(email: Email): Promise<string> {
  return new Promise((resolve, reject) => {
    db.app
      .auth()
      .sendPasswordResetEmail(email.address)
      .then(() => {
        resolve(
          "Please check your a password reset email sent to: " + email.address
        );
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export async function signInUser(credential: Credential): Promise<User> {
  return new Promise((resolve, reject) => {
    db.app
      .auth()
      .signInWithEmailAndPassword(credential.email, credential.password)
      .then(function (firebaseUser) {
        return firebaseUser.user.uid;
      })
      .then((uid) => {
        db.ref("users/" + uid)
          .get()
          .then((snapshot) => {
            const user = new User(
              snapshot.val().firstName,
              snapshot.val().lastName,
              snapshot.val().email
            );
            resolve(user);
          })
          .catch((error) => {
            reject(error);
          });
      })
      .catch((error) => {
        reject(error);
      });
  });
}

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
          })
          .catch((error) => {
            reject(error);
          });
      })
      .catch((error) => {
        reject(error);
      });
  });
}
