const { weatherSimplify } = require('./server');

describe("Weather simply functionality", () => {
    test("Should correctly order weather data", () => {
        const input = [
            { main: { temp: 0 }, weather: [ { main: 'Rain' } ], wind: { speed: 1 } },
            { main: { temp: 1 }, weather: [ { main: 'Rain' } ], wind: { speed: 2 } },
            { main: { temp: 2 }, weather: [ { main: 'Clouds' } ], wind: { speed: 3 } },
            { main: { temp: 3 }, weather: [ { main: 'Rain' } ], wind: { speed: 4 } },
            { main: { temp: 4 }, weather: [ { main: 'Clouds' } ], wind: { speed: 5 } },
            { main: { temp: 5 }, weather: [ { main: 'Rain' } ], wind: { speed: 6 } },
            { main: { temp: 6 }, weather: [ { main: 'Rain' } ], wind: { speed: 7 } },
            { main: { temp: 7 }, weather: [ { main: 'Clouds' } ], wind: { speed: 8 } }
        ]

        const expectedOutput = {
            "rain": true,
            "temp": "3.50",
            "wind": "4.50"
        }

        expect(weatherSimplify(input)).toEqual(expectedOutput);
      });

      test("Test invalid input", () => {
        const input = [
            { main: { temp: 0 }, weather: [ { main: 'Rain' } ], wind: { speed: 1 } },
            { main: { temp: 1 }, weather: [ { main: 'Rain' } ], wind: { speed: 2 } },
            { main: { temp: 2 }, weather: [ { main: 'Clouds' } ], wind: { speed: 3 } },
            { main: { temp: 3 }, weather: [ { main: 'Rain' } ], wind: { speed: 4 } },
            { main: { temp: 4 }, weather: [ { main: 'Clouds' } ], wind: { speed: 5 } },
            { main: { temp: 5 }, weather: [ { main: 'Rain' } ], wind: { speed: 6 } },
            { main: { temp: 6 }, weather: [ { main: 'Rain' } ], wind: { speed: 7 } },
            { main: { temp: 7 }, weather: [ { main: 'Clouds' } ] }
        ]
        
        try {
            weatherSimplify(input);
            fail("No error");
          } catch (error) {
            expect(error.message).toEqual("Invalid JSON array input");
          }
      });
});