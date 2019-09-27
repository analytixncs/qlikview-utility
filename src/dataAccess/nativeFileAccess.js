//functions to access data from main electron thread
const path = require("path");
const fs = window.require("fs");
const _ = require("lodash");
const { remote } = window.require("electron");

// make promise version of fs.readFile()
const readFilePromise = filename => {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
};

// make promise version of fs.writeFile()
const writeFilePromise = (filename, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(filename, data, err => {
      if (err) reject(err);
      else resolve(filename);
    });
  });
};

// Files we will access
const FILES = {
  VAR_FILE: "qvvariables.json",
  GROUP_FILE: "qvgroups.json",
  QVWNAMES_FILE: "qvwnames.json",
  SETTINGS_FILE: "settings.json"
};

/** @memberof NativeFileAccess
 * Can't access the remote.app. feature except from within a function.  Probably after app has loaded.
 * passed either a constant with filename.ext, will return the path, relative to where the application EXE
 * is located.
 * @param {string} dataFile - filename.ext to get full path for
 * @returns {string} - returns full path including filename.ext.  will return "c:/appPath"/data/filename.ext
 *
 * @example
 * let varFile = getLocalFile("qvvariables.json")
 * // varFile = "c:\app\path\data\qvvariables.json"
 */
const getLocalFile = dataFile => {
  if (process.env.NODE_ENV === "development") {
    return path.join(remote.app.getAppPath(), "/data", dataFile);
  }
  return path.join(path.dirname(remote.app.getPath("exe")), "/data", dataFile);
};

/**
 * will return an array containing the contents of the QVWNAMES_FILE
 *
 * @return {Promise.Array.<appNamesObj>} - Array of appName objects
 * **[
 *  { id, appName }, ...
 * ]**
 */
async function readApplicationNames() {
  try {
    const data = await readFilePromise(getLocalFile(FILES.QVWNAMES_FILE));
    let applicationList = await JSON.parse(data);
    applicationList = _.sortBy(applicationList);
    return applicationList;
  } catch (err) {
    let myError = {
      error: err,
      errno: err.errno,
      code: err.code,
      message: err.message,
      path: err.path
    };
    throw myError;
  }
}

//------------------------------------------------
//--Will return the the whole qvvariables.json
//--file as a javascript object.
//---------------------------------------------------
async function readQVVariables() {
  try {
    let variables = await readFilePromise(getLocalFile(FILES.VAR_FILE));
    return (variables = await JSON.parse(variables));
  } catch (err) {
    let myError = {
      error: err,
      errno: err.errno,
      code: err.code,
      message: err.message,
      path: err.path
    };
    throw myError;
  }
}

//------------------------------------------------
//--Will return the the whole qvvariables.json
//--file as a javascript object.
//---------------------------------------------------
/**
 * @param {string} [QVFileToRead=undefined] - Should pass in either VAR or GROUP to load the appropriate file
 * @returns {Array} - array of parsed JSON file
 *
 */
async function readQVFile(QVFileToRead = undefined) {
  if (!QVFileToRead) {
    throw new Error(
      "You must pass either VAR or GROUP to the readQVFile function"
    );
  }

  let fileToRead = `${QVFileToRead}_FILE`;
  try {
    let results = await readFilePromise(getLocalFile(FILES[fileToRead]));
    return (results = await JSON.parse(results));
  } catch (err) {
    let myError = {
      error: err,
      errno: err.errno,
      code: err.code,
      message: err.message,
      path: err.path
    };
    throw myError;
  }
}

async function writeQVFile(QVFileToWrite = undefined, data) {
  if (!QVFileToWrite) {
    throw new Error(
      "You must pass either VAR or GROUP to the writeQVFile function"
    );
  }

  let fileToWrite = `${QVFileToWrite}_FILE`;

  try {
    //writeFilePromise returns the filename written on success
    let results = await writeFilePromise(
      getLocalFile(FILES[fileToWrite]),
      JSON.stringify(data)
    );
    return results;
  } catch (err) {
    let myError = {
      error: err,
      errno: err.errno,
      code: err.code,
      message: err.message,
      path: err.path
    };
    throw myError;
  }
}
export { readApplicationNames, readQVVariables, readQVFile, writeQVFile };
