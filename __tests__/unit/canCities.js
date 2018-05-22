const CitySuggest = require('../../index');
const CA_CITY_NAMES = require('../data/canCities');

describe('CitySuggest', () => {
  let client;
  beforeAll(() => {
    client = new CitySuggest({ countryCodes: ['ca']});
  });
  CA_CITY_NAMES.forEach((cityName) => {
    describe(`when searching for CA city ${cityName}`, () => {
      test('it matches the snapshot', () => {
        const expected = client.suggest(cityName);
        expect(expected).toMatchSnapshot();
      });
    });
  });
});
