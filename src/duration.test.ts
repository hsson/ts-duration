import { Duration } from './duration';

describe('Duration', () => {
    describe('toString', () => {
        const cases: { in: Duration; out: string }[] = [
            { in: Duration.nanosecond(5), out: '5ns' },
            { in: Duration.nanosecond(-3), out: '-3ns' },
            { in: Duration.nanosecond(1500), out: '1.5μs' },
            { in: Duration.microsecond(31), out: '31μs' },
            { in: Duration.microsecond(0), out: '0s' },
            { in: Duration.microsecond(-5), out: '-5μs' },
            { in: Duration.millisecond(-5), out: '-5ms' },
            { in: Duration.millisecond(5123), out: '5.123s' },
            { in: Duration.millisecond(-5123), out: '-5.123s' },
            { in: Duration.millisecond(912), out: '912ms' },
            { in: Duration.second(55), out: '55s' },
            { in: Duration.second(0.5), out: '500ms' },
            { in: Duration.second(-1), out: '-1s' },
            { in: Duration.second(61), out: '1m1s' },
            { in: Duration.minute(31), out: '31m0s' },
            { in: Duration.minute(120), out: '2h0m0s' },
            { in: Duration.minute(121), out: '2h1m0s' },
            { in: Duration.hour(121), out: '121h0m0s' },
            { in: Duration.hour(0.5), out: '30m0s' }
        ];

        cases.forEach((testCase, idx) => {
            it(`<Duration${idx}>.toString() should equal ${testCase.out}`, () => {
                expect(testCase.in.toString()).toEqual(testCase.out);
            });
        });
    });
});
