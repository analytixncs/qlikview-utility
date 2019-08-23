import React from "react";

function VarMainApp(props) {
  console.log("varMainApp", props);
  return <div>VarMainApp {props.match.params.qvw}</div>;
}

export default VarMainApp;
