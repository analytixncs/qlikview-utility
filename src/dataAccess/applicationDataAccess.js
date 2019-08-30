import { readApplicationNames, readQVFile } from "./nativeFileAccess";

/**
 * @returns {Promise<Array.<Object>>} - Returns the application names from the json file
 */
async function getApplicationNames() {
  let appNames = await readApplicationNames();
  return appNames;
}

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

export { getApplicationNames, getQVVariables, getQVGroups };
