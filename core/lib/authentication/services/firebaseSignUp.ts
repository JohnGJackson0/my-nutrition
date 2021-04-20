import { SignUpService } from "../useCases";
import { Credential, User } from "../entities";
import { db } from "../config/config";

export class FirebaseLogin implements SignUpService {
  async signUpUser(user: User, credential: Credential): Promise<User> {
    var user: User;

    db.app
      .auth()
      .createUserWithEmailAndPassword(credential.email, credential.password)
      .then((authData) => {
        const account = {
          email: credential.email,
          uid: authData.user.uid,
          firstName: user.firstName,
          lastName: user.lastName,
        };
        db.app
          .database()
          .ref("users/" + authData.user.uid)
          .set({
            account,
          })
          .then(() => {
            db.app
              .database()
              .ref("users/" + authData.user.uid)
              .once("value")
              .then(function (snapshot) {
                snapshot.forEach(function (childSnapshot) {
                  var data = childSnapshot.val();
                  user = new User(data.firstName, data.lastName, data.email);
                });
              });
            return user;
          });
      });

    return user;
  }
}
