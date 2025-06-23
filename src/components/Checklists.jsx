import React from "react";
import { useDispatch } from "react-redux";
import { deleteChecklist } from "../store/checklistsSlice";
import Checkitems from "./Checkitems";

function Checklists({ checklists, cardId }) {
  const dispatch = useDispatch();

  return (
    <div className="checklists-container">
      {checklists.filter(cl => cl.CardId === cardId).map(cl => (
        <div key={cl.id} className="checklist-item">
          <div className="checklist-header">
            <span className="checklist-title">{cl.title}</span>
            <button className="checklist-delete" onClick={() => dispatch(deleteChecklist(cl.id))}>✕</button>
          </div>
          <Checkitems checklistId={cl.id} Checkitems={cl.ChecklistItems} />
        </div>
      ))}
    </div>
  );
}

export default Checklists;