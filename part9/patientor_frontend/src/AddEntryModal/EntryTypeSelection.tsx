import React from 'react';
import { Dropdown, Form, DropdownProps } from 'semantic-ui-react';
import { Field } from 'formik';

import { NumberField } from '../AddPatientModal/FormField';

interface EntryFieldsProps {
  entryType: string;
}

interface SelectionProps {
  onChange: (value: 'HealthCheck') => void;
  entryType: 'HealthCheck';
}

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
    default:
      return null;
  }
};


export const EntryTypeSelection: React.FC<SelectionProps> = ({ onChange, entryType }) => {
  const entryTypes = ['HealthCheck'];
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
    //if (typeof data.value === 'string')
    if (data.value === 'HealthCheck') {
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