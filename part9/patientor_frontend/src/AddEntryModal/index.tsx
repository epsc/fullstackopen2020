import React from 'react';
import { Modal } from 'semantic-ui-react';
import AddEntryForm, { EntryFormValues } from './AddEntryForm';

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: EntryFormValues) => void;
}

const AddEntryModal = ({ modalOpen, onClose, onSubmit }: Props) => (
  <Modal
    closeIcon
    open={modalOpen}
    onClose={onClose}
  >
    <Modal.Header>Add a new entry</Modal.Header>
    <Modal.Content>
      <AddEntryForm onSubmit={onSubmit} onClose={onClose} />
    </Modal.Content>
  </Modal>
);

export default AddEntryModal;
