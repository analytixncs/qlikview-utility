import React from "react";
import { withRouter, Link } from "react-router-dom";

function Settings(props) {
  return (
    <div>
      SETTINGS
      <button onClick={() => props.history.push("/")}>Home</button>
      <Link to="/vareditor/test">Test</Link>
    </div>
  );
}

export default withRouter(Settings);
