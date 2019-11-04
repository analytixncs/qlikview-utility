import React from "react";
import { useHistory } from "react-router-dom";

function Settings(props) {
  let history = useHistory();
  return (
    <div>
      <h1>Settings</h1>
      <p>Not Yet Implemented</p>
      <button onClick={() => history.push("/")}>Home</button>
    </div>
  );
}

export default Settings;
