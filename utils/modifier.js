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
  let insertIndex = 0;
  data.forEach((line, index) => {
    line.replace("//", "");
    if(line.includes('//')) {
      console.log(index);
    }
  });
  // data.splice(insertIndex, 0, isertData);
  const newData = data.join('\n');
  console.log(newData);
  fs.writeFileSync(filePath, newData, {encoding: 'utf-8'});
}

function modifyAppRouting(filePath) {
  const fs = require("fs");
  const data = fs.readFileSync(filePath, 'utf-8').split('\n');
  let routesSIndex = 0;
  let routesEIndex = 0;
  data.forEach((line, index) => {
    if(line.includes('export const routes: Routes = [')) {
      routesSIndex = index;
    }
    if(line.includes('];') && routesSIndex !== 0) {
      routesEIndex = index;
    }
  });
  console.log(routesSIndex);
  console.log(routesEIndex);
  const dataUp = data.slice(0, routesSIndex);
  const dataDown = data.slice(routesEIndex + 1);
  const routes = data.slice(routesSIndex, routesEIndex + 1);
  console.log(routes);;
}



module.exports = {
  removeLine,
  removeLines,
  modify,
  modifyAppRouting
}
