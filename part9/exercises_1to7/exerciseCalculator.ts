interface Result {
  periodLength: number,
  trainingDays: number,
  success: Boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

type Rating = 1 | 2 | 3;

interface ExerciseValues {
  targetHours: number;
  dailyHours: Array<number>;
}

const parseInput = (args: Array<string>): ExerciseValues => {
  if (args.length < 4) throw new Error('Not enough arguments');

  const hours = args.slice(3).map(arg => Number(arg));

  if (!isNaN(Number(args[2])) && !hours.includes(NaN)) {
    return {
      targetHours: Number(args[2]),
      dailyHours: hours
    }
  } else {
    throw new Error('Arguments must be numbers');
  }
}

const calculateExercises = (dailyExerciseHours: Array<number>, targetExerciseHours: number) : Result => {
  const periodLength: number = dailyExerciseHours.length;
  const trainingDays: number = dailyExerciseHours.filter(hours => hours > 0).length
  const average: number = dailyExerciseHours.reduce((sum, value) => sum + value) / periodLength;
  const success: boolean = average >= targetExerciseHours ? true : false;

  let rating: Rating;
  let ratingDescription: string;
  const percentOfTarget = average / targetExerciseHours;

  if (percentOfTarget >= 1) {
    rating = 3;
    ratingDescription = 'You have met your target!';
  } else if (0.5 <= percentOfTarget && percentOfTarget < 1) {
    rating = 2;
    ratingDescription = 'You reached at least half of your target average hours.';
  } else {
    rating = 1;
    ratingDescription = 'You were far from your target average hours. You can do better next time!';
  }

  return {
    periodLength, trainingDays, success, rating, ratingDescription,
    target: targetExerciseHours,
    average
  }
}

try {
  const { targetHours, dailyHours } = parseInput(process.argv);
  console.log(calculateExercises(dailyHours, targetHours));
} catch (error) {
  console.log('An error occurred: ', error.message);
}