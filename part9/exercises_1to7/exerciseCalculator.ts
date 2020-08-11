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
    ratingDescription = 'You reached at least half of your target.';
  } else {
    rating = 1;
    ratingDescription = 'You were far from your target. You can do better next time!';
  }

  return {
    periodLength, trainingDays, success, rating, ratingDescription,
    target: targetExerciseHours,
    average
  }
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 3))