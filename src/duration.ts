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

    /**
     * Create a new Duration instance representing d nanoseconds
     *
     * @param d - nanoseconds
     * @returns a Duration representing d nanoseconds
     */
    static nanosecond(d: number): Duration {
        return new Duration(d * NANOSECOND);
    }

    /**
     * Create a new Duration instance representing d microseconds
     *
     * @param d - microseconds
     * @returns a Duration representing d microseconds
     */
    static microsecond(d: number): Duration {
        return new Duration(d * MICROSECOND);
    }

    /**
     * Create a new Duration instance representing d milliseconds
     *
     * @param d - milliseconds
     * @returns a Duration representing d milliseconds
     */
    static millisecond(d: number): Duration {
        return new Duration(d * MILLISECOND);
    }

    /**
     * Create a new Duration instance representing d seconds
     *
     * @param d - seconds
     * @returns a Duration representing d seconds
     */
    static second(d: number): Duration {
        return new Duration(d * SECOND);
    }

    /**
     * Create a new Duration instance representing d minutes
     *
     * @param d - minutes
     * @returns a Duration representing d minutes
     */
    static minute(d: number): Duration {
        return new Duration(d * MINUTE);
    }

    /**
     * Create a new Duration instance representing d hours
     *
     * @param d - hours
     * @returns a Duration representing d hours
     */
    static hour(d: number): Duration {
        return new Duration(d * HOUR);
    }

    /**
     * Calculate the duration until the Date t
     *
     * @param t - a Date
     * @returns The Duration until t
     */
    static until(t: Date): Duration {
        const now = this.millisecond(new Date().getTime());
        const then = this.millisecond(t.getTime());
        return then.sub(now);
    }

    /**
     * Calculate the duration since the Date t
     *
     * @param t - a Date
     * @returns The Duration since t
     */
    static since(t: Date): Duration {
        const now = this.millisecond(new Date().getTime());
        const then = this.millisecond(t.getTime());
        return now.sub(then);
    }

    /**
     * Get the duration as nanoseconds
     *
     * @returns duration in nanoseconds
     */
    public get nanoseconds(): number {
        return this.value;
    }

    /**
     * Get the duration as microseconds
     *
     * @returns duration in microseconds
     */
    public get microseconds(): number {
        return this.value / MICROSECOND;
    }

    /**
     * Get the duration as milliseconds
     *
     * @returns duration in milliseconds
     */
    public get milliseconds(): number {
        return this.value / MILLISECOND;
    }

    /**
     * Get the duration as seconds
     *
     * @returns duration in seconds
     */
    public get seconds(): number {
        return this.value / SECOND;
    }

    /**
     * Get the duration as minutes
     *
     * @returns duration in minutes
     */
    public get minutes(): number {
        return this.value / MINUTE;
    }

    /**
     * Get the duration as hours
     *
     * @returns duration in hours
     */
    public get hours(): number {
        return this.value / HOUR;
    }

    /**
     * Return a string representing the duration in the form "72h3m0.5s".
     * Leading zero units are omitted. As a special case, durations less than
     * one second format use a smaller unit (milli-, micro-, or nanoseconds)
     * to ensure that the leading digit is non-zero. The zero duration
     * formats as 0s.
     *
     * @returns a string representing the duration
     */
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

    /**
     * Addition with the specified duration: this + d
     *
     * @param d - the duration to add to the current
     * @returns the sum this + d
     */
    add(d: Duration): Duration {
        return new Duration(this.value + d.value);
    }

    /**
     * Subtraction of the specified duration: this - d
     *
     * @param d - the duration to remove from the current
     * @returns the difference this - d
     */
    sub(d: Duration): Duration {
        return new Duration(this.value - d.value);
    }

    /**
     * Rounds the duration to the nearest multiple of the specified duration.
     * If m is zero or negative, the duration is unchanged.
     *
     * @param m - the duration multiple to round to
     * @returns this duration rounded to the nearest multiple of m
     */
    round(m: Duration): Duration {
        if (m.value <= 0) {
            return this;
        }

        let remainder = this.value % m.value;
        if (this.value >= 0) {
            if (remainder + remainder < m.value) {
                return new Duration(this.value - remainder);
            } else {
                return new Duration(this.value + m.value - remainder);
            }
        } else {
            remainder = -remainder;
            if (remainder + remainder < m.value) {
                return new Duration(this.value + remainder);
            } else {
                return new Duration(this.value - m.value + remainder);
            }
        }
    }
}
