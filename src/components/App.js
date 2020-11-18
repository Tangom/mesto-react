import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import AddPlacePopup from './AddPlacePopup';
import EditAvatarPopup from './EditAvatarPopup';
import EditProfilePopup from './EditProfilePopup';
import api from '../utils/Api';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeStatus(card, isLiked).then((newCard) => {
      // Формируем новый массив на основе имеющегося, подставляя в него новую карточку
      const newCards = cards.map((c) => c._id === card._id ? newCard : c);
      // Обновляем стейт
      setCards(newCards);
    });
  }

  function handleCardDelete(card) {
    api.deleteCard(card)
      .then(() => {
        const newCards = cards.filter((i) => {
          return i._id !== card._id;
        });
        setCards(newCards);
      })
  }

  React.useEffect(() => {
    api.getAllData()
      .then((data) => {
        const [profile, cards] = data;
        setCards(cards);
        setCurrentUser(profile)
      })
      .catch((err) => console.log(err));
  }, [])

  function handleUpdateUser(data) {
    api.patchProfileEditing(data)
      .then(
        (data) => {
          setCurrentUser(data);
          closeAllPopups();
        })
      .catch((err) => console.log(err));
  }

  function handleUpdateAvatar(data) {
    api.patchUserAvatar(data)
      .then(
        (data) => {
          setCurrentUser(data);
          closeAllPopups();
        })
      .catch((err) => console.log(err));
  }

  function handleAddPlaceSubmit(data) {
    api.postAddCard(data)
      .then(
        (newCard) => {
          setCards([newCard, ...cards]);
          closeAllPopups();
        })
      .catch((err) => console.log(err));
  }

  function handleEditProfile() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlace() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatar() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleCard(card) {
    setIsImagePopupOpen(true);
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
    setSelectedCard({});
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <body className="root">

      <Header/>
      <Main
        cards={cards}
        onCardLike={handleCardLike}
        onCardDelete={handleCardDelete}
        onEditProfile={handleEditProfile}
        onAddPlace={handleAddPlace}
        onEditAvatar={handleEditAvatar}
        onCardClick={handleCard}
      />
      <Footer/>

      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
      />

      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
      />

      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlaceSubmit}
      />

      <PopupWithForm
        name="confirm"
        title="Вы уверены?"
        buttonName="Да"
      />

      <ImagePopup
        card={selectedCard}
        isOpen={isImagePopupOpen}
        onClose={closeAllPopups}
      />
      </body>
    </CurrentUserContext.Provider>
  );
}

export default App;
