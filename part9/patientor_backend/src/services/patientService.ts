import patients from '../../data/patients';
import { PatientNonSensitive, Patient, NewPatient } from '../types';
import { v4 as uuidv4 } from 'uuid';

const getEntries = (): PatientNonSensitive[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const getPatient = (id: string): Patient => {
  const patient = patients.find(patient => patient.id === id);

  if (!patient) {
    throw new Error('Patient not found');
  }

  return patient;
};

const addPatient = ( patient: NewPatient ): Patient => {
  
  const newPatient = {
    id: uuidv4(),
    ...patient
  };

  patients.push(newPatient);
  return newPatient;
};

export default {
  getEntries,
  getPatient,
  addPatient
};