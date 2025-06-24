import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteChecklist } from "../store/checklistsSlice";
import Checkitems from "./Checkitems";

function Checklists({ cardId }) {
  const dispatch = useDispatch();
  const { items: checklists, status, error } = useSelector(state => state.checklists);

  return (
    <>
    {status === "loading" && <div>Loading checklists...</div>}
    {error && <div className="modal-error">{error}</div>}
    <div className="checklists-container">
      {checklists.filter(cl => cl.CardId === cardId).map(cl => (
        <div key={cl.id} className="checklist-item">
          <div className="checklist-header">
            <span className="checklist-title">{cl.title}</span>
            <button className="checklist-delete" onClick={() => dispatch(deleteChecklist(cl.id))}>✕</button>
          </div>
          <Checkitems checklistId={cl.id} />
        </div>
      ))}
    </div>
    </>
  );
}

export default Checklists;