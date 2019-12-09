var path = require('path');
const yargs = require('yargs');
var fs = require('fs')
//https://www.npmjs.com/package/excel-as-json
const excelToJson = require('convert-excel-to-json');

//expects a --file with extension
//It will create a file called qvwfields-[orignalfilename].json
//--sample format:
//  node FieldsToJSON --file fieldsInput.xlsx
const argv = yargs.argv;

console.log('yargs: ', argv);
const sourceFile = argv.file;
const result = excelToJson({
    sourceFile
});

let jsonOut = result.Sheet1.map((row,idx) => {
  if (idx === 0 ) return;
  return {
      application: row.A, 
      table: row.B, 
      field: row.C
    }
  }
).filter(row => row !== undefined)


console.log( jsonOut)

fs.writeFile(`qvwfields-${path.basename(sourceFile, path.extname(sourceFile))}.json`, JSON.stringify(jsonOut), 'utf8', err => {
  if (err) {
    console.log("Error writing qvwfields.json file", err)
  }
  console.log('Done Exporting JSON From Excel');  
})