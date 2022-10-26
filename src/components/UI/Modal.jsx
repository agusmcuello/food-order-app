import { Fragment } from "react";
import "./modal.css";
import * as ReactDOM from 'react-dom';
const Backdrop = (props) => {
  return <div className="backdrop" onClick={props.toClose}/>;
};
const ModalOverlay = (props) => {
  return (
    <div className="modal">
      <div className="content">{props.children}</div>
    </div>
  );
};

const portalElement = document.getElementById("overlays");

function Modal(props) {
  return (
    <Fragment>
      {ReactDOM.createPortal(<Backdrop toClose={props.toCloseModal} />, portalElement)}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalElement
      )}
    </Fragment>
  );
}

export default Modal;
