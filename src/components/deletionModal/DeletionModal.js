import "./DeletionModal.scss";
import React from "react";
import { Button } from "semantic-ui-react";
import { Modal } from "react-bootstrap";

function DeletionModal(props) {
  return (
    <div className="deletionModalWrapper">
      <Modal
        className="deletionModal"
        centered
        onExited={() => props.setVisible(false)}
        onShow={() => props.setVisible(true)}
        show={props.visible}
      >
        {/* <Modal.Content> */}
        <Modal.Body>
          <p>Are you sure you wish to delete this {props.deleteTarget}?</p>
        </Modal.Body>
        {/* </Modal.Content> */}
        <Modal.Footer>
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
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default DeletionModal;
