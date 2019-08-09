import React from "react";

function SelectQVW({ QVWs }) {
  return (
    <ul>
      {QVWs.map(qvw => {
        return <li key={qvw.id}>{qvw.qvwName}</li>;
      })}
    </ul>
  );
}

export default SelectQVW;
