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

    describe('get nanoseconds', () => {
        it('should correctly return duration as nanoseconds', () => {
            expect(Duration.nanosecond(300).nanoseconds).toEqual(300);
            expect(Duration.nanosecond(1500).nanoseconds).toEqual(1500);
            expect(Duration.microsecond(3).nanoseconds).toEqual(3000);
        });
    });

    describe('get microseconds', () => {
        it('should correctly return duration as microseconds', () => {
            expect(Duration.microsecond(300).microseconds).toEqual(300);
            expect(Duration.microsecond(1500).microseconds).toEqual(1500);
            expect(Duration.millisecond(3).microseconds).toEqual(3000);
        });
    });

    describe('get milliseconds', () => {
        it('should correctly return duration as milliseconds', () => {
            expect(Duration.millisecond(300).milliseconds).toEqual(300);
            expect(Duration.millisecond(1500).milliseconds).toEqual(1500);
            expect(Duration.second(3).milliseconds).toEqual(3000);
            expect(Duration.second(-5).milliseconds).toEqual(-5000);
        });
    });

    describe('get seconds', () => {
        it('should correctly return duration as seconds', () => {
            expect(Duration.second(300).seconds).toEqual(300);
            expect(Duration.second(1500).seconds).toEqual(1500);
            expect(Duration.minute(2).seconds).toEqual(120);
        });
    });

    describe('get minutes', () => {
        it('should correctly return duration as minutes', () => {
            expect(Duration.minute(300).minutes).toEqual(300);
            expect(Duration.minute(1500).minutes).toEqual(1500);
            expect(Duration.hour(2).minutes).toEqual(120);
        });
    });

    describe('get hours', () => {
        it('should correctly return duration as hours', () => {
            expect(Duration.hour(300).hours).toEqual(300);
            expect(Duration.hour(1500).hours).toEqual(1500);
            expect(Duration.minute(120).hours).toEqual(2);
            expect(Duration.minute(30).hours).toEqual(0.5);
        });
    });

    describe('addition and subtraction', () => {
        describe('adding a + b', () => {
            const cases: { a: Duration; b: Duration; s: Duration }[] = [
                {
                    a: Duration.nanosecond(5),
                    b: Duration.nanosecond(3),
                    s: Duration.nanosecond(8)
                },
                {
                    a: Duration.millisecond(700),
                    b: Duration.second(3),
                    s: Duration.millisecond(3700)
                },
                {
                    a: Duration.nanosecond(-5),
                    b: Duration.nanosecond(5),
                    s: Duration.nanosecond(0)
                }
            ];
            cases.forEach((testCase) => {
                it(`${testCase.a} + ${testCase.b} should equal ${testCase.s}`, () => {
                    const sum = testCase.a.add(testCase.b);
                    expect(sum).toEqual(testCase.s);
                });
            });
        });

        describe('mathematical properties of add', () => {
            it('should be commutative (i.e. a+b=b+a)', () => {
                const a = Duration.second(5);
                const b = Duration.second(10);

                const s1 = a.add(b);
                const s2 = b.add(a);

                expect(s1).toEqual(s2);
            });

            it('should be associative (i.e. (a+b)+c=a+(b+c))', () => {
                const a = Duration.second(5);
                const b = Duration.second(10);
                const c = Duration.second(93);

                const s1 = a.add(b).add(c);
                const s2 = a.add(b.add(c));

                expect(s1).toEqual(s2);
            });

            it('should conform to additive identity (i.e. a + 0 = a)', () => {
                const a = Duration.second(15);
                const zero = Duration.second(0);

                const sum = a.add(zero);

                expect(sum).toEqual(a);
            });
        });

        describe('subtraction a - b', () => {
            const cases: { a: Duration; b: Duration; s: Duration }[] = [
                {
                    a: Duration.nanosecond(5),
                    b: Duration.nanosecond(3),
                    s: Duration.nanosecond(2)
                },
                {
                    a: Duration.millisecond(700),
                    b: Duration.second(3),
                    s: Duration.millisecond(-2300)
                },
                {
                    a: Duration.nanosecond(5),
                    b: Duration.nanosecond(5),
                    s: Duration.nanosecond(0)
                },
                {
                    a: Duration.nanosecond(5),
                    b: Duration.nanosecond(-5),
                    s: Duration.nanosecond(10)
                }
            ];
            cases.forEach((testCase) => {
                it(`${testCase.a} + ${testCase.b} should equal ${testCase.s}`, () => {
                    const sum = testCase.a.sub(testCase.b);
                    expect(sum).toEqual(testCase.s);
                });
            });
        });
    });
});
