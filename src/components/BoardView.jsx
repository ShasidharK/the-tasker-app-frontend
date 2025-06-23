import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLists, createList, deleteList } from "../store/listsSlice";
import Lists from "./Lists";

function BoardView({ board, onBack }) {
  const dispatch = useDispatch();
  const { items: lists, status, error } = useSelector(state => state.lists);
  const [newList, setNewList] = useState("");

  useEffect(() => {
    if (board) {
      dispatch(fetchLists(board.id));
    }
  }, [dispatch, board]);

  const handleCreate = (e) => {
    e.preventDefault();
    if (newList.trim()) {
      dispatch(createList({ title: newList, boardId: board.id }));
      setNewList("");
    }
  };

  if (!board) return null;

  return (
    <div className="boardview-container">
      <button className="boardview-back" onClick={onBack}>← Back to Boards</button>
      <h2 className="boardview-title">{board.name}</h2>
      <form className="boardview-form" onSubmit={handleCreate}>
        <input
          className="boardview-input"
          type="text"
          placeholder="Add new list"
          value={newList}
          onChange={e => setNewList(e.target.value)}
        />
        <button className="boardview-btn" type="submit">Add List</button>
      </form>
      {status === "loading" && <div>Loading lists...</div>}
      {error && <div className="boardview-error">{error}</div>}
      <Lists lists={lists} boardId={board.id} />
    </div>
  );
}

export default BoardView;