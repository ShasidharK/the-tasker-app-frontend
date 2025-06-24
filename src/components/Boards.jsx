import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchBoards, createBoard, deleteBoard } from "../store/boardsSlice";

function Boards({ onSelectBoard }) {
  const dispatch = useDispatch();
  const { items: boards, status, error } = useSelector(state => state.boards);
  const [newBoard, setNewBoard] = useState({title:"", description:"", backgroundColor: ""});

  useEffect(() => {
    dispatch(fetchBoards());
  }, [dispatch]);

  const handleCreate = (e) => {
    e.preventDefault();
    if (newBoard.title.trim()) {
      dispatch(createBoard(newBoard));
      setNewBoard({title:"", description:"", backgroundColor: ""});
    }
  };

  return (
    <div className="boards-container">
      <h2 className="boards-title">Your Boards</h2>
      <form className="boards-form" onSubmit={handleCreate}>
        <input
          className="boards-input"
          type="text"
          placeholder="Title"
          value={newBoard.title}
          onChange={e => setNewBoard({...newBoard, title: e.target.value})}
        />
         <input
          className="boards-input"
          type="text"
          placeholder="Description"
          value={newBoard.description}
          onChange={e => setNewBoard({...newBoard, description: e.target.value})}
        />
        <div>
          <label>
            <input type="color" className="boards-input" value={newBoard.backgroundColor} onChange={e => setNewBoard({...newBoard, backgroundColor: e.target.value})}/>
            <span>Add a background color</span>
          </label>
        </div>

        <button className="boards-btn" type="submit">Add</button>
      </form>
      {status === "loading" && <div>Loading...</div>}
      {error && <div className="boards-error">{error}</div>}
      <div className="boards-list">
        {boards.map(board => (
          <div key={board.id} onClick={() => onSelectBoard(board)} className="board-item">
            <h1 className="board-link">{board.title}</h1>
            <p className="board-description">{board.description}</p>
            <button className="board-delete" onClick={(e) => {e.stopPropagation();dispatch(deleteBoard(board.id))}}>✕</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Boards;