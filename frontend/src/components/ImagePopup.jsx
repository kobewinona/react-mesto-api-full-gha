import Popup from './Popup';

const ImagePopup = ({card, isOpen, onClose}) => {
  return (
    <Popup base="dark" type="preview" isOpen={isOpen} onClose={onClose}>
      <figure className="popup__preview-element">
        <img
          className="popup__preview-photo"
          src={card?.link}
          alt={card.name}
        />
        <figcaption>
          <p className="popup__preview-cap">{card.name}</p>
        </figcaption>
      </figure>
    </Popup>
  );
};

export default ImagePopup;