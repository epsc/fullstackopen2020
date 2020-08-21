import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Icon, Card, Button } from 'semantic-ui-react';

import { Patient, Gender, EntryFormInputs } from '../types';
import { apiBaseUrl } from '../constants';
import { useStateValue, setPatient } from '../state';
import EntryDetails from './EntryDetails';
import AddEntryModal from '../AddEntryModal';
import { EntryFormValues } from '../AddEntryModal/AddEntryForm';
import { assertNever } from '../AddEntryModal/EntryFields';

const PatientPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patients }, dispatch] = useStateValue();
  const patient = patients[id];

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>();

  const openModal = (): void => {
    setModalOpen(true);
  };

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const filterToCorrectEntryType = (values: EntryFormInputs): EntryFormValues => {
    const commonValues = {
      description: values.description,
      date: values.date,
      specialist: values.specialist,
      diagnosisCodes: values.diagnosisCodes
    };

    switch (values.type) {
      case 'HealthCheck':
        return ({
          ...commonValues,
          type: values.type,
          healthCheckRating: values.healthCheckRating
        });
      case 'OccupationalHealthcare':
        let sickLeave = undefined;
        if (values.sickLeaveStartDate && values.sickLeaveEndDate) {
          sickLeave = {
            startDate: values.sickLeaveStartDate,
            endDate: values.sickLeaveEndDate
          };
        }

        return ({
          ...commonValues,
          type: values.type,
          employerName: values.employerName,
          sickLeave: sickLeave,
        });
      case 'Hospital':
        let discharge = undefined;
        if (values.dischargeDate && values.dischargeCriteria) {
          discharge = {
            date: values.dischargeDate,
            criteria: values.dischargeCriteria
          };
        }

        return ({
          ...commonValues,
          type: values.type,
          discharge: discharge
        });
      default:
        return assertNever(values.type);
    }
  };

  const submitNewEntry = async (values: EntryFormInputs) => {
    try {
      const filteredValues = filterToCorrectEntryType(values);
      const {data: updatedPatient} = await axios.post<Patient>(`${apiBaseUrl}/patients/${id}/entries`, filteredValues);
      dispatch(setPatient(updatedPatient));
      closeModal();
    } catch (error) {
      console.log(error);
      if (error.response.data.error) {
        setError(error.response.data.error);
      } else {
        setError(error.message);
      }
    }
  };

  
  useEffect(() => {
    // If condition is to only fetch if data has not been fetched before.
    // I used ssn here because it is not part of patient info when fetching all patients.
    // ? in condition is to avoid errors when patients parameter has not been initialized yet.
    // Check if there is a better implementation for this.
    if (!patients[id]?.ssn) {
      const fetchPatientData = async () => {
        try {
          const response = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
          const updatedPatient = response.data;
          dispatch(setPatient(updatedPatient));
        } catch (error) {
          console.log(error.message);
        }
      };
      fetchPatientData();
    }
  }, [id, dispatch, patients]);

  const genderIcon = (gender: Gender) => {
    switch (gender) {
      case 'male':
        return 'mars';
      case 'female':
        return 'venus';
      case 'other':
        return 'other gender';
      default:
        return 'genderless';
    }
  };

  // Return null if values have not been initialized yet
  if (!patient || !patient.ssn) {
    return null;
  }
  
  return (
    <div>
      <h2>{patient.name} <Icon name={genderIcon(patient.gender)} />
      </h2>
      ssn: {patient.ssn} <br/>
      occupation: {patient.occupation}
      <br/>
      <h3>entries</h3>
      <AddEntryModal
        modalOpen={modalOpen}
        onClose={closeModal}
        onSubmit={submitNewEntry}
        error={error}
      />
      <Button onClick={openModal}>Add New Entry</Button>
      <br /><br />
      <Card.Group>
        {patient.entries.map(entry =>
          <EntryDetails key={entry.id} entry={entry} />
        )}
      </Card.Group>
    </div>
  );
};

export default PatientPage;