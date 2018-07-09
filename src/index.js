const Fuse = require('fuse.js');
const path = require('path');

const DEFAULT_SEARCH_LIMIT = 10;
const DEFAULT_SEARCH_LOCATION = 0;
const DEFAULT_SEARCH_DISTANCE = 100;
const DEFAULT_SEARCH_THRESHOLD = 0.6;
const DEFAULT_SEARCH_MIN_MATCH = 2;
const DEFAULT_SEARCH_MAX_MATCH = 32;

class CitySuggest {
  // FIXME: typechecking
  constructor(opts) {
    this.resultsLimit = opts.resultsLimit || DEFAULT_SEARCH_LIMIT;

    const searchOpts = {
      shouldSort: true,
      keys: ['name'], // NOTE: might want to search on region name?
      minMatchCharLength: opts.searchMinMatch || DEFAULT_SEARCH_MIN_MATCH,
      maxPatternLength: opts.searchMaxMatch || DEFAULT_SEARCH_MAX_MATCH,
      location: opts.searchLocation || DEFAULT_SEARCH_LOCATION,
      distance: opts.searchDistance || DEFAULT_SEARCH_DISTANCE,
      threshold: opts.searchThreshold || DEFAULT_SEARCH_THRESHOLD,
    }
    let dataSet = [];

    opts.countryCodes.forEach((countryCode) => {
      dataSet = dataSet.concat(require(path.join(__dirname,'data','cities',countryCode.toLowerCase())));
    })
    this.client = new Fuse(dataSet, searchOpts);
    this.suggest = this.suggest.bind(this);
  }

  suggest(str) {
    const res = this.client.search(str);
    return res.slice(0,this.resultsLimit).map(({ displayName, lat, lng }) => ({
      displayName,
      lat,
      lng
    }));
  }
};
module.exports = CitySuggest;
