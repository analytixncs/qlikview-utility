import {
  readApplicationNames,
  readQVFile,
  writeQVFile,
  backupData
} from "./nativeFileAccess";
import uuidv4 from "uuid/v4";
import _ from "lodash";
import { secondsTimeStampNow, dateTimeFileFormatted } from "../dateHelpers";

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
 * @param {string} id
 * @param {object} updatedQVVar
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
 * @param {object} newQVVariable - new Variable object
 * @returns
 */
async function insertQVVariable(newQVVariable) {
  let qvVariables;
  // Load variable file
  try {
    qvVariables = await getQVVariables();
  } catch (e) {
    console.log(e);
    // if ENOENT we assume file doesn't exist, so we will push empty array
    // and let writeQVFile create the file
    if (e.code === "ENOENT") {
      qvVariables = [];
    }
  }
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

/**
 * updateQVGroup
 *
 * @param {string} id
 * @param {object} updatedQVGroup
 * @returns {array} - returns the latest version of all the Groups
 */
async function updateQVGroup(id, updatedQVGroup) {
  // Load Group file
  let qvGroups = await getQVGroups();

  let existingQVGroup = qvGroups.filter(qvGroup => qvGroup.id === id)[0];

  // This ensures we get the createDate and createUser from the original record
  // currently not reading these in.
  updatedQVGroup = {
    ...existingQVGroup,
    ...updatedQVGroup
  };

  // to preserver order, loop through and update the Group when found.
  let newQVGroups = qvGroups.map(qvGroup => {
    if (qvGroup.id === id) {
      return updatedQVGroup;
    }
    return qvGroup;
  });

  // OPTION 2: if preserving order is not important
  // building new content be returning all variables minus the one we are updating (filter())
  // then appending the new variable on to the end.
  // let newQVGroups = [...qvVariables.filter(qvVar => qvVar.id !== id), updatedQVGroup];

  await writeQVFile("GROUP", newQVGroups);
  return newQVGroups;
}

/**
 * insertQVGroup
 *
 * @param {object} newQVGroup - new Group object
 * @returns
 */
async function insertQVGroup(newQVGroup) {
  let qvGroups;
  // Load Group file
  try {
    qvGroups = await getQVGroups();
  } catch (e) {
    console.log(e);
    // if ENOENT we assume file doesn't exist, so we will push empty array
    // and let writeQVFile create the file
    if (e.code === "ENOENT") {
      qvGroups = [];
    }
  }

  qvGroups.unshift(newQVGroup);
  await writeQVFile("GROUP", qvGroups);
  return qvGroups;
}

/**
 * deleteQVGroup
 *
 * @param {string} id - id of Group to delete
 * @returns
 */
async function deleteQVGroup(id) {
  // Load Group file
  let qvGroups = await getQVGroups();
  qvGroups = qvGroups.filter(group => group.id !== id);
  await writeQVFile("GROUP", qvGroups);
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
 * Steps to delete a QVW Name:
 *  - Create a backup of variables for QVW
 *  - Remove all variables from qvvariables.json
 *  - Create a backup of groups fro QVW
 *  - Remove all groups from qvgroups.json
 *  - Remove QVW Name from qvwnames.json
 *
 * @param {string} id - id of QVW Name to delete
 * @param {array} existingQVWNames - array of object of the existing QVW Names
 * @returns {object} -
 */
async function deleteQVWName(qvwId) {
  let QVWNames = await readQVFile("QVWNAMES");
  let variables = await readQVFile("VAR");
  //Extract QVWName from QVWNames file
  let QVWName = QVWNames.filter(name => name.id === qvwId)[0].qvwName;
  let backupName = `${QVWName}-DeleteBackupOfVariables-${dateTimeFileFormatted(
    new Date()
  )}.json`;
  // Backup variables for given QVW
  let backupVariableData = variables.filter(
    variable => variable.application === QVWName
  );
  try {
    await backupData(backupName, JSON.stringify(backupVariableData));
  } catch (err) {
    throw err;
  }
  // Delete variables for given QVW
  variables = variables.filter(variable => variable.application !== QVWName);
  await writeQVFile("VAR", variables);

  //TODO Backup groups for given QVW

  // Remove QVW From qvwnames.json
  QVWNames = QVWNames.filter(qvw => qvw.id !== qvwId);
  await writeQVFile("QVWNAMES", QVWNames);
  return QVWNames;
}

//--------------------------------------
//- QVW Fields
//--------------------------------------

/**
 *
 *
 * @param {string} [qvwName=undefined] - QVW that we are editing currently
 * @returns {array} - filtered list of field name objects from qvwfields.json
 */
async function getQVWFields(qvwName = undefined) {
  let QVWFields = await readQVFile("QVWFIELDS");
  if (qvwName) {
    QVWFields = QVWFields.filter(field => field.application === qvwName);
  }

  return _.uniqBy(QVWFields, "field");
}

//--------------------------------------
//- SETTINGS
//--------------------------------------

/**
 * Returns the contents of the /data/settings.json file.
 *
 * @returns {array}
 */
async function getSettings() {
  let settings = await readQVFile("SETTINGS");
  // console.log("Full Settings file contents", settings);
  return settings;
}

async function saveSettings(updatedSettings) {
  console.log("updateSettings", updatedSettings);
  return writeQVFile("SETTINGS", updatedSettings);
}
//=========================================================================
//= EXPORT FUNCTIONS
//=========================================================================
export {
  getQVWNames,
  getQVVariables,
  getQVGroups,
  updateQVVariable,
  updateQVGroup,
  insertQVVariable,
  insertQVGroup,
  deleteQVVariable,
  deleteQVGroup,
  saveQVWName,
  deleteQVWName,
  getQVWFields,
  getSettings,
  saveSettings
};
