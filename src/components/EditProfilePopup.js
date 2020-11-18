import React from 'react';
import PopupWithForm from './PopupWithForm';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  function handleChangeName(evt) {
    setName(evt.target.value);
  }

  function handleChangeDescription(evt) {
    setDescription(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onUpdateUser({
      name: name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name='profile'
      title='Редактировать профиль'
      buttonName='Сохранить'
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}

      children={
        <>
          <input className="popup__field popup__field_name" id='name-input' maxLength="40" minLength="2" name="name"
                 placeholder="Имя" required type="text" value={name} onChange={handleChangeName}/>
          <span className='popup__form-error' id='name-input-error'></span>
          <input className="popup__field popup__field_career" id='career-input' maxLength="200" minLength="2"
                 name="about"
                 placeholder="О себе" required type="text" value={description} onChange={handleChangeDescription}/>
          <span className='popup__form-error' id='career-input-error'></span>
        </>
      }
    />
  )
}

export default EditProfilePopup;