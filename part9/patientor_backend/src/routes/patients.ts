import express from 'express';
import patientService from '../services/patientService';
import utils from '../utils';
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
    const newPatient = utils.toNewPatient(request.body);
    const addedPatient = patientService.addPatient(newPatient);

    response.json(addedPatient);
  } catch(error) {
    if (error instanceof Error) {
      response.status(400).send(error.message);
    }
  }
});

router.post('/:id/entries', (request, response) => {
  try {
    const newEntry = utils.toNewEntry(request.body);
    const updatedPatient = patientService.addEntry(request.params.id, newEntry);
    
    response.json(updatedPatient);
  } catch (error) {
    if (error instanceof Error) {
      response.status(400).send(error.message);
    }
  }
});

export default router;