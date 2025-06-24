import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCards, createCard, deleteCard, updateCard } from "../store/cardsSlice";
import CardModal from "./CardModal";
import EditIcon from "../assets/EditIcon";
import DeleteIcon from "../assets/DeleteIcon";
import SaveIcon from "../assets/SaveIcon";
import CancelIcon from "../assets/CancelIcon";

function Cards({ listId }) {
  const dispatch = useDispatch();
  const { items: cards, status, error } = useSelector(state => state.cards);
  const [newCard, setNewCard] = useState("");
  const [selectedCard, setSelectedCard] = useState(null);
  const [editingCard, setEditingCard] = useState(null);
  const [editForm, setEditForm] = useState({ title: "" });

  const handleCreate = (e) => {
    e.preventDefault();
    if (newCard.trim()) {
      dispatch(createCard({ title: newCard, listId }));
      setNewCard("");
    }
  };

  const handleEdit = (e) => {
    e.preventDefault();
    if (editForm.title.trim() && editingCard) {
      dispatch(updateCard({ id: editingCard.id, title: editForm.title }));
      setEditingCard(null);
    }
  };

  const startEditing = (card, e) => {
    e.stopPropagation();
    setEditingCard(card);
    setEditForm({ title: card.title });
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
            {editingCard && editingCard.id === card.id ? (
              <form className="card-edit-form" onSubmit={handleEdit} onClick={(e) => e.stopPropagation()}>
                <input
                  className="card-input"
                  type="text"
                  placeholder="Title"
                  value={editForm.title}
                  onChange={e => setEditForm({...editForm, title: e.target.value})}
                />
                <div className="card-edit-actions" style={{display:"inline-flex"}}>
                  <button className="card-save btn-svg" type="submit"><SaveIcon/></button>
                  <button className="card-cancel btn-svg" onClick={(e) => {e.preventDefault(); setEditingCard(null);}}><CancelIcon/></button>
                </div>
              </form>
            ) : (
              <>
                <span className="card-title" onClick={() => setSelectedCard(card)}>{card.title}</span>
                <div className="card-actions" style={{display:"inline-flex"}}>
                  <button className="btn-svg" onClick={(e) => startEditing(card, e)}><EditIcon/></button>
                  <button className="btn-svg" onClick={() => dispatch(deleteCard(card.id))}><DeleteIcon/></button>
                </div>
              </>
            )}
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