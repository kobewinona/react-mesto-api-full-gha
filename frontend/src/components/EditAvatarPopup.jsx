import {useRef, useState} from 'react';

import PopupWithForm from './PopupWithForm';
import Input from './Input';


const EditAvatarPopup = props => {
  const avatarInputRef = useRef();
  
  const [inputValue, setInputValue] = useState({});
  
  const handleValueUpdate = (name, value) => {
    setInputValue({[name]: value});
  };
  
  const handleSubmit = () => {
    props.onUpdateAvatar(inputValue);
    
    avatarInputRef.current.value = '';
  };
  
  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      validate={true}
      title="Обновить аватар"
      name="edit-avatar"
      submitText="Сохранить"
      {...props}
    >
      <Input
        ref={avatarInputRef}
        isShown={props.isOpen}
        onUpdate={handleValueUpdate}
        validate={true}
        place="popup"
        name="userAvatar"
        type="url"
        placeholder="Ссылка на изображение"
        aria-label="Ссылка на изображение."
        required
      />
    </PopupWithForm>
  );
};

export default EditAvatarPopup;