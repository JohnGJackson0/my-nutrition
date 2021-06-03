import { useSelector } from "react-redux";
import { selectIsUSAMeasurement } from "../../questions/MeasuringSystemSlice";
import { selectUserInfo } from "../../questions/UserInfoSlice";
import { selectUserInfoMetric } from "../../questions/UserInfoInMetricSlice";
import { selectUserInfoUS } from "../../questions/UserInfoInUSSlice";

enum ActivityLevel {
  NoneOrLittle = 1.2,
  Light = 1.375,
  Moderate = 1.55,
  VeryActive = 1.725,
  ExtraActive = 1.9,
}

function _getActivity(exercisePerWeek: number): number {
  if (exercisePerWeek >= 0 && exercisePerWeek <= 1) {
    return ActivityLevel.NoneOrLittle;
  } else if (exercisePerWeek > 1 && exercisePerWeek <= 3) {
    return ActivityLevel.Light;
  } else if (exercisePerWeek > 3 && exercisePerWeek <= 5) {
    return ActivityLevel.Moderate;
  } else if (exercisePerWeek > 5 && exercisePerWeek <= 7) {
    return ActivityLevel.VeryActive;
  } else if (exercisePerWeek > 7) {
    return ActivityLevel.ExtraActive;
  }
}

export function getCaloriesToMaintainFromState() {
  const userInfoMetric = useSelector(selectUserInfoMetric);
  const isUSAMeasurement = useSelector(selectIsUSAMeasurement);
  const userInfo = useSelector(selectUserInfo);
  const userInfoUS = useSelector(selectUserInfoUS);

  if (isUSAMeasurement) {
    return getDailyCaloriesUS(
      _getActivity(userInfo.weeklyActivity),
      userInfo.isMale,
      userInfoUS.weightInLb,
      userInfoUS.heightInFt,
      userInfoUS.heightInIn,
      userInfo.age
    );
  } else {
    return getDailyCaloriesMetric(
      _getActivity(userInfo.weeklyActivity),
      userInfo.isMale,
      userInfoMetric.weightInKg,
      userInfoMetric.heightInCm,
      userInfo.age
    );
  }
}

/*
// see https://www.gatewaypsychiatric.com/calculating-calorie-needs/

//harris benedict with underestimate very musculer, and very fat

/*
If you are Sedentary – little or no exercise
Calorie-Calculation = BMR x 1.2
If you are Lightly Active (light exercise/sports 1-3 days/week)
Calorie-Calculation = BMR x 1.375
If you are Moderately Active (moderate exercise/sports 3-5 days/week)
Calorie-Calculation = BMR x 1.55
If you are Very Active = BMR x 1.725 (hard exercise/sports 6-7 days/week)
Calorie-Calculation = BMR x 1.725
If you are Extra Active (very hard daily exercise/sports & physical job or 2X day training)
Calorie-Calculation = BMR x 1.9
*/

//public

export function getDailyCaloriesMetric(
  activityMultiplier: number,
  isMale: boolean,
  weightInKg: number,
  heightInCm: number,
  ageInYears: number
) {
  console.log("isMale ", isMale);
  if (isMale === true) {
    return Math.ceil(
      _getCaloriesNeedsMetric(
        activityMultiplier,
        _getMaleBMRMetric(weightInKg, heightInCm, ageInYears)
      )
    );
  } else {
    return Math.ceil(
      _getCaloriesNeedsMetric(
        activityMultiplier,
        _getFemaleBMRMetric(weightInKg, heightInCm, ageInYears)
      )
    );
  }
}

export function getDailyCaloriesUS(
  activityMultiplier: ActivityLevel,
  isMale: boolean,
  weightInLb: number,
  heightInFt: number,
  heightInches: number,
  ageInYears: number
) {
  const weightInKg = _getKg(weightInLb);
  const heightInCm = _getHeightCm(heightInFt, heightInches);

  return Math.ceil(
    getDailyCaloriesMetric(
      activityMultiplier,
      isMale,
      weightInKg,
      heightInCm,
      ageInYears
    )
  );
}

function _getKg(lb: number): number {
  return lb * 0.453592;
}

function _getHeightCm(heightFt: number, heightIn: number): number {
  return heightFt * 30.48 + heightIn * 2.54;
}

//for women to maintain
//BMR = 655 + (9.6 X weight in kilos) + (1.8 X height in cm) – (4.7 x age in years).
//BMR * ACTIVITY RATE  

//for men to maintain
//BMR = 66 + (13.7 x weight in kilos) + (5 x height in cm) – (6.8 x age in years)
//BMR * ACTIVITY RATE  

function _getCaloriesNeedsMetric(activityMultiplier: number, bmr: number) {
  return bmr * activityMultiplier;
}

function _getMaleBMRMetric(
  weightInKg: number,
  heightInCm: number,
  ageInYears: number
) {
  return 66 + 13.7 * weightInKg + 5 * heightInCm - 6.8 * ageInYears;
}

//BMR = 655 + (9.6 X weight in kilos) + (1.8 X height in cm) – (4.7 x age in years).
function _getFemaleBMRMetric(
  weightInKg: number,
  heightInCm: number,
  ageInYears: number
) {
  return 655 + 9.6 * weightInKg + 1.8 * heightInCm - 4.7 * ageInYears;
}
