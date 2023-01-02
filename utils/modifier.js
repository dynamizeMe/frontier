function removeLine(filePath, position) {
  const fs = require("fs");
  const data =fs.readFileSync(filePath, 'utf-8').split('\n');
  data.splice(position -1, 0);
  const newData = data.join('\r\n');
  fs.writeFileSync(filePath, newData, {encoding: 'utf-8'});
}

function removeLines(filePath, position, lineNumber) {
  const fs = require("fs");
  const data = fs.readFileSync(filePath, 'utf-8').split('\n');
  data.splice(position -1, lineNumber);
  const newData = data.join('\r\n');
  fs.writeFileSync(filePath, newData, {encoding: 'utf-8'});
}

function modify(filePath, position, lineNumber, isertData) {
  const fs = require("fs");
  const data = fs.readFileSync(filePath, 'utf-8').split('\n');
  const insert = isertData.split('\n');
  console.log(insert);
  let modifier = -1;
  data.splice(position + modifier, lineNumber);
  for(let el of insert) {
    data.splice(position + modifier, 0, el);
    modifier ++
  }
  const newData = data.join('\n');
  console.log(newData);
  fs.writeFileSync(filePath, newData, {encoding: 'utf-8'});
}

module.exports = {
  removeLine,
  removeLines,
  modify
}
