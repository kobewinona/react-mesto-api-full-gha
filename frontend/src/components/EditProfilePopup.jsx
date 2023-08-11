import {useState, useEffect, useContext} from 'react';

import {CurrentUserContext} from '../contexts/CurrentUserContext';

import PopupWithForm from './PopupWithForm';
import Input from './Input';


const EditProfilePopup = props => {
  const currentUser = useContext(CurrentUserContext);
  
  const [inputValues, setInputValues] = useState({});
  
  const handleValuesUpdate = (name, value) => {
    setInputValues(prevValues => ({
      ...prevValues, [name]: value
    }));
  };
  
  const handleSubmit = () => {
    props.onUpdateUser(inputValues);
  };
  
  useEffect(() => {
    setInputValues({
      userName: currentUser.name,
      userAbout: currentUser.about
    })
  }, [currentUser, props.isOpen]);
  
  
  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      validate={true}
      title="Редактировать профиль"
      name="edit-profile"
      submitText="Сохранить"
      {...props}
    >
      <Input
        isShown={props.isOpen}
        defaultValue={currentUser.name}
        onUpdate={handleValuesUpdate}
        validate={true}
        place="popup"
        name="userName"
        type="text"
        placeholder="Имя"
        aria-label="Имя."
        minLength="2"
        maxLength="40"
        required
      />
      <Input
        isShown={props.isOpen}
        defaultValue={currentUser.about}
        onUpdate={handleValuesUpdate}
        validate={true}
        place="popup"
        name="userAbout"
        type="text"
        placeholder="Описание"
        aria-label="Деятельность."
        minLength="2"
        maxLength="200"
        required
      />
    </PopupWithForm>
  );
};

export default EditProfilePopup;