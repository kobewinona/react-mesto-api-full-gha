import {useState, useEffect} from 'react';
import {Routes, Route, Navigate, useNavigate} from 'react-router-dom';

import * as api from '../utils/api';
import * as auth from '../utils/auth';
import {AuthContext} from '../contexts/AuthContext';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

import ProtectedRoute from './ProtectedRoute';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import EditAvatarPopup from './EditAvatarPopup';
import EditProfilePopup from './EditProfilePopup';
import AddPlacePopup from './AddPlacePopup';
import DeletePlacePopup from './DeletePlacePopup';
import ImagePopup from './ImagePopup';
import Register from './Register';
import Login from './Login';
import InfoTooltip from './InfoTooltip';
import WithSetRes from './WithSetRes';


const App = () => {
  const navigate = useNavigate();
  
  const [currentUser, setCurrentUser] = useState({});
  
  const [isAuthSuccessful, setIsAuthSuccessful] = useState(false);
  const [authInfo, setAuthInfo] = useState({isLoggedIn: true, userEmail: ''});
  
  const [isPopupOpen, setIsPopupOpen] = useState({
    editAvatarPopup: false,
    editProfilePopup: false,
    addPlacePopup: false,
    deletePlacePopup: false,
    cardPreviewPopup: false
  });
  
  const [isInfoToolTipOpen, setIsInfoToolTipOpen] = useState(false)
  
  const [isUpdating, setIsUpdating] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState({});
  const [cardToDelete, setCardToDelete] = useState({});
  
  
  // set initial current user info and initial cards
  
  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userData, initialCards]) => {
        setCurrentUser(userData);
        setCards(initialCards);
      })
      .catch(err => console.log(err))
      .finally(() => setIsLoading(false));
  }, []);
  
  
  // handle registration and authorization
  
  const handleSignUp = userInfo => {
    setIsLoading(true);
    setIsUpdating(true);
    
    auth.register(userInfo)
      .then(() => {
        setIsAuthSuccessful(true);
        handleInfoToolTip();
  
        navigate('/sign-in', {replace: true})
      })
      .catch(err => {
        setIsAuthSuccessful(false);
        handleInfoToolTip();
        
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
        setIsUpdating(false);
      });
  
    // eslint-disable-next-line
  };
  
  const handleSignIn = userInfo => {
    setIsLoading(true);
    setIsUpdating(true);
    
    auth.authorize(userInfo)
      .then(data => {
        localStorage.setItem('jwt', data['token']);
        
        checkToken();
      })
      .catch(err => {
        setIsAuthSuccessful(false);
        handleInfoToolTip();
        
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
        setIsUpdating(false);
      });
  
    // eslint-disable-next-line
  };
  
  const checkToken = () => {
    const jwt = localStorage.getItem('jwt');
    
    if (jwt) {
      setIsUpdating(true);
      
      auth.getContent(jwt)
        .then(res => {
          setAuthInfo({...authInfo,
            isLoggedIn: true,
            userEmail: res.data.email
          });
          
          navigate('/', {replace: true});
        })
        .catch(err => console.log(err))
        .finally(() => setIsUpdating(false));
    } else {
      setAuthInfo({...authInfo,
        isLoggedIn: false,
        userEmail: ''
      });
    }
  };
  
  useEffect(() => {
    checkToken();
  
    // eslint-disable-next-line
  }, []);
  
  
  // handle sign out
  
  const handleSignOut = () => {
    localStorage.removeItem('jwt');
    checkToken();
    
    navigate('/sign-in');
  };
  
  
  // handle open tooltip
  
  const handleInfoToolTip = () => {
    setIsInfoToolTipOpen(true);
  };
  
  
  // handle close info tooltip
  
  const closeInfoToolTip = () => {
    setIsInfoToolTipOpen(false);
  };
  
  
  // handle open popup
  
  const handleEditAvatarClick = () => {
    setIsPopupOpen({...isPopupOpen,
      editAvatarPopup: true
    });
  };
  
  const handleEditProfileClick = () => {
    setIsPopupOpen({...isPopupOpen,
      editProfilePopup: true
    });
  };
  
  const handleAddPlaceClick = () => {
    setIsPopupOpen({...isPopupOpen,
      addPlacePopup: true
    });
  };
  
  const handleDeletePlaceClick = card => {
    setCardToDelete(card);
    
    setIsPopupOpen({...isPopupOpen,
      deletePlacePopup: true
    });
  };
  
  
  // handle close all popups
  
  const closeAllPopups = () => {
    setIsPopupOpen({...isPopupOpen,
      editAvatarPopup: false,
      editProfilePopup: false,
      addPlacePopup: false,
      deletePlacePopup: false,
      cardPreviewPopup: false
    });
    
    const cleanUp = () => setSelectedCard({});
    setTimeout(cleanUp, 200);
  };
  
  
  // handle cards
  
  const handleCardClick = card => {
    setIsPopupOpen({...isPopupOpen,
      cardPreviewPopup: true
    });
    
    setSelectedCard(card);
  };
  
  const handleCardLikeClick = card => {
    const isLiked = card['likes'].some(like => like['_id'] === currentUser['_id']);
  
    api.changeLikeCardStatus(card['_id'], isLiked)
      .then(newCard => setCards(cards.map(c => c['_id'] === card['_id'] ? newCard : c)))
      .catch(err => console.log(err));
  };
  
  
  // handle forms
  
  const handleUpdateAvatar = ({userAvatar}) => {
    setIsUpdating(true);
    
    api.patchUserAvatar({avatar: userAvatar})
      .then(res => setCurrentUser(res))
      .then(() => closeAllPopups())
      .catch(err => console.log(err))
      .finally(() => setIsUpdating(false));
  };
  
  const handleUpdateUser = ({userName, userAbout}) => {
    setIsUpdating(true);
    
    api.patchUserInfo({name: userName, about: userAbout})
      .then(res => setCurrentUser(res))
      .then(() => closeAllPopups())
      .catch(err => console.log(err))
      .finally(() => setIsUpdating(false));
  };
  
  const handleAddPlace = ({placeName, placeLink}) => {
    setIsUpdating(true);
    
    api.postCard({name: placeName, link: placeLink})
      .then(card => setCards([card, ...cards]))
      .then(() => closeAllPopups())
      .catch(err => console.log(err))
      .finally(() => setIsUpdating(false));
  };
  
  const handleDeletePlace = card => {
    setIsUpdating(true);
    
    api.deleteCard(card['_id'])
      .then(() => setCards(cards.filter(c => c['_id'] !== card['_id'])))
      .then(() => closeAllPopups())
      .catch(err => console.log(err))
      .finally(() => setIsUpdating(false));
  };
  
  return (
    <AuthContext.Provider value={authInfo}>
      <CurrentUserContext.Provider value={currentUser}>
        <WithSetRes
          element={Header}
          onSignOut={handleSignOut}
        />
          <Routes>
            <Route path="/" element={
              <ProtectedRoute
                element={Main}
                cards={cards}
                isLoading={isLoading}
                isUpdating={isUpdating}
                onEditAvatarClick={handleEditAvatarClick}
                onEditProfileClick={handleEditProfileClick}
                onAddPlaceClick={handleAddPlaceClick}
                onCardClick={handleCardClick}
                onCardLikeClick={handleCardLikeClick}
                onCardDeleteClick={handleDeletePlaceClick}
              />
            }
            />
            <Route path="/sign-up" element={<Register onSignUp={handleSignUp} isUpdating={isUpdating}/>}/>
            <Route path="/sign-in" element={<Login onSignIn={handleSignIn} isUpdating={isUpdating}/>}/>
            <Route path="*" element={<Navigate to="/" replace/>}/>
          </Routes>
        <EditProfilePopup
          isOpen={isPopupOpen.editProfilePopup}
          onUpdateUser={handleUpdateUser}
          isUpdating={isUpdating}
          onClose={closeAllPopups}
          validate={true}
        />
      </CurrentUserContext.Provider>
      <Footer/>
      <EditAvatarPopup
        isOpen={isPopupOpen.editAvatarPopup}
        onUpdateAvatar={handleUpdateAvatar}
        isUpdating={isUpdating}
        onClose={closeAllPopups}
      />
      <AddPlacePopup
        isOpen={isPopupOpen.addPlacePopup}
        onAddPlace={handleAddPlace}
        isUpdating={isUpdating}
        onClose={closeAllPopups}
      />
      <DeletePlacePopup
        isOpen={isPopupOpen.deletePlacePopup}
        onDeletePlace={handleDeletePlace}
        cardToDelete={cardToDelete}
        isUpdating={isUpdating}
        onClose={closeAllPopups}
      />
      <ImagePopup
        card={selectedCard}
        isOpen={isPopupOpen.cardPreviewPopup}
        onClose={closeAllPopups}
      />
      <InfoTooltip
        isOpen={isInfoToolTipOpen}
        isAuthSuccessful={isAuthSuccessful}
        onClose={closeInfoToolTip}/>
    </AuthContext.Provider>
  );
};

export default App;