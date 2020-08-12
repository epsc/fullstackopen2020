import express from 'express';
import calculateBmi from './bmiCalculator';
import calculateExercises, { ExerciseValues } from './exerciseCalculator';

const app = express();

app.use(express.json());

app.get('/hello', (_request, response) => {
  response.send('Hello Full Stack!');
});

app.get('/bmi', (request, response) => {
  const height = Number(request.query.height);
  const weight = Number(request.query.weight);

  // height and weight should be provided and should be a number
  if (!height || !weight || isNaN(height) || isNaN(weight)) {
    response.status(400).json({
      error: "malformatted parameters"
    });
  } else {
    response.json({
      weight: weight,
      height: height,
      bmi: calculateBmi(height, weight)
    });
  }
});

app.post('/exercises', (request, response) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = request.body;

  // Cast the values into required types
  const values: ExerciseValues = {
    dailyHours: daily_exercises as Array<number>,
    targetHours: target as number
  };

  // Check if required parameters exist
  if (!values.dailyHours || !values.targetHours) {
    return response.status(400).json({
      error: "parameters missing"
    });
  }

  // Convert array values to numbers or NaN if not a number
  values.dailyHours = values.dailyHours.map(value => Number(value));

  if (values.dailyHours.includes(NaN) || isNaN(values.targetHours)) {
    return response.status(400).json({
      error: "malformatted parameters"
    });
  }
  
  const result = calculateExercises(values.dailyHours, values.targetHours);
  return response.json(result);
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});