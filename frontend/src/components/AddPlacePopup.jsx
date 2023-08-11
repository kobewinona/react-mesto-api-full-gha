import {useState} from 'react';

import PopupWithForm from './PopupWithForm';
import Input from './Input';


const AddPlacePopup = props => {
  const [inputValues, setInputValues] = useState({placeName: '', placeLink: ''});
  
  const handleValuesUpdate = (name, value) => {
    setInputValues(prevValues => ({
      ...prevValues, [name]: value
    }));
  };
  
  const handleSubmit = () => {
    props.onAddPlace(inputValues)
  };
  
  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      validate={true}
      title="Новое место"
      name="add-place"
      submitText="Создать"
      {...props}
    >
      <Input
        isShown={props.isOpen}
        onUpdate={handleValuesUpdate}
        validate={true}
        place="popup"
        name="placeName"
        type="text"
        placeholder="Название"
        aria-label="Название."
        minLength="2"
        maxLength="30"
        required
      />
      <Input
        isShown={props.isOpen}
        onUpdate={handleValuesUpdate}
        validate={true}
        place="popup"
        name="placeLink"
        type="url"
        placeholder="Ссылка на изображение"
        aria-label="Ссылка на изображение."
        required
      />
    </PopupWithForm>
  );
};

export default AddPlacePopup;