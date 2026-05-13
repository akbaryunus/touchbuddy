# TouchBuddy

A micro:bit MakeCode extension for adjustable capacitive touch detection.
Works with longer jumper cables where the default micro:bit touch sensitivity falls short.
Supports multiple touch pins sharing one buddy pin.

## Wiring

```
micro:bit P16 ──── buddy pin (shared, dont use buddy pin for other purposes.)
micro:bit P0  ──── jumper cable 1 ──── (touch point 1)
micro:bit P1  ──── jumper cable 2 ──── (touch point 2)
micro:bit P2  ──── jumper cable 3 ──── (touch point 3)
```

No resistor needed.

## Adding to MakeCode

Go to **Extensions** and paste:
```
https://github.com/akbaryunus/touchbuddy
```

## Blocks

| Block | Description |
|---|---|
| `set buddy pin [P16]` | Shared pin — set once at the start |
| `set touch pin [P0] threshold [10]` | Register a touch pin with its own threshold |
| `is touched [P0]` | Returns true/false for that pin |
| `raw touch duration [P0]` | Raw value for calibration |
| `start serial calibration [P0]` | Streams raw values to serial monitor |

## Calibration

1. Add `start serial calibration [P0]` to your program
2. Flash to micro:bit
3. Click **Show console Device** in MakeCode
4. Note the value when **not touching** and when **touching**
5. Set threshold somewhere in between
6. Repeat for each pin if needed
7. Remove calibration block when done

## Example

```typescript
touchBuddy.setBuddyPin(DigitalPin.P16)
touchBuddy.setTouchPin(DigitalPin.P0, 10)
touchBuddy.setTouchPin(DigitalPin.P1, 10)
touchBuddy.setTouchPin(DigitalPin.P2, 10)

basic.forever(function () {
    if (touchBuddy.isTouched(DigitalPin.P0)) {
        basic.showString("0")
    } else if (touchBuddy.isTouched(DigitalPin.P1)) {
        basic.showString("1")
    } else if (touchBuddy.isTouched(DigitalPin.P2)) {
        basic.showString("2")
    } else {
        basic.showString(".")
    }
})
```

## License
MIT

> TouchBuddy=github:akbaryunus/touchbuddy
