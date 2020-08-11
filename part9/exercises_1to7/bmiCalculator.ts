const calculateBMI = (heightInCm: number, weightInKg: number) : string => {
  if (heightInCm <= 0 || weightInKg <= 0) {
    return 'Invalid height or weight';
  }

  const bmi =  weightInKg / Math.pow(heightInCm / 100, 2);
  let result;

  if (bmi < 15) {
    result = 'Very severely underweight';
  } else if (bmi < 16) {
    result = 'Severely underweight';
  } else if (bmi < 18.5) {
    result = 'Underweight';
  } else if (bmi < 25) {
    result = 'Normal (healthy weight)';
  } else if (bmi < 30) {
    result = 'Overweight';
  } else if (bmi < 35) {
    result = 'Obese Class I (Moderately Obese)';
  } else if (bmi < 40) {
    result = 'Obese Class II (Severely Obese)';
  } else if (bmi > 40) {
    result = 'Very severely obese';
  }
  return result;
}

console.log(calculateBMI(180, 74));