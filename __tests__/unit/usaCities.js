const CitySuggest = require('../../index');
const US_CITY_NAMES = require('../data/usaCities'); // https://en.wikipedia.org/wiki/List_of_United_States_cities_by_population

describe('CitySuggest', () => {
  let client;
  beforeAll(() => {
    client = new CitySuggest({ countryCodes: ['us'], resultsLimit: 3 });
  });
  US_CITY_NAMES.forEach((cityName) => {
    describe(`when searching for US city ${cityName}`, () => {
      test('it matches the snapshot', () => {
        const expected = client.suggest(cityName);
        expect(expected).toMatchSnapshot();
      });
    });
  });
});
