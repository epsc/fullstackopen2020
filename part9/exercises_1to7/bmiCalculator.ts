interface HeightAndWeight {
  height: number;
  weight: number;
}

const parseArguments = (args: Array<string>): HeightAndWeight => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    };
  } else {
    throw new Error('Input values were not numbers');
  }
};

const calculateBmi = (heightInCm: number, weightInKg: number) : string => {
  if (heightInCm <= 0 || weightInKg <= 0) {
    return 'Invalid height or weight';
  }

  const bmi =  weightInKg / Math.pow(heightInCm / 100, 2);
  let result: string;

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
  } else {
    result = 'Very severely obese';
  }
  return result;
};

try {
  const { height, weight } = parseArguments(process.argv);
  console.log(calculateBmi(height, weight));
} catch (error) {
  console.log('An error occurred: ', error);
}


export default calculateBmi;