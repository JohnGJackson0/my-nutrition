//for macros
//40-65 percent carbs
//10-30 percent protein
//20-35 percent fat

//www.health.harvard.edu/staying-healthy/calorie-counting-made-easy

export function getRecommendedMinDeficit(calories: number) {
  return calories - 1200;
}

export function getRecommendedMaxDeficit(calories: number) {
  return calories - 200;
}

export function getRecommendedMinSurplus(calories: number) {
  return calories + 200;
}

export function getRecommendedMaxSurplus(calories: number) {
  return calories + 1000;
}

export function goalMessage(
  maintainWeightInCalories: number,
  goalCalories: number
): string {
  if (goalCalories < maintainWeightInCalories - 1000) {
    return "lose two pounds of weight per week.";
  } else if (
    goalCalories >= maintainWeightInCalories - 1000 &&
    goalCalories <= maintainWeightInCalories - 500
  ) {
    return "lose one pound of weight per week.";
  } else if (
    goalCalories > maintainWeightInCalories - 500 &&
    goalCalories <= maintainWeightInCalories + 250
  ) {
    return "maintain weight.";
  } else if (
    goalCalories > maintainWeightInCalories + 250 &&
    goalCalories <= maintainWeightInCalories + 500
  ) {
    return "gain one pound of weight per week.";
  } else if (goalCalories > maintainWeightInCalories + 500) {
    return "gain two pounds of weight per week.";
  } else {
    return "undefined. Something went wrong.";
  }
}

function getProteinGrams(calories: number) {
  return calories * 4;
}

function getCarbGrams(calories: number) {
  return calories * 4;
}

function getFatGrams(calories: number) {
  return calories * 9;
}
