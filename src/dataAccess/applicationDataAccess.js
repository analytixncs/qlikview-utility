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

export { getApplicationNames, getQVVariables };
