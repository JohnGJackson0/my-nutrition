import { db } from "../authentication/firebaseConfig";

//user.user.uid
export async function submitCalorieGoal(goal: number): Promise<number> {
  return new Promise((resolve, reject) => {
    const userId = db.app.auth().currentUser.uid;
    db.app
      .database()
      .ref("userStore/" + userId)
      .set({
        uid: userId,
        calorieGoal: goal,
      })
      .then(() => {
        resolve(goal);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export async function getCalorieGoal(uid: string): Promise<number> {
  return new Promise((resolve, reject) => {
    db.app
      .database()
      .ref("userStore/" + uid)
      .get()
      .then((snapshot) => {
        resolve(snapshot.val().calorieGoal);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
