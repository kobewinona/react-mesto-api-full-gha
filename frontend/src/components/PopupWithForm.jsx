import {useRef} from 'react';

import Popup from './Popup';
import Form from './Form';


const PopupWithForm = props => {
  const submitButtonRef = useRef();

  if (!props.validate && props.isOpen) {
    setTimeout(() => submitButtonRef.current?.focus(), 50);
  }
  
  return (
    <Popup base="light" type="form" isOpen={props.isOpen} onClose={props.onClose}>
      <h2 className="popup__title">{props.title}</h2>
      <Form
        onSubmit={props.onSubmit}
        validate={props.validate}
        place="popup"
        theme="light"
        size="small"
        {...props}
      >
        {props.children}
      </Form>
    </Popup>
  );
};

export default PopupWithForm;