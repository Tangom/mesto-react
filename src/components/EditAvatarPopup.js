import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {

  const avatarRef = React.useRef();

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
      name='avatar'
      title='Обновить аватар'
      buttonName='Сохранить'
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}

      children={
        <>
          <input className="popup__field popup__field_link" id='link-avatar-input' name="avatar"
                 placeholder="Ссылка на картинку"
                 required type="url" ref={avatarRef}/>
          <span className='popup__form-error' id='link-avatar-input-error'></span>
        </>
      }
    />
  )
}

export default EditAvatarPopup;