import Axios from "axios";

const base = {
  url: "https://api.nal.usda.gov/fdc/v1",
  key: "Z8Ei3WuCifNrjYMkqdi2omkag0QuXlp6HRs91VrL",
};

export class Food {
  foodName: string;
  foodId: string;
  foodBrand: string;
  foodOwner: string;

  constructor(
    foodName: string,
    foodId: string,
    foodBrand: string,
    foodOwner: string
  ) {
    this.foodName = foodName;
    this.foodId = foodId;
    this.foodBrand = foodBrand;
    this.foodOwner = foodOwner;
  }
}

//our api key
//https://api.nal.usda.gov/fdc/v1/foods/search?query=apple&pageSize=2&api_key=Z8Ei3WuCifNrjYMkqdi2omkag0QuXlp6HRs91VrL

export async function getFoods(search: string): Promise<Array<Food>> {
  return new Promise((resolve, reject) => {
    if (search.trim() == "") {
      reject("Enter search");
    }
    Axios.get(
      base.url +
        "/foods/search?query=" +
        search +
        "&pageSize=" +
        20 +
        "&api_key=" +
        base.key
    )
      .then((response) => {
        console.log("response ", response);
        const len: number = response.data.foods.length;
        const result = [];

        for (var i: number = 0; i < len; i++) {
          result.push(
            new Food(
              typeof response.data.foods[i].additionalDescriptions !==
                "undefined" &&
              response.data.foods[i].additionalDescriptions.trim() !== ""
                ? response.data.foods[i].additionalDescriptions +
                  " - " +
                  response.data.foods[i].lowercaseDescription
                : response.data.foods[i].lowercaseDescription,
              response.data.foods[i].fdcId,
              response.data.foods[i].brandName,
              response.data.foods[i].brandOwner
            )
          );
        }
        console.log("result ", result);
        return resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export interface servings {
  description: string;
  servingSizeInGram: number;
}

export class FoodData {
  caloriesPerServing: Array<caloriesPerServing>;
  foodName: string;
  foodId: string;

  constructor(
    foodName: string,
    foodId: string,
    caloriesPerServing: Array<caloriesPerServing>
  ) {
    this.foodName = foodName;
    this.foodId = foodId;
    this.caloriesPerServing = caloriesPerServing;
  }
}

//convert calories to per serving (have cal per 100 grams, and amount of grams from API)
export class caloriesPerServing {
  description: string;
  calories: number;
  constructor(description: string, calories: number) {
    this.description = description;
    this.calories = calories;
  }
}

export async function getFood(apiId: string): Promise<FoodData> {
  return new Promise((resolve, reject) => {
    Axios.get(base.url + "/food/" + apiId + "?api_key=" + base.key)
      .then((response) => {
        const servingSizes = response.data.foodPortions;
        const caloriesPer100Grams = response.data.foodNutrients[2].amount;
        const description = response.data.description;

        const caloriesPerGram = caloriesPer100Grams / 100;

        var servingCalories = [];

        for (var i: number = 0; i < servingSizes.length; i++) {
          const label = servingSizes[i].portionDescription as string;
          const value = Math.round(
            servingSizes[i].gramWeight * caloriesPerGram
          );

          const result = { label, value };
          servingCalories.push(result);
        }

        servingCalories.push({
          label: "Per 100 grams",
          value: caloriesPer100Grams,
        });

        resolve(new FoodData(description, apiId, servingCalories));
      })
      .catch((error) => {
        reject(error);
      });
  });
}
