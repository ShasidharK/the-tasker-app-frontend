import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCheckitems, createCheckitem, deleteCheckitem, updateCheckitem } from "../store/checkitemsSlice";

function Checkitems({ checklistId }) {
  const dispatch = useDispatch();
  const { items: checkitems, status, error } = useSelector(state => state.checkitems);
  const [newItem, setNewItem] = useState("");

  useEffect(() => {
    if (checklistId) {
      dispatch(fetchCheckitems(checklistId));
    }
  }, [dispatch, checklistId]);

  const handleCreate = (e) => {
    e.preventDefault();
    if (newItem.trim()) {
      dispatch(createCheckitem({ text: newItem, checklistId }));
      setNewItem("");
    }
  };

  const handleToggle = (item) => {
    dispatch(updateCheckitem({ id: item.id, completed: !item.completed }));
  };

  return (
    <div className="checkitems-container">
      <form className="checkitems-form" onSubmit={handleCreate}>
        <input
          className="checkitems-input"
          type="text"
          placeholder="Add new item"
          value={newItem}
          onChange={e => setNewItem(e.target.value)}
        />
        <button className="checkitems-btn" type="submit">Add</button>
      </form>
      {status === "loading" && <div>Loading items...</div>}
      {error && <div className="checkitems-error">{error}</div>}
      <ul className="checkitems-list">
        {checkitems.filter(cli => cli.ChecklistId === checklistId).map(item => (
          <li key={item.id} className="checkitem">
            <input
              type="checkbox"
              checked={item.completed}
              onChange={() => handleToggle(item)}
            />
            <span className={item.completed ? "checkitem-completed" : ""}>{item.text}</span>
            <button className="checkitem-delete" onClick={() => dispatch(deleteCheckitem(item.id))}>✕</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Checkitems;