const path = require('path');
const csv = require('csvtojson');
const fs = require('fs');
const REGIONS_TXT_DIR = path.join(__dirname,'../','data','txt','regions');
const REGIONS_JSON_DIR = path.join(__dirname,'..','data','json','regions');
const opts = {
  headers: ['code','name'],
  delimiter: '	' // tab delimited
};

function convertCSVToJSON(file) {
  csv(opts)
    .fromFile(path.join(REGIONS_TXT_DIR, file))
    .then((regions) => {
      const rootName = file.split('.txt')[0];
      const simpleRegions = regions.map((region) => {
        // remove whatever country code is prefixed to region
        region.code = region.code.replace(`${rootName.toUpperCase()}.`, '');
        return region
      });
      const fileName = rootName + '.json';
      fs.writeFileSync(path.join(REGIONS_JSON_DIR, fileName), JSON.stringify(simpleRegions));
    })
}

function convertAllRegionsToJSON() {
  fs.readdir(REGIONS_TXT_DIR, (err, files) => {
    files.forEach(convertCSVToJSON);
  })
}

convertAllRegionsToJSON();
