import {
  readApplicationNames,
  readQVFile,
  writeQVFile
} from "./nativeFileAccess";
import { secondsTimeStampNow } from "../dateHelpers";

/**
 * @returns {Promise<Array.<Object>>} - Returns the application names from the json file
 */
async function getApplicationNames() {
  let appNames = await readApplicationNames();
  return appNames;
}

//=========================================================================
//= VARIABLE FILE FUNCTIONS
//=========================================================================
/**
 * @param {string} application - optional.  If passed, filters by application, thus only returns that applications variables.
 * @returns {Promise<Array.<Object>>} - Returns the variables store in qvVariables.json
 */
async function getQVVariables(application = undefined) {
  let qvVariables = await readQVFile("VAR");
  if (application) {
    qvVariables = qvVariables.filter(
      qvVar => qvVar.application === application
    );
  }
  return qvVariables;
}

async function updateQVVariable(id, updatedQVVar) {
  // Load variable file
  let qvVariables = await getQVVariables();

  let existingQVVar = qvVariables.filter(qvVar => qvVar.id === id)[0];

  // This ensures we get the createDate and createUser from the original record
  // currently not reading these in.
  updatedQVVar = {
    ...existingQVVar,
    ...updatedQVVar
  };

  // to preserver order, loop through and update the variable when found.
  let newQVVars = qvVariables.map(qvVar => {
    if (qvVar.id === id) {
      return updatedQVVar;
    }
    return qvVar;
  });

  // OPTION 2: if preserving order is not important
  // building new content be returning all variables minus the one we are updating (filter())
  // then appending the new variable on to the end.
  // let newQVVars = [...qvVariables.filter(qvVar => qvVar.id !== id), updatedQVVar];

  await writeQVFile("VAR", newQVVars);
  return newQVVars;
}
//=========================================================================
//= GROUP FILE FUNCTIONS
//=========================================================================
/**
 * @param {string} application - optional.  If passed, filters by application, thus only returns that applications groups.
 * @returns {Promise<Array.<Object>>} - Returns the groups store in qvGroups.json
 */
async function getQVGroups(application = undefined) {
  let qvGroups = await readQVFile("GROUP");
  if (application) {
    qvGroups = qvGroups.filter(qvGroup => qvGroup.application === application);
  }
  return qvGroups;
}

export { getApplicationNames, getQVVariables, getQVGroups, updateQVVariable };
