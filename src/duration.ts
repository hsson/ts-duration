const NANOSECOND = 1;
const MICROSECOND = 1000 * NANOSECOND;
const MILLISECOND = 1000 * MICROSECOND;
const SECOND = 1000 * MILLISECOND;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;

const UNIT_NANOSECOND = 'ns';
const UNIT_MICROSECOND = 'μs';
const UNIT_MILLISECOND = 'ms';
const UNIT_SECOND = 's';
const UNIT_MINUTE = 'm';
const UNIT_HOUR = 'h';

export class Duration {
    private constructor(private readonly value: number) {}

    static nanosecond(d: number): Duration {
        return new Duration(d * NANOSECOND);
    }

    static microsecond(d: number): Duration {
        return new Duration(d * MICROSECOND);
    }

    static millisecond(d: number): Duration {
        return new Duration(d * MILLISECOND);
    }

    static second(d: number): Duration {
        return new Duration(d * SECOND);
    }

    static minute(d: number): Duration {
        return new Duration(d * MINUTE);
    }

    static hour(d: number): Duration {
        return new Duration(d * HOUR);
    }

    public get nanoseconds(): number {
        return this.value;
    }

    public get microseconds(): number {
        return this.value / MICROSECOND;
    }

    public get milliseconds(): number {
        return this.value / MILLISECOND;
    }

    public get seconds(): number {
        return this.value / SECOND;
    }

    public get minutes(): number {
        return this.value / MINUTE;
    }

    public get hours(): number {
        return this.value / HOUR;
    }

    public toString(): string {
        const abs = Math.abs(this.value);
        const prefix = this.value < 0 ? '-' : '';
        if (this.value === 0) {
            return `0${UNIT_SECOND}`;
        }
        if (abs < MICROSECOND) {
            return `${prefix}${abs}${UNIT_NANOSECOND}`;
        } else if (abs < MILLISECOND) {
            return `${prefix}${abs / MICROSECOND}${UNIT_MICROSECOND}`;
        } else if (abs < SECOND) {
            return `${prefix}${abs / MILLISECOND}${UNIT_MILLISECOND}`;
        } else if (abs < MINUTE) {
            return `${prefix}${abs / SECOND}${UNIT_SECOND}`;
        } else if (abs < HOUR) {
            const seconds = (abs % MINUTE) / SECOND;
            const minutes = Math.floor(abs / MINUTE);
            return `${prefix}${minutes}${UNIT_MINUTE}${seconds}${UNIT_SECOND}`;
        } else {
            const seconds = (abs % MINUTE) / SECOND;
            const minutes = Math.floor((abs % HOUR) / MINUTE);
            const hours = Math.floor(abs / HOUR);
            return `${prefix}${hours}${UNIT_HOUR}${minutes}${UNIT_MINUTE}${seconds}${UNIT_SECOND}`;
        }
    }

    add(d: Duration): Duration {
        return new Duration(this.value + d.value);
    }

    sub(d: Duration): Duration {
        return new Duration(this.value - d.value);
    }
}
