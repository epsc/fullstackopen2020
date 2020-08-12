import express from 'express';
import calculateBmi from './bmiCalculator';

const app = express();

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

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});