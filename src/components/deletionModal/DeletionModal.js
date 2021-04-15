import "./DeletionModal.scss";
import React, { useState } from "react";
import { Modal, Button } from "semantic-ui-react";

function DeletionModal(props) {

  return (
    <div className="deletionModalWrapper">
      <Modal
        className="deletionModal"
        onClose={() => props.setVisible(false)}
        onOpen={() => props.setVisible(true)}
        open={props.visible}
      >
        <Modal.Content>
          <Modal.Description>
            <p>Are you sure you wish to delete this {props.deleteTarget}?</p>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button compact onClick={() => props.setVisible(false)}>
            On Second Thought...
          </Button>
          <Button
            compact
            negative
            onClick={() => {
              props.setVisible(false);
              props.deleteFunction();
            }}
          >
            Yes, I'm Sure.
          </Button>
        </Modal.Actions>
      </Modal>
      {/* <Modal
        trigger={<Button>Show Modal</Button>}
        header="Reminder!"
        content="Call Benjamin regarding the reports."
        actions={["Snooze", { key: "done", content: "Done", positive: true }]}
      /> */}
    </div>
  );
}

export default DeletionModal;
