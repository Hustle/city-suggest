const path = require('path');
const csv = require('csvtojson');
const fs = require('fs');
const CITIES_TXT_DIR = path.join(__dirname,'../','data','txt','cities');
const CITIES_JSON_DIR = path.join(__dirname,'..','data','json','cities');
const REGIONS_JSON_DIR = path.join(__dirname,'..','data','json','regions');
const opts = {
  headers: ['name','lat','lng','country','regionCode','population','timezone'],
  delimiter: '	' // tab delimited
};


// NOTE: geonames.org gives 2-letter country codes. 3 is prettier
const COUNTRY_CODE_MAP = {
  'us': 'USA',
  'ca': 'CAN'
};

function convertCSVToJSON(file) {
  csv(opts)
    .fromFile(path.join(CITIES_TXT_DIR, file))
    .then((cities) => {
      const rootName = file.split('.txt')[0];
      const fileName = rootName + '.json';
      const regionMap = require(path.join(REGIONS_JSON_DIR, fileName));
      const countryName = COUNTRY_CODE_MAP[rootName];
      const simpleCities = [];

      cities.forEach((city) => {
        const simpleCity = {};
        simpleCity.name = city.name;
        simpleCity.displayName = `${city.name}, ${countryName}`;
        const regionName = regionMap[city.regionCode];
        if (regionName) {
          simpleCity.displayName = `${city.name}, ${regionName}, ${countryName}`;
        };
        simpleCity.lat = city.lat;
        simpleCity.lng = city.lng;
        simpleCities.push(simpleCity);
      });
      fs.writeFileSync(path.join(CITIES_JSON_DIR, fileName), JSON.stringify(simpleCities));
    })
}

function convertAllCitiesToJSON() {
  fs.readdir(CITIES_TXT_DIR, (err, files) => {
    files.forEach(convertCSVToJSON);
  })
}

convertAllCitiesToJSON();
