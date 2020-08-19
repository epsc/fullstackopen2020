/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  NewPatient,
  Gender,
  NewEntry, 
  Diagnosis, 
  NewBaseEntry, 
  Discharge, 
  NewOccupationalHealthCareEntry,
  SickLeave,
  HealthCheckRating
} from './types';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const toNewPatient = (object: any): NewPatient => {
  return ({
    name: parseName(object.name),
    dateOfBirth: parseDate(object.dateOfBirth),
    ssn: parseSsn(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseOccupation(object.occupation),
    entries: []
  });
};

const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseName = (name: any): string => {
  if (!name || !isString(name)) {
    throw new Error(`Incorrect or missing name: ${name as string}`);
  }
  return name;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error(`Incorrect or missing date: ${date as string}`);
  }
  return date;
};

const parseSsn = (ssn: any): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error(`Incorrect or missing ssn: ${ssn as string}`);
  }
  return ssn;
};

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const parseGender = (gender: any): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error(`Incorrect or missing gender: ${gender as string}`);
  }
  return gender;
};

const parseOccupation = (occupation: any): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error(`Incorrect or missing occupation: ${occupation as string}`);
  }
  return occupation;
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const toNewEntry = (object: any): NewEntry => {
  const commonFields: NewBaseEntry = {
    description: parseStringField(object.description, "description"),
    date: parseDate(object.date),
    specialist: parseStringField(object.specialist, ""),
  };

  if (object.diagnosisCodes) {
    commonFields.diagnosisCodes = parseDiagnosisCodes(object.diagnosisCodes);
  }

  switch (object.type) {
    case 'Hospital':
      const newHospitalEntry: NewEntry = {
        ...commonFields,
        type: 'Hospital'
      };

      if (object.discharge) {
        newHospitalEntry.discharge = parseDischarge(object.discharge);
      }

      return (newHospitalEntry);
    case 'OccupationalHealthcare':
      const newOccupationalEntry: NewOccupationalHealthCareEntry = {
        ...commonFields,
        type: 'OccupationalHealthcare',
        employerName: parseStringField(object.employerName, 'employerName')
      };

      if (object.sickLeave) {
        newOccupationalEntry.sickLeave = parseSickLeave(object.sickLeave);
      }

      return (newOccupationalEntry);
    case 'HealthCheck':
      return ({
        ...commonFields,
        type: 'HealthCheck',
        healthCheckRating: parseHealthCheckRating(object.healthCheckRating)
      });
    default:
      throw new Error(`Invalid entry type: ${object.type as string}`);
  }
};


// Generic string field parser instead of creating one for each 
// (as long as no other requirements/validations are needed for the field)
const parseStringField = (field: any, fieldName: string): string => {
  if (!field || !isString(field)) {
    throw new Error(`Incorrect or missing ${fieldName}: ${field as string}`);
  }
  return field;
};

// Check if it is an array and if all the elements in the array are strings
const isStringArray = (array: any): array is Array<string> => {
  return (Array.isArray(array) && array.every(element => isString(element)));
};

const parseDiagnosisCodes = (diagnosisCodes: any): Array<Diagnosis['code']> => {
  // If it is not an array or it is not an array of strings, then validation fails
  if (!isStringArray(diagnosisCodes)) {
    throw new Error(`Incorrect diagnosisCodes: ${diagnosisCodes as string}`);
  }
  return diagnosisCodes;
};

const parseDischarge = (param: any): Discharge => {
  return {
    date: parseDate(param.date),
    criteria: parseStringField(param.criteria, 'criteria')
  };
};

const parseSickLeave = (sickLeave: any): SickLeave => {
  return {
    startDate: parseDate(sickLeave.startDate),
    endDate: parseDate(sickLeave.endDate)
  };
};

const isHealthCheckRating = (param: any): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};

const parseHealthCheckRating = (healthCheckRating: any): HealthCheckRating => {
  if (healthCheckRating === undefined  || !isHealthCheckRating(healthCheckRating)) {
    throw new Error(`Incorrect or missing health check rating: ${healthCheckRating as string}`);
  }
  return healthCheckRating;
};

export default { toNewPatient, toNewEntry };