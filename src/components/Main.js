import React from 'react';
import api from '../utils/Api';
import Card from './Card';

function Main(props) {
    const [userName, setUserName] = React.useState('');
    const [userDescription, setUserDescription] = React.useState('');
    const [userAvatar, setUserAvatar] = React.useState('');
    const [cards, setCards] = React.useState([]);

    React.useEffect(() => {
        Promise.all([
            api.getUser(),
            api.getInitialCards()
        ])
            .then((values) => {
                const [user, initialCards] = values;
                setUserName(user.name);
                setUserDescription(user.about);
                setUserAvatar(user.avatar);
                setCards(initialCards);
            })
            .catch((err) => console.log(err));
    }, []);

    return (

    <main className="content">
      <section className="profile">
        <button className="profile__avatar-image" onClick={props.onEditAvatar} type="button">
        <img alt="Портрет" className="profile__avatar" src={userAvatar}/>
        </button>
        <div className="profile__input">
          <div className="profile__text">
            <h1 className="profile__name-field">{userName}</h1>
            <p className="profile__career-field">{userDescription}</p>
          </div>
          <button className="profile__edit" onClick={props.onEditProfile} type="button">
          </button>
        </div>
        <button className="profile__add-image" onClick={props.onAddPlace} type="button">
        </button>
      </section>

      <section className="elements">
        {cards.map(card =>
              <Card
                key={card._id}
                card={card}
                onCardClick={props.onCardClick}
            />
            )}
      </section>
    </main>
  )
}

export default Main;
