import React from 'react';
import { Dropdown, Form, DropdownProps } from 'semantic-ui-react';
import { Field } from 'formik';

import { EntryType } from '../types';
import { NumberField, TextField } from '../AddPatientModal/FormField';

interface EntryFieldsProps {
  entryType: string;
}

interface SelectionProps {
  onChange: (value: EntryType) => void;
  entryType: EntryType;
}

export const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

export const EntryFields: React.FC<EntryFieldsProps> = ({ entryType }) => {
  switch (entryType) {
    case 'HealthCheck':
      return (
        <Form.Group>
          <Field 
            label="Health Check Rating"
            name="healthCheckRating"
            component={NumberField}
            min={0}
            max={3}
          />
        </Form.Group>
      );
    case 'OccupationalHealthcare':
      return (
        <div>
          <Field 
            label="Employer Name"
            placeholder="Employer Name"
            name="employerName"
            component={TextField}
          />
          <h4>Sick Leave <i>(Optional)</i></h4>
          <Form.Group>
            <Field 
              label="Start Date"
              placeholder="YYYY-MM-DD"
              name="sickLeaveStartDate"
              component={TextField}
            />
            <Field 
              label="End Date"
              placeholder="YYYY-MM-DD"
              name="sickLeaveEndDate"
              component={TextField}
            />
          </Form.Group>
        </div>
      );
    default:
      return null;
  }
};

export const EntryTypeSelection: React.FC<SelectionProps> = ({ onChange, entryType }) => {
  const entryTypes = ['HealthCheck', 'OccupationalHealthcare'];
  //const entryTypes = ['HealthCheck', 'Hospital', 'OccupationalHealthcare'];
  const entryTypeOptions = entryTypes.map(type => ({
    key: type,
    text: type,
    value: type
  }));

  const onDropdownChange = (
    _event: React.SyntheticEvent<HTMLElement, Event>,
    data: DropdownProps
  ) => {
    if (data.value === 'HealthCheck' || data.value === 'OccupationalHealthcare') {
      onChange(data.value);
    }
  };

  return (
    <Form.Field>
      <label>Entry Type</label>
      <Dropdown
        fluid
        selection
        options={entryTypeOptions}
        defaultValue={entryType}
        onChange={onDropdownChange}
      />
    </Form.Field>
  );
};

export default EntryTypeSelection;