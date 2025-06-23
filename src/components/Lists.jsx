import React from "react";
import { useDispatch } from "react-redux";
import { deleteList } from "../store/listsSlice";
import Cards from "./Cards";


function Lists({ lists, boardId }) {
  const dispatch = useDispatch();

  return (
    <div className="lists-container">
      {lists.map(list => (
        <div key={list.id} className="list-item">
          <div className="list-header">
            <span className="list-title">{list.title}</span>
            <button className="list-delete" onClick={() => dispatch(deleteList(list.id))}>✕</button>
          </div>
          <Cards listId={list.id} Cards={list.Cards} />
        </div>
      ))}
    </div>
  );
}

export default Lists;