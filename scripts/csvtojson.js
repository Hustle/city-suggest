const path = require('path');
const csv = require('csvtojson');
const fs = require('fs');
const CITIES_TXT_DIR = path.join(__dirname,'../','data','txt','cities');
const CITIES_JSON_DIR = path.join(__dirname,'..','data','json','cities');
const opts = {
  headers: ['name','lat','lng','country','population','timezone'],
  delimiter: '	' // tab delimited
};

function convertCSVToJSON(file) {
  csv(opts)
    .fromFile(path.join(CITIES_TXT_DIR, file))
    .then((cities) => {
      const simpleCities = cities.map((city) => {
        // remove unused columns
        delete city.country;
        delete city.population;
        delete city.timezone;
        return city;
      });
      const fileName = file.replace('.txt', '.json');
      fs.writeFileSync(path.join(CITIES_JSON_DIR, fileName), JSON.stringify(simpleCities));
    })
}

function convertAllCitiesToJSON() {
  fs.readdir(CITIES_TXT_DIR, (err, files) => {
    files.forEach(convertCSVToJSON);
  })
}

convertAllCitiesToJSON();
