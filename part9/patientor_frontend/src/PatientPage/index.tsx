import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Icon } from 'semantic-ui-react';

import { Patient, Gender } from '../types';
import { apiBaseUrl } from '../constants';
import { useStateValue, setPatient } from '../state';

const PatientPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patients }, dispatch] = useStateValue();
  const patient = patients[id];
  
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
      {patient.entries.map(entry => 
        <div key={entry.id}>
          {entry.date} <i>{entry.description}</i>
          <ul>
            {entry.diagnosisCodes && entry.diagnosisCodes.map(code => 
              <li key={code}>
                {code}
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PatientPage;