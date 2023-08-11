import {forwardRef, useState, useEffect} from 'react';


const Input = forwardRef(({isShown, onUpdate, validate, place, ...props}, ref) => {
  const [inputValue, setInputValue] = useState('');
  const [isInputValid, setIsInputValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  
  useEffect(() => {
    setInputValue(props.defaultValue);
    setIsInputValid(true);
    setErrorMessage('');
  }, [props.defaultValue, isShown]);
  
  const handleInputsChange = event => {
    setInputValue(event.target.value);
    setIsInputValid(event.target.validity.valid);
    setErrorMessage(event.target.validationMessage);
    
    onUpdate(props.name, event.target.value);
  }
  
  return (
    <>
      <input
        ref={ref}
        className={`form__input form__input_place_${place} ${validate ? !isInputValid && 'form__input_invalid' : ''}`}
        onChange={event => validate && handleInputsChange(event)}
        value={inputValue || ''}
        {...props}
      />
      {validate && (<span className="form__error-message">{!isInputValid && errorMessage}</span>)}
    </>
  );
});

export default Input;