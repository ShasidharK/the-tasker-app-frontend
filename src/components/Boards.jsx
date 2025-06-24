import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchBoards, createBoard, deleteBoard, updateBoard } from "../store/boardsSlice";
import EditIcon from "../assets/EditIcon";
import DeleteIcon from "../assets/DeleteIcon";
import SaveIcon from "../assets/SaveIcon";
import CancelIcon from "../assets/CancelIcon";

function Boards({ onSelectBoard }) {
  const dispatch = useDispatch();
  const { items: boards, status, error } = useSelector(state => state.boards);
  const [newBoard, setNewBoard] = useState({title:"", description:"", backgroundColor: ""});
  const [editingBoard, setEditingBoard] = useState(null);
  const [editForm, setEditForm] = useState({title:"", description:"", backgroundColor: ""});

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

  const handleEdit = (e) => {
    e.preventDefault();
    if (editForm.title.trim() && editingBoard) {
      dispatch(updateBoard({ id: editingBoard.id, ...editForm }));
      setEditingBoard(null);
    }
  };

  const startEditing = (board, e) => {
    e.stopPropagation();
    setEditingBoard(board);
    setEditForm({
      title: board.title,
      description: board.description || "",
      backgroundColor: board.backgroundColor || ""
    });
  };

  return (
    <div className="boards-container">
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
        <h2 className="boards-title">Your Boards</h2>
      <div className="boards-list">
        {boards.map(board => (
          <div key={board.id} style={{backgroundColor: board.backgroundColor}} onClick={() => onSelectBoard(board)} className="board-item">
            {editingBoard && editingBoard.id === board.id ? (
              <form className="board-edit-form" onSubmit={handleEdit} onClick={(e) => e.stopPropagation()}>
                <input
                  className="boards-input"
                  type="text"
                  placeholder="Title"
                  value={editForm.title}
                  onChange={e => setEditForm({...editForm, title: e.target.value})}
                />
                <input
                  className="boards-input"
                  type="text"
                  placeholder="Description"
                  value={editForm.description}
                  onChange={e => setEditForm({...editForm, description: e.target.value})}
                />
                <div>
                  <label>
                    <input 
                      type="color" 
                      className="boards-input" 
                      value={editForm.backgroundColor} 
                      onChange={e => setEditForm({...editForm, backgroundColor: e.target.value})}
                    />
                    <span>Background color</span>
                  </label>
                </div>
                <div className="board-edit-actions" style={{display:"inline-flex"}}>
                  <button className="board-save btn-svg" type="submit"><SaveIcon/></button>
                  <button className="board-cancel btn-svg" onClick={(e) => {e.preventDefault(); setEditingBoard(null);}}>{<CancelIcon/>}</button>
                </div>
              </form>
            ) : (
              <div>
                <h1 className="board-link">{board.title}</h1>
                <p className="board-description">{board.description}</p>
                <div className="board-actions" style={{display:"inline-flex"}}>
                  <button className="btn-svg" onClick={(e) => startEditing(board, e)}><EditIcon/></button>
                  <button className="btn-svg" onClick={(e) => {e.stopPropagation();dispatch(deleteBoard(board.id))}}><DeleteIcon/></button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Boards;