import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteList, updateList } from "../store/listsSlice";
import Cards from "./Cards";
import EditIcon from "../assets/EditIcon";
import DeleteIcon from "../assets/DeleteIcon";
import SaveIcon from "../assets/SaveIcon";
import CancelIcon from "../assets/CancelIcon";


function Lists({ lists, boardId }) {
  const dispatch = useDispatch();
  const [editingList, setEditingList] = useState(null);
  const [editForm, setEditForm] = useState({ title: "" });

  const handleEdit = (e) => {
    e.preventDefault();
    if (editForm.title.trim() && editingList) {
      dispatch(updateList({ id: editingList.id, title: editForm.title }));
      setEditingList(null);
    }
  };

  const startEditing = (list, e) => {
    e.stopPropagation();
    setEditingList(list);
    setEditForm({ title: list.title });
  };

  return (
    <div className="lists-container">
      {lists.map(list => (
        <div key={list.id} className="list-item">
          <div className="list-header">
            {editingList && editingList.id === list.id ? (
              <form className="list-edit-form" onSubmit={handleEdit} onClick={(e) => e.stopPropagation()}>
                <input
                  className="list-input"
                  type="text"
                  placeholder="Title"
                  value={editForm.title}
                  onChange={e => setEditForm({...editForm, title: e.target.value})}
                />
                <div className="list-edit-actions" style={{display:"inline-flex"}}>
                  <button className="list-save btn-svg" type="submit"><SaveIcon/></button>
                  <button className="list-cancel btn-svg" onClick={(e) => {e.preventDefault(); setEditingList(null);}}><CancelIcon/></button>
                </div>
              </form>
            ) : (
              <>
                <span className="list-title">{list.title}</span>
                <div className="list-actions" style={{display:"inline-flex"}}>
                  <button className="btn-svg" onClick={(e) => startEditing(list, e)}><EditIcon/></button>
                  <button className="btn-svg" onClick={() => dispatch(deleteList(list.id))}><DeleteIcon/></button>
                </div>
              </>
            )}
          </div>
          <Cards listId={list.id} />
        </div>
      ))}
    </div>
  );
}

export default Lists;