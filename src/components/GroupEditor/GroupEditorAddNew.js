import React from "react";
import { useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router";
import { addGroup } from "../../store/groupEditor";
import { secondsTimeStampNow } from "../../dateHelpers";

const GroupEditorAddNew = () => {
  let { selectedQVW } = useParams();
  let history = useHistory();
  let dispatch = useDispatch();
  React.useEffect(() => {
    let newGroup = {
      id: 1,
      application: selectedQVW,
      groupName: "_NewGroup",
      groupType: "Cyclic",
      groupNotes: "",
      createUser: "admin",
      createDate: secondsTimeStampNow()
    };
    console.log("NEW GRUOP", newGroup);
    history.goBack();
  }, [selectedQVW, dispatch]);
  return null;
};

export default GroupEditorAddNew;
