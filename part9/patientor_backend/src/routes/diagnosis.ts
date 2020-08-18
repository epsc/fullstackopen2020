import express from 'express';
import diagnosisService from '../services/diagnosisService';

const router = express.Router();

router.get('/', (_request, response) => {
  response.send(diagnosisService.getEntries());
});

export default router;