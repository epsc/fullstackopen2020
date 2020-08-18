import React from 'react';
import { HospitalEntry } from '../types';
import { Card, Icon, List } from 'semantic-ui-react';
import { useStateValue } from '../state';

const HospitalEntryCard: React.FC<{entry: HospitalEntry }> = ({ entry }) => {
  const [{ diagnoses },] = useStateValue();

  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>
          {entry.date} <Icon name="hospital"/>
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
      <Card.Content extra>
        Discharge date: {entry.discharge?.date} <br/>
        Criteria: {entry.discharge?.criteria}
      </Card.Content>
    </Card>
  );
};

export default HospitalEntryCard;