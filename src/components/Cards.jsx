import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCards, createCard, deleteCard } from "../store/cardsSlice";
import CardModal from "./CardModal";

function Cards({ listId }) {
  const dispatch = useDispatch();
  const { items: cards, status, error } = useSelector(state => state.cards);
  const [newCard, setNewCard] = useState("");
  const [selectedCard, setSelectedCard] = useState(null);

  const handleCreate = (e) => {
    e.preventDefault();
    if (newCard.trim()) {
      dispatch(createCard({ title: newCard, listId }));
      setNewCard("");
    }
  };

  return (
    <div className="cards-container">
      <form className="cards-form" onSubmit={handleCreate}>
        <input
          className="cards-input"
          type="text"
          placeholder="Add new card"
          value={newCard}
          onChange={e => setNewCard(e.target.value)}
        />
        <button className="cards-btn" type="submit">Add</button>
      </form>
      {status === "loading" && <div>Loading cards...</div>}
      {/* {error && <div className="cards-error">{error}</div>} */}
      <div className="cards-list">
        {cards.filter(card => card.ListId === listId).map(card => (
          <div key={card.id} className="card-item">
            <span className="card-title" onClick={() => setSelectedCard(card)}>{card.title}</span>
            <button className="card-delete" onClick={() => dispatch(deleteCard(card.id))}>✕</button>
          </div>
        ))}
      </div>
      {selectedCard && (
        <CardModal listId={listId} card={selectedCard} onClose={() => setSelectedCard(null)} />
      )}
    </div>
  );
}

export default Cards;