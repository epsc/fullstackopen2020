import React from 'react';
import { OccupationalHealthCareEntry } from '../types';
import { Card, Icon, List } from 'semantic-ui-react';
import { useStateValue } from '../state';

const OccupationalHealthCareEntryCard: React.FC<{entry: OccupationalHealthCareEntry }> = ({ entry }) => {
  const [{ diagnoses },] = useStateValue();

  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>
          {entry.date} <Icon name="stethoscope"/> {entry.employerName}
        </Card.Header>
        <Card.Description>
          {entry.description} <br/>
          <List>
            {entry.diagnosisCodes && entry.diagnosisCodes.map(code =>
              <List.Item key={code}>
                <Icon name="angle right"/>
                {code} {diagnoses[code]?.name}
              </List.Item>)}
          </List>
        </Card.Description>
      </Card.Content>
        {entry.sickLeave && 
          <Card.Content extra>Sick Leave <br/>
            start date: {entry.sickLeave?.startDate} <br/>
            end date: {entry.sickLeave?.endDate}
          </Card.Content>
        }
    </Card>
  );
};

export default OccupationalHealthCareEntryCard;