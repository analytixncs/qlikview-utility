import { readApplicationNames, readQVVariables } from "./nativeFileAccess";

/**
 * @returns {Promise<Array.<Object>>} - Returns the application names from the json file
 */
async function getApplicationNames() {
  let appNames = await readApplicationNames();
  return appNames;
}

/**
 * @returns {Promise<Array.<Object>>} - Returns the variables store in qvVariables.json
 */
async function getQVVariables() {
  let qvVariables = await readQVVariables();
  return qvVariables;
}

export { getApplicationNames, getQVVariables };
