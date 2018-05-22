# CitySuggest 🌇
Simple city search for [geonames.org](http://www.geonames.org/) data dumps

## Notes
At the time of writing, only the country codes for the United States
and Canada are supported. Data used in this lib is provided via the [Creative Commons Attribution 3.0 License](http://creativecommons.org/licenses/by/3.0/) by [geonames.org](http://www.geonames.org/)

## Basic Usage

**NOTE**: City name dependencies are lazy-loaded, so you should
initialize instances as early as you can.

```javascript
const CitySuggest = require('city-suggest');

const opts = {
  countryCodes: ['us'],
  resultsLimit: 5
};

const citysuggest = new CitySuggest(opts);
const suggestions = citysuggest.suggest('San'); // [{ name: 'San Francisco, CA, USA', latitude: 123, longitude: 456}}, ...];
```

## Installation
```sh
yarn install
```

## Future
- [ ] Standardize build scripts
- [ ] Support more country codes
- [ ] Ingest from multiple sources
- [ ] Faster tests
- [ ] Code-coverage
