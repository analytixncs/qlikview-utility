import React from "react";
import PropTypes from "prop-types";

function GroupMain(props) {
  console.log("GroupMain", props);
  return (
    <div>
      <h1>Group Editor Main</h1>
      <button onClick={() => props.history.push("/")}>Home</button>
    </div>
  );
}

GroupMain.propTypes = {};

export default GroupMain;
