import Axios from "axios";
import { isWholeNumber } from "../../util/math";

//https://api.nal.usda.gov/fdc/v1/foods/search?query=apple&pageSize=2&api_key=Z8Ei3WuCifNrjYMkqdi2omkag0QuXlp6HRs91VrL


const options = {
  url: "https://www.foodrepo.org/api/v3/products/",
  headers: "Token token=08ce4d6d98d9e970181060f352b8c797",
};

const getQuery = (search: string) => {
  return {
    _source: {
      includes: ["name_translations", "id"],
    },
    size: 20,
    query: {
      query_string: {
        fields: ["name_translations.en"],
        query: search,
      },
    },
  };
};

export class Food {
  foodName: string;
  foodId: string;

  constructor(foodName: string, foodId: string) {
    this.foodName = foodName;
    this.foodId = foodId;
  }
}

export class FoodData extends Food {
  caloriePerOne: number;
  caloriePerOneHundredGrams: number;
  constructor(
    food: Food,
    estimateCaloriePerOne: number,
    caloriePerOneHundredGrams: number
  ) {
    super(food.foodName, food.foodId);
    this.caloriePerOne = estimateCaloriePerOne;
    this.caloriePerOneHundredGrams = caloriePerOneHundredGrams;
  }
}

export async function getFoods(search: string): Promise<Array<Food>> {
  return new Promise((resolve, reject) => {
    Axios.post(options.url + "_search", JSON.stringify(getQuery(search)), {
      headers: { Authorization: options.headers },
    })
      .then((response) => {
        const len: number = response.data.hits.hits.length;
        var i: number;
        const result = [];
        for (i = 0; i < len; i++) {
          result.push(
            new Food(
              response.data.hits.hits[i]._source.name_translations.en,
              response.data.hits.hits[i]._source.id
            )
          );
        }
        return resolve(result);
      })
      .catch((error) => {
        console.log("error message ", error);
        reject(error);
      });
  });
}

export async function getFood(apiId: string): Promise<FoodData> {
  return new Promise((resolve, reject) => {
    Axios.get(options.url + apiId, {
      headers: { Authorization: options.headers },
    })
      .then((response) => {
        console.log("per one serving ", response.data.data);
        //response.data.data.nutrients.energy_kcal.per_hundred / 100 /* Kcal to calorie per 1 grams */ *response.data.data.quantity; };)
        const estimateForOneQty: number =
          (response.data.data.nutrients.energy_kcal.per_hundred / 1000) *
          response.data.data.quantity;
        const caloriesPer100Grams: number =
          response.data.data.nutrients.energy_kcal.per_hundred/100;
        resolve(
          new FoodData(
            new Food(response.data.data.name_translations.en, apiId),
            estimateForOneQty,
            caloriesPer100Grams
          )
        );
      })
      .catch((error) => {
        console.log("error message ", error);
        reject(error);
      });
  });
}
