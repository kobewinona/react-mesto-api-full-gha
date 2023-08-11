import Popup from './Popup';


const InfoTooltip = ({isOpen, isAuthSuccessful, onClose}) => {
  return (
    <Popup base="light" type="tooltip" isOpen={isOpen} onClose={onClose}>
      <div className={`popup__pict popup__pict_type_${isAuthSuccessful ? 'accept' : 'reject'}`}></div>
      <p className="popup__message">
        {isAuthSuccessful
          ? 'Вы успешно зарегистрировались!'
          : 'Что-то пошло не так! Попробуйте ещё раз.'
        }</p>
    </Popup>
  );
};

export default InfoTooltip;