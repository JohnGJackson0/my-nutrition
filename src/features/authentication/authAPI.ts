import { User, Credential } from "./entities";
import { db } from "./firebaseConfig";

export async function resetPassword(email: string): Promise<String> {
  return new Promise((resolve, reject) => {
    db.app
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        resolve("A password reset email is sent to: " + email);
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
