import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {

  const nameRef = React.useRef();
  const linkRef = React.useRef();

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onAddPlace({
      name: nameRef.current.value,
      link: linkRef.current.value,
    });
  }

  return (
    <PopupWithForm
      name='card'
      title='Новое место'
      buttonName='Создать'
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}

      children={
        <>
          <input className="popup__field popup__field_place" id='place-input' maxLength="30" minLength="1"
                 name="place"
                 placeholder="Название" required type="text" ref={nameRef}/>
          <span className='popup__form-error' id='place-input-error'></span>
          <input className="popup__field popup__field_link" id='link-input' name="link"
                 placeholder="Ссылка на картинку"
                 required type="url" ref={linkRef}/>
          <span className='popup__form-error' id='link-input-error'></span>
        </>
      }
    />
  )
}

export default AddPlacePopup;
