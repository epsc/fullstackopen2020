import express from 'express';
import patientService from '../services/patientService';
import toNewPatient from '../utils';
const router = express.Router();

router.get('/', (_request, response) => {
  response.send(patientService.getEntries());
});

router.get('/:id', (request, response) => {
  try {
    response.send(patientService.getPatient(request.params.id));
  } catch(error) {
    if (error instanceof Error) {
      response.status(404).send(error.message);
    }
  }
});

router.post('/', (request, response) => {
  try {
    const newPatient = toNewPatient(request.body);
    const addedPatient = patientService.addPatient(newPatient);

    response.json(addedPatient);
  } catch(error) {
    if (error instanceof Error) {
      response.status(400).send(error.message);
    }
  }
});

export default router;