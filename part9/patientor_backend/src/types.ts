export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other'
}

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

export interface Discharge {
  date: string;
  criteria: string;
}

interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge?: Discharge;
}

export interface SickLeave {
  startDate: string;
  endDate: string;
}

interface OccupationalHealthCareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave?: SickLeave;
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthCareEntry
  | HealthCheckEntry;

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
  entries: Entry[]
}

export type PatientNonSensitive = Omit<Patient, 'ssn' | 'entries'>;

export type NewPatient = Omit<Patient, 'id'>;


// Check later if there is a way to omit a property from each of the values in a union type directly:
// The idea is to find a way to omit from type Entry so we don't have to define an omit for each type
export type NewBaseEntry = Omit<BaseEntry, 'id'>;
export type NewHospitalEntry = Omit<HospitalEntry, 'id'>;
export type NewOccupationalHealthCareEntry = Omit<OccupationalHealthCareEntry, 'id'>;
export type NewHealthCheckEntry = Omit<HealthCheckEntry, 'id'>;

export type NewEntry = NewHospitalEntry | NewOccupationalHealthCareEntry | NewHealthCheckEntry;
