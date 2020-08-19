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
    >
      {({ setFieldValue, setFieldTouched }) => (
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
              <Button type="submit" floated="right" color="green">
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