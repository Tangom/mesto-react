function Card(props) {
  function handleClick() {
    props.onCardClick(props.card);
  }

  return (
    <div className="element">
      <button className="element__deleted" type="button"></button>
      <img onClick={handleClick} src={props.card.link} alt={props.card.name} className="element__image"/>
      <div className="element__content">
        <h2 className="element__text">{props.card.name}</h2>
        <div className="element__content-like">
          <button className="element__like" type="button"></button>
          <p className="element__result">{props.card.likes.length}</p>
        </div>
      </div>
    </div>
  );
}

export default Card;
