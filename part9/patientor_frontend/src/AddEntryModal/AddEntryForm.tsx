import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { Button, Grid } from 'semantic-ui-react';

import { HealthCheckRating, EntryType, EntryFormInputs, HealthCheckEntry, HospitalEntry, OccupationalHealthCareEntry } from '../types';
import { useStateValue } from '../state';
import { TextField, DiagnosisSelection } from '../AddPatientModal/FormField';
import { EntryTypeSelection, EntryFields } from './EntryFields';

// Form specific types
type HealthCheckFormValues = Omit<HealthCheckEntry, 'id'>;
type HospitalFormValues = Omit<HospitalEntry, 'id'>;
type OccupationalFormValues = Omit<OccupationalHealthCareEntry, 'id'>;
export type EntryFormValues = HealthCheckFormValues | HospitalFormValues | OccupationalFormValues;

interface Props {
  onSubmit: (values: EntryFormInputs) => void;
  onClose: () => void;
}

const AddEntryForm: React.FC<Props> = ({ onSubmit, onClose }) => {
  const [{ diagnoses }] = useStateValue();
  const [entryType, setEntryType] = useState<EntryType>('HealthCheck');

  const changeEntryType = (value: EntryType) => {
    setEntryType(value);
  };

  const initialValues = (entryType: EntryType): EntryFormInputs => {
    return ({
      type: entryType,
      description: '',
      date: '',
      specialist: '',
      diagnosisCodes: undefined,
      healthCheckRating: HealthCheckRating.Healthy,
      employerName: '',
      sickLeaveStartDate: '',
      sickLeaveEndDate: '',
      dischargeDate: '',
      dischargeCriteria: '',
    });
  };
  
  return (
    <Formik
      initialValues={initialValues(entryType)}
      enableReinitialize={true}
      onSubmit={onSubmit}
      validate={values => {
        const requiredError = 'Field is required';
        const dateError = 'Invalid date';
        const startAndEndError = 'Must have both a start and end date';
        const healthCheckRatingError = 'Rating should be 0, 1, 2 or 3';
        const errors: { [field: string]: string } = {};

        const dateFormat = /^\d{4}-\d{2}-\d{2}$/;
        const dateValidated = (date: string) => {
          return (dateFormat.test(date) && Boolean(Date.parse(date)));
        };

        // Common field validation
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (!dateFormat.test(values.date) || !Date.parse(values.date)) {
          errors.date = dateError;
        }

        // HealthCheck form validation
        if (values.type === 'HealthCheck') {
          // Zero is a 'falsy' value but is a valid entry value for this property
          if (values.healthCheckRating !==0 && !values.healthCheckRating) {
            errors.healthCheckRating = requiredError;
          }
          if (values.healthCheckRating % 1 !== 0 || values.healthCheckRating < 0 || values.healthCheckRating > 3) {
            errors.healthCheckRating = healthCheckRatingError;
          }
        }
        
        // Occupational Healthcare validation
        if (values.type === 'OccupationalHealthcare') {
          if (!values.employerName) {
            errors.employerName = requiredError;
          }
          if (values.sickLeaveStartDate && !dateValidated(values.sickLeaveStartDate)) {
            errors.sickLeaveStartDate = dateError;
          }
          if (values.sickLeaveEndDate && !dateValidated(values.sickLeaveEndDate)) {
            errors.sickLeaveEndDate = dateError;
          }
          // If fields are used, both start and end date must be present
          if ((values.sickLeaveEndDate && !values.sickLeaveStartDate) ||
            (!values.sickLeaveEndDate && values.sickLeaveStartDate)) {
            errors.sickLeaveEndDate = startAndEndError;
          }
          if ((values.sickLeaveEndDate && values.sickLeaveStartDate) &&
            (Date.parse(values.sickLeaveEndDate) < Date.parse(values.sickLeaveStartDate))) {
              errors.sickLeaveEndDate = 'End date must not be earlier than the start date';
            }
        }

        // Hospital validation
        if (values.type === 'Hospital') {
          if (values.dischargeDate && !dateValidated(values.dischargeDate)) {
            errors.dischargeDate = dateError;
          }
          if ((values.dischargeDate && !values.dischargeCriteria) || 
          (!values.dischargeDate && values.dischargeCriteria)) {
            errors.dischargeCriteria = 'Both date and criteria for discharge must be present';
          }
        }

        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => (
        <Form className="form ui">
          <EntryTypeSelection onChange={changeEntryType} entryType={entryType}/>
          <Field
            label="Description"
            placeholder="description"
            name="description"
            component={TextField}
          />
          <Field
            label="Date"
            placeholder="YYYY-MM-DD"
            name="date"
            component={TextField}
          />
          <Field
            label="Specialist"
            placeholder="specialist"
            name="specialist"
            component={TextField}
          />
          <DiagnosisSelection 
            setFieldValue={setFieldValue}
            setFieldTouched={setFieldTouched}
            diagnoses={Object.values(diagnoses)}
          />
          <EntryFields entryType={entryType} />
          <Grid>
            <Grid.Column floated="left" width={5}>
              <Button type="button" onClick={onClose} color="red">
                Close
              </Button>
            </Grid.Column>
            <Grid.Column floated="right" width={5}>
              <Button type="submit" floated="right" color="green" disabled={!dirty || !isValid}>
                Add
              </Button>
            </Grid.Column>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};

export default AddEntryForm;