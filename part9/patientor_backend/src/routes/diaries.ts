import express from 'express';
import diaryService from '../services/diaryService';

const router = express.Router();

router.get('/', (_request, response) => {
  response.send(diaryService.getEntries());
});

export default router;