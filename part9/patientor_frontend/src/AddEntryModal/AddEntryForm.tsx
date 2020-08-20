import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { Button, Grid } from 'semantic-ui-react';

import { HealthCheckRating, HealthCheckEntry } from '../types';
import { useStateValue } from '../state';
import { TextField, DiagnosisSelection } from '../AddPatientModal/FormField';
import { EntryTypeSelection, EntryFields } from './EntryTypeSelection';

export type EntryFormValues = Omit<HealthCheckEntry, 'id'>;

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onClose: () => void;
}

const AddEntryForm: React.FC<Props> = ({ onSubmit, onClose }) => {
  const [{ diagnoses }] = useStateValue();
  const [entryType, setEntryType] = useState<'HealthCheck'>('HealthCheck');

  const changeEntryType = (value: 'HealthCheck') => {
    setEntryType(value);
  };
  
  return (
    <Formik
      initialValues={{
        type: entryType,
        description: '',
        date: '',
        specialist: '',
        diagnosisCodes: [],
        healthCheckRating: HealthCheckRating.Healthy
      }}
      onSubmit={onSubmit}
      validate={values => {
        const requiredError = 'Field is required';
        const dateError = 'Invalid date';
        const healthCheckRatingError = 'Rating should be 0, 1, 2 or 3';
        const errors: { [field: string]: string } = {};

        const dateFormat = /^\d{4}-\d{2}-\d{2}$/;

        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        // Zero is a 'falsy' value but is a valid entry value for this property
        if (values.healthCheckRating !==0 && !values.healthCheckRating) {
          errors.healthCheckRating = requiredError;
        }
        if (values.healthCheckRating % 1 !== 0 || values.healthCheckRating < 0 || values.healthCheckRating > 3) {
          errors.healthCheckRating = healthCheckRatingError;
        }
        if (!dateFormat.test(values.date) || !Date.parse(values.date)) {
          errors.date = dateError;
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => (
        <Form className="form ui">
          <EntryTypeSelection onChange={changeEntryType} entryType={entryType} />
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