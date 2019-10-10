import {
  readApplicationNames,
  readQVFile,
  writeQVFile
} from "./nativeFileAccess";
import uuidv4 from "uuid/v4";
import { secondsTimeStampNow } from "../dateHelpers";

/**
 * @returns {Promise<Array.<Object>>} - Returns the application names from the json file
 */
async function getQVWNames() {
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

/**
 * updateQVVariable
 *
 * @param {*} id
 * @param {*} updatedQVVar
 * @returns {array} - returns the latest version of all the variables
 */
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

/**
 * insertQVVariable
 *
 * @param {*} newQVVariable - new Variable object
 * @returns
 */
async function insertQVVariable(newQVVariable) {
  // Load variable file
  let qvVariables = await getQVVariables();
  qvVariables.push(newQVVariable);
  await writeQVFile("VAR", qvVariables);
  return qvVariables;
}

/**
 * deleteQVVariable
 *
 * @param {string} id - id of variable to delete
 * @returns
 */
async function deleteQVVariable(id) {
  // Load variable file
  let qvVariables = await getQVVariables();
  qvVariables = qvVariables.filter(variable => variable.id !== id);
  await writeQVFile("VAR", qvVariables);
  return qvVariables;
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

//=========================================================================
//= QVWNAME FILE FUNCTIONS
//=========================================================================
/**
 *
 * @param {string} newQVWName - the new QVW Name to add
 * @param {array} existingQVWNames - array of object of the existing QVW Names
 * @returns {object} - return the newQVWNameObj, this will have added the id to it
 */
async function saveQVWName(newQVWName, existingQVWNames) {
  let newQVWNameObj = { id: uuidv4(), qvwName: newQVWName };
  await writeQVFile("QVWNAMES", [...existingQVWNames, newQVWNameObj]);
  return newQVWNameObj;
}

/**
 *
 * @param {string} id - id of QVW Name to delete
 * @param {array} existingQVWNames - array of object of the existing QVW Names
 * @returns {object} -
 */
async function deleteQVWName(QVWNames) {
  return await writeQVFile("QVWNAMES", QVWNames);
}

//--------------------------------------
//- SETTINGS
//--------------------------------------
async function getSettings() {
  let settings = await readQVFile("SETTINGS");
  console.log("Full Settings file contents", settings);
  return settings;
}
//=========================================================================
//= EXPORT FUNCTIONS
//=========================================================================
export {
  getQVWNames,
  getQVVariables,
  getQVGroups,
  updateQVVariable,
  insertQVVariable,
  deleteQVVariable,
  saveQVWName,
  deleteQVWName,
  getSettings
};
