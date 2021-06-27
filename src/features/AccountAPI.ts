import { FoodData } from "./addFoods/foodsAPI";
import { db } from "./authentication/firebaseConfig";

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

export class FoodLogState {
  food: FoodData;
  calories: number;

  constructor(food: FoodData, calories: number) {
    this.food = food;
    this.calories = calories;
  }
}

export async function logFoodState(
  foodStates: FoodLogState
): Promise<FoodLogState> {
  return new Promise((resolve, reject) => {
    const userId = db.app.auth().currentUser.uid;
    var newFoodKey = db.app
      .database()
      .ref()
      .child("foodStore/" + userId)
      .push().key;

    db.app
      .database()
      .ref("foodStore/" + userId + "/" + newFoodKey)
      .set(foodStates)
      .then(() => {
        resolve(foodStates);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export async function getFoodState(uid: string): Promise<Array<FoodLogState>> {
  return new Promise((resolve, reject) => {
    console.log("the uid ", uid);
    var result = [];
    db.app
      .database()
      .ref("foodStore/" + uid)
      .get()
      .then((snapshot) => {
        snapshot.forEach((snapshot) => {
          result.push(
            new FoodLogState(snapshot.val().food, snapshot.val().calories)
          );
        });

        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
