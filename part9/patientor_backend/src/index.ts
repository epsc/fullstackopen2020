import express from 'express';
import cors from 'cors';
import diagnosisRouter from './routes/diagnosis';
import patientRouter from './routes/patients';
const app = express();

app.use(cors());
app.use(express.json());


const PORT = 3001;

app.get('/api/ping', (_request, response) => {
  response.send('pong');
});

app.use('/api/diagnoses', diagnosisRouter);
app.use('/api/patients', patientRouter);


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});