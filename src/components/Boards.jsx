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
    if (newBoard.title.trim() && newBoard.description.trim() && newBoard.backgroundColor.trim()) {
      dispatch(createBoard(newBoard));
      setNewBoard("");
    }
  };

  return (
    <div className="boards-container">
      <h2 className="boards-title">Your Boards</h2>
      <form className="boards-form" onSubmit={handleCreate}>
        <input
          className="boards-input"
          type="text"
          placeholder="Board Title"
          value={newBoard.title}
          onChange={e => setNewBoard({...newBoard, title: e.target.value})}
        />
        <textarea
          className="boards-input"
          placeholder="Board Description"
          value={newBoard.description}
          onChange={e => setNewBoard({...newBoard, description: e.target.value})}
        />
        <label htmlFor="color"> Color 
        <input
          name="color"
          className="boards-input"
          type="color"
          value={newBoard.backgroundColor}
          onChange={e => setNewBoard({...newBoard, backgroundColor: e.target.value})}
          />
          </label>
        <button className="boards-btn" type="submit">Add Board</button>
      </form>
      {status === "loading" && <div>Loading...</div>}
      {error && <div className="boards-error">{error}</div>}
      <div className="boards-list">
        {boards.map(board => (
          <div key={board.id} className="board-item" style={{backgroundColor: board.backgroundColor}}>
            <h1 onClick={() => onSelectBoard(board)} className="board-link">{board.title}</h1>
            <p>{board.description}</p>
            <button className="board-delete" onClick={() => dispatch(deleteBoard(board.id))}>✕</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Boards;