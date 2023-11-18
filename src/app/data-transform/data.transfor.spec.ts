import { DataTransformer, Band } from "./data.transform";

describe('DataTransformer', () => {

  it('should trasform band data correctly', () => {
    
    const band: Band = {
      members: {
          current: [
              {name: 'Sascha', age: 59, plays: ['vocals', 'synth', 'guitar', 'bass']},
              {name: 'Lucia', age: 49, plays: ['vocals', 'synth']},
              {name: 'Jules', age: 53, plays: ['guitar', 'bass', 'synth']},
              {name: 'Steve', age: 55, plays: ['guitar']}
          ],
          past: [
              {name: 'Raymond', age: 57, plays: ['vocals', 'synth']},
              {name: 'En', age: 52, plays: ['vocals', 'drums', 'guitar', 'synth']},
              {name: 'Gunter', age: 57, plays: ['guitar', 'synth']}
          ]
      }
    };

    const expected: Band = {
      members: {
        // current: no changes
        current: [
          {name: 'Sascha', age: 59, plays: ['vocals', 'synth', 'guitar', 'bass']},
          {name: 'Lucia', age: 49, plays: ['vocals', 'synth']},
          {name: 'Jules', age: 53, plays: ['guitar', 'bass', 'synth']},
          {name: 'Steve', age: 55, plays: ['guitar']}
        ],
        // past: no changes
        past: [
          {name: 'Raymond', age: 57, plays: ['vocals', 'synth']},
          {name: 'En', age: 52, plays: ['vocals', 'drums', 'guitar', 'synth']},
          {name: 'Gunter', age: 57, plays: ['guitar', 'synth']}
        ],
        // ORDER MATTERS!
        // 1. Sort age first by DESC
        // 2. then sort name by ASC
        // 3. lowercase all the names
        all: [
          "sascha",
          "gunter",
          "raymond",
          "steve",
          "jules",
          "en",
          "lucia"
        ]
      },
      // plays order doesn't matter
      plays: {
        // name order doesn't matter
        // but show the name in lowercase
        vocals: ["sascha", "lucia", "raymond", "en"],
        synth: ["sascha", "lucia", "jules", "raymond", "en", "gunter"],
        guitar: ["sascha", "jules", "steve", "en", "gunter"],
        bass: ["sascha", "jules"],
        drums: ["en"]
      }
    }

    let actual =  DataTransformer.transformData(band);

    expect(actual.members.current).toEqual(expected.members.current);
    expect(actual.members.past).toEqual(expected.members.past);
    expect(actual.members.past).toEqual(expected.members.past);
    expect(actual.members.all).toEqual(expected.members.all);

    for (const property in actual.plays) {
      const keyOfActual = property as keyof typeof actual.plays;
      const expectedPlays = expected.plays as Object;

      let actualArray: Array<string> = actual.plays[keyOfActual] as unknown as Array<string>;
      let expectedArray: Array<string> = expectedPlays[keyOfActual] as unknown as Array<string>;
      expect(actualArray).toBeTruthy();
      expect(expectedArray).toBeTruthy();
      expect(actualArray).toEqual(jasmine.arrayWithExactContents(expectedArray));
    }
  });
});