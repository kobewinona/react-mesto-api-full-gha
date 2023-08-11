import {useEffect} from 'react';


const Popup = ({base, type, isOpen, onClose, children}) => {
  useEffect(() => {
    const handleKeyDown = event => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }
    
    return () => document.removeEventListener('keydown', handleKeyDown);
  
    // eslint-disable-next-line
  }, [isOpen]);
  
  return (
    <section
      className={`popup popup_base_${base} ${isOpen && 'popup_opened'}`}
      onClick={onClose}
    >
      <div
        className={`popup__container popup__container_type_${type} ${isOpen ? 'grow' : 'shrink'}`}
        onClick={event => event.stopPropagation()}
      >
        <button
          className="close-button"
          type="button"
          aria-label="Закрыть."
          onClick={onClose}
        />
        {children}
      </div>
    </section>
  );
};

export default Popup;