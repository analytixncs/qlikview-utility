import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";

const QVWSelection = createSelector(
  state => state.QVWs,
  QVWs => QVWs
);
function SelectApplicationQVW() {
  const QVWs = useSelector(QVWSelection);
  console.log(QVWs);
  return (
    <ul>
      {QVWs &&
        QVWs.map(qvw => {
          return (
            <li key={qvw.id}>
              <Link to={`/${qvw.qvwName}`}>{qvw.qvwName}</Link>
            </li>
          );
        })}
    </ul>
  );
}

export default SelectApplicationQVW;
