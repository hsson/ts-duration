# ts-duration

Type safe duration calculations in Javascript and Typescript! No more keeping track of units with silly variable names (I'm looking at you `reallyLongVariableNameOfTimeDiffInMs` 👀). This type is heavily inspired by the `time.Duration` type in Go (Golang).

## Quick Start
```typescript
const a = Duration.millisecond(3500);
const b = Duration.second(4.2);
console.log(`${a} + ${b} = ${a.add(b)}`); // prints `3500ms + 4.2s = 7.7s`
```
