import express from 'express';
import cors from 'cors';
import diaryRouter from './routes/diaries';
const app = express();

app.use(cors());
app.use(express.json());


const PORT = 3001;

app.get('/api/ping', (_request, response) => {
  response.send('pong');
});

app.use('/api/diagnoses', diaryRouter);


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});