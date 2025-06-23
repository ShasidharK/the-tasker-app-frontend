import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchChecklists, createChecklist, deleteChecklist } from "../store/checklistsSlice";
import Checklists from "./Checklists";

function CardModal({ card, onClose }) {
  const dispatch = useDispatch();
  const { items:checklists, status, error } = useSelector(state => state.checklists);
  const [newChecklist, setNewChecklist] = useState("");

  useEffect(() => {
    if (card) {
      dispatch(fetchChecklists(card.id));
    }
  }, [dispatch, card]);

  const handleCreate = (e) => {
    e.preventDefault();
    if (newChecklist.trim()) {
      dispatch(createChecklist({ title: newChecklist, cardId: card.id }));
      setNewChecklist("");
    }
  };

  if (!card) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>✕</button>
        <h3 className="modal-title">{card.title}</h3>
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
        {status === "loading" && <div>Loading checklists...</div>}
        {error && <div className="modal-error">{error}</div>}
        <Checklists checklists={checklists} cardId={card.id} />
      </div>
    </div>
  );
}

export default CardModal;