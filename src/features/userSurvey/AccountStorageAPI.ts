import { db } from "../authentication/firebaseConfig";

export async function submitCalorieGoal(goal: number): Promise<number> {
  console.log("submit calorie goal ", goal);
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
        console.log("The user id is ", userId);
        resolve(goal);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export async function getCalorieGoal(): Promise<number> {
  return new Promise((resolve, reject) => {
    const userId = db.app.auth().currentUser.uid;
    db.app
      .database()
      .ref("userStore/" + userId)
      .get()
      .then((snapshot) => {
        resolve(snapshot.val().calorieGoal);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
