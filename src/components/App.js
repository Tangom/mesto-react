import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';


function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState('');

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
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard('');
  }

  return (
    <>
      <Header/>
      <Main
        onEditProfile={handleEditProfile}
        onAddPlace={handleAddPlace}
        onEditAvatar={handleEditAvatar}
        onCardClick={handleCard}
      />
      <Footer/>
      <PopupWithForm
        name='profile'
        title='Редактировать профиль'
        buttonName='Сохранить'
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}

        children={
          <>
            <input className="popup__field popup__field_name" id='name-input' maxLength="40" minLength="2" name="name"
                   placeholder="Имя" required type="text"/>
            <span className='popup__form-error' id='name-input-error'></span>
            <input className="popup__field popup__field_career" id='career-input' maxLength="200" minLength="2"
                   name="about"
                   placeholder="О себе" required type="text"/>
            <span className='popup__form-error' id='career-input-error'></span>
          </>
        }
      />
      <PopupWithForm
        name='card'
        title='Новое место'
        buttonName='Создать'
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}

        children={
          <>
            <input className="popup__field popup__field_place" id='place-input' maxLength="30" minLength="1"
                   name="place"
                   placeholder="Название" required type="text"/>
            <span className='popup__form-error' id='place-input-error'></span>
            <input className="popup__field popup__field_link" id='link-input' name="link"
                   placeholder="Ссылка на картинку"
                   required type="url"/>
            <span className='popup__form-error' id='link-input-error'></span>
          </>
        }
      />
      <PopupWithForm
        name='avatar'
        title='Обновить аватар'
        buttonName='Сохранить'
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}

        children={
          <>
            <input className="popup__field popup__field_link" id='link-avatar-input' name="avatar"
                   placeholder="Ссылка на картинку"
                   required type="url"/>
            <span className='popup__form-error' id='link-avatar-input-error'></span>
          </>
        }
      />
      <ImagePopup
        card={selectedCard}
        onClose={closeAllPopups}
      />
    </>
  );
}

export default App;
