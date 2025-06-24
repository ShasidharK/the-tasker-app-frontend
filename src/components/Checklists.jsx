import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteChecklist, updateChecklist } from "../store/checklistsSlice";
import Checkitems from "./Checkitems";
import EditIcon from "../assets/EditIcon";
import DeleteIcon from "../assets/DeleteIcon";
import SaveIcon from "../assets/SaveIcon";
import CancelIcon from "../assets/CancelIcon";

function Checklists({ cardId }) {
  const dispatch = useDispatch();
  const { items: checklists, status, error } = useSelector(state => state.checklists);
  const [editingChecklist, setEditingChecklist] = useState(null);
  const [editForm, setEditForm] = useState({ title: "" });

  const handleEdit = (e) => {
    e.preventDefault();
    if (editForm.title.trim() && editingChecklist) {
      dispatch(updateChecklist({ id: editingChecklist.id, title: editForm.title }));
      setEditingChecklist(null);
    }
  };

  const startEditing = (checklist, e) => {
    e.stopPropagation();
    setEditingChecklist(checklist);
    setEditForm({ title: checklist.title });
  };

  return (
    <>
    {status === "loading" && <div>Loading checklists...</div>}
    {error && <div className="modal-error">{error}</div>}
    <div className="checklists-container">
      {checklists.filter(cl => cl.CardId === cardId).map(cl => (
        <div key={cl.id} className="checklist-item">
          <div className="checklist-header">
            {editingChecklist && editingChecklist.id === cl.id ? (
              <form className="checklist-edit-form" onSubmit={handleEdit} onClick={(e) => e.stopPropagation()}>
                <input
                  className="checklist-input"
                  type="text"
                  placeholder="Title"
                  value={editForm.title}
                  onChange={e => setEditForm({...editForm, title: e.target.value})}
                />
                <div className="checklist-edit-actions" style={{display:"inline-flex"}}>
                  <button className="checklist-save btn-svg" type="submit"><SaveIcon/></button>
                  <button className="checklist-cancel btn-svg" onClick={(e) => {e.preventDefault(); setEditingChecklist(null);}}><CancelIcon/></button>
                </div>
              </form>
            ) : (
              <>
                <span className="checklist-title">{cl.title}</span>
                <div className="checklist-actions" style={{display:"inline-flex"}}>
                  <button className="btn-svg" onClick={(e) => startEditing(cl, e)}><EditIcon/></button>
                  <button className="btn-svg" onClick={() => dispatch(deleteChecklist(cl.id))}><DeleteIcon/></button>
                </div>
              </>
            )}
          </div>
          <Checkitems checklistId={cl.id} />
        </div>
      ))}
    </div>
    </>
  );
}

export default Checklists;