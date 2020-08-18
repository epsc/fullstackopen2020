import React from 'react';
import { HealthCheckEntry, HealthCheckRating } from '../types';
import { Card, Icon, List } from 'semantic-ui-react';
import { useStateValue } from '../state';

const HealthCheckEntryCard: React.FC<{entry: HealthCheckEntry }> = ({ entry }) => {
  const [{ diagnoses },] = useStateValue();

  const heartColor = (rating: HealthCheckRating) => {
    switch (rating) {
      case 0:
        return 'green';
      case 1:
        return 'yellow';
      case 2:
        return 'orange';
      case 3:
        return 'red';
      default:
        break;
    }
  };

  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>
          {entry.date} <Icon name="doctor"/>
        </Card.Header>
        <Card.Description>
          {entry.description} <br/>
          <Icon name="heart" color={heartColor(entry.healthCheckRating)} />
          <List>
            {entry.diagnosisCodes && entry.diagnosisCodes.map(code =>
              <List.Item key={code}>
                <Icon name="angle right"/>
                {code} {diagnoses[code]?.name}
              </List.Item>)}
          </List>
        </Card.Description>
      </Card.Content>
    </Card>
  );
};

export default HealthCheckEntryCard;