import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchChecklists, createChecklist, deleteChecklist } from "../store/checklistsSlice";
import Checklists from "./Checklists";
import { fetchCards, updateCard } from "../store/cardsSlice";
import EditIcon from "../assets/EditIcon";
import SaveIcon from "../assets/SaveIcon";
import CancelIcon from "../assets/CancelIcon";

function CardModal({ listId, card, onClose }) {
  const dispatch = useDispatch();
  const [newChecklist, setNewChecklist] = useState("");
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [editedTitle, setEditedTitle] = useState("");

  useEffect(() => {
    if (card) {
      dispatch(fetchChecklists(card.id));
    }
  }, [dispatch, card]);

  useEffect(() => {
    if (listId) {
      dispatch(fetchCards(listId));
    }
    // console.log(cards);
  }, [dispatch, listId]);

  const handleCreate = (e) => {
    e.preventDefault();
    if (newChecklist.trim()) {
      dispatch(createChecklist({ title: newChecklist, cardId: card.id }));
      setNewChecklist("");
    }
  };

  const startEditingTitle = () => {
    setIsEditingTitle(true);
    setEditedTitle(card.title);
  };

  const handleTitleUpdate = (e) => {
    e.preventDefault();
    if (editedTitle.trim()) {
      dispatch(updateCard({ id: card.id, title: editedTitle }));
      setIsEditingTitle(false);
    }
  };

  const cancelEditingTitle = () => {
    setIsEditingTitle(false);
  };

  if (!card) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>✕</button>
        {isEditingTitle ? (
          <form className="modal-title-edit-form" onSubmit={handleTitleUpdate}>
            <input
              className="modal-title-input"
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
            />
            <div className="modal-title-actions" style={{display:"inline-flex"}}>
              <button className="modal-save btn-svg" type="submit"><SaveIcon/></button>
              <button className="modal-cancel btn-svg" onClick={cancelEditingTitle}><CancelIcon/></button>
            </div>
          </form>
        ) : (
          <div className="modal-title-container" style={{display:"flex", alignItems:"center"}}>
            <h3 className="modal-title">{card.title}</h3>
            <button className="modal-edit btn-svg" onClick={startEditingTitle}><EditIcon/></button>
          </div>
        )}
        <form className="modal-form" onSubmit={handleCreate}>
          <input
            className="modal-input"
            type="text"
            placeholder="Add new checklist"
            value={newChecklist}
            onChange={e => setNewChecklist(e.target.value)}
          />
          <button className="modal-btn" type="submit">Add Checklist</button>
        </form>
        <Checklists cardId={card.id} />
      </div>
    </div>
  );
}

export default CardModal;