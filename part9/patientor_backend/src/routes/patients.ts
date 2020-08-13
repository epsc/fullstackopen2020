import express from 'express';
import patientService from '../services/patientService';
const router = express.Router();

router.get('/', (_request, response) => {
  response.send(patientService.getEntries());
});

export default router;