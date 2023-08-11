import {useRef, useState, useEffect} from 'react';

import Spinner from './Spinner';


const Form = ({validate, onSubmit, isOpen, place, ...props}) => {
  const [isFormValid, setIsFormValid] = useState(false);
  const [inputsValidity, setInputsValidity] = useState({});
  
  const handleChange = event => {
    const inputs = Array.from(event.currentTarget.elements);
    
    const currentInputsValidity = inputs.reduce((validity, input) => {
      validity[input.name] = input.validity.valid;
      return validity;
    }, {});
    
    setInputsValidity(currentInputsValidity);
  };
  
  const validateForm = () => {
    const inputValues = Object.values(inputsValidity);
    
    if (inputValues.length === 0) {
      setIsFormValid(false);
      return;
    }
    
    setIsFormValid(inputValues.every((i) => i === true));
  };
  
  const handleSubmit = event => {
    event.preventDefault();
    
    if (validate && event.target.checkValidity()) {
      onSubmit();
    } else {
      onSubmit();
    }
  
    setIsFormValid(false);
  };
  
  useEffect(() => {
    validateForm();
    
    // eslint-disable-next-line
  }, [inputsValidity]);
  
  useEffect(() => {
    setInputsValidity({});
  }, [isOpen]);
  
  const submitButtonRef = useRef();
  
  if (!validate && isOpen) {
    setTimeout(() => submitButtonRef.current?.focus(), 50);
  }
  
  return (
    <form
      onChange={event => validate && handleChange(event)}
      onSubmit={handleSubmit}
      className={`form form_place_${place}`}
      name={props.name}
      noValidate
    >
      {props.children}
      {props.isUpdating
        ? <Spinner theme={props.theme} size={props.size}/>
        : <button
            ref={submitButtonRef}
            className={`form__submit form__submit_place_${place} ${validate ? !isFormValid && 'form__submit_disabled' : ''}`}
            type="submit"
            name="submit"
            disabled={validate ? !isFormValid : false}
          >{props.submitText || 'Сохранить'}</button>}
    </form>
  )
};

export default Form;