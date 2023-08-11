import PopupWithForm from './PopupWithForm';


const DeletePlacePopup = props => {
  const handleSubmit = () => {
    props.onDeletePlace(props.cardToDelete)
  };
  
  return(
    <PopupWithForm
      onSubmit={handleSubmit}
      validate={false}
      title="Уверены?"
      name="delete-place"
      submitText="Да"
      {...props}
    />
  );
};

export default DeletePlacePopup;