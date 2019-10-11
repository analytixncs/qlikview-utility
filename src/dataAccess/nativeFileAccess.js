//functions to access data from main electron thread
const path = require("path");
const fs = window.require("fs");
const _ = require("lodash");
const { remote } = window.require("electron");
const X2JS = require("x2js"); //npm module to convert js object to XML

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

//Takes the appName and writes out an XML file of the groups data to the Spreadsheets directory
//returns the applicationGroups data
async function writeXMLData(appName, fieldsToExport) {
  // Define default patha and filename
  //!! TODO - Have a setting that stores default path for variables in production
  let filedefaultPath =
    process.env.NODE_ENV === "development"
      ? path.join(remote.app.getAppPath(), "../Spreadsheets/", `${appName}.xml`)
      : path.join(
          path.dirname(remote.app.getPath("exe")),
          "../Spreadsheets/",
          `${appName}.xml`
        );
  // getCurrentWindow() makes the dialog a modal
  let filePath = remote.dialog.showSaveDialogSync(remote.getCurrentWindow(), {
    title: "Save XML",
    defaultPath: filedefaultPath,
    filters: [
      { name: "XML", extensions: ["xml"] },
      { name: "JSON", extensions: ["json"] }
    ]
  });

  //If user puts on unknown extension, export in XML format
  let exportFormat = path.extname(filePath).includes("json") ? "json" : "xml";

  // If cancelled, then just return, don't export
  if (!filePath) return;
  //----------------------------------
  // - Get variables ready for export
  let variables = await readQVFile("VAR");
  let applicationVars = variables.filter(
    variable => variable.application === appName
  );
  // Pick only the fields passed to export
  applicationVars = applicationVars.map(variable =>
    _.pick(variable, fieldsToExport)
  );

  if (exportFormat === "xml") {
    let appNameSansSpaces = appName.replace(/\s+/g, "").toLowerCase();
    const x2js = new X2JS();
    let xmlString = x2js.js2xml({ variable: applicationVars });
    //Enclose xml created with the appName, otherwise Qlik won't recognize properly
    applicationVars = `<${appNameSansSpaces}>${xmlString}</${appNameSansSpaces}>`;
  } else {
    applicationVars = JSON.stringify(applicationVars);
  }
  //write the groups array back to the server disk navigating to the include directory
  try {
    let results = await writeFilePromise(filePath, applicationVars);
    console.log("writeXMLData Results", results);
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

export {
  readApplicationNames,
  readQVVariables,
  readQVFile,
  writeQVFile,
  writeXMLData
};
