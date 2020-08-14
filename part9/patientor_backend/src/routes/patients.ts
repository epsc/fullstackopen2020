import express from 'express';
import patientService from '../services/patientService';
const router = express.Router();

router.get('/', (_request, response) => {
  response.send(patientService.getEntries());
});

router.post('/', (request, response) => {
  const { name, dateOfBirth, ssn, gender, occupation } = request.body;

  const newPatient = patientService.addPatient({
    name,
    dateOfBirth,
    ssn,
    gender,
    occupation
  });

  response.json(newPatient);
});

export default router;