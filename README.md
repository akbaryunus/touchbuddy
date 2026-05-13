# TouchBuddy

A micro:bit MakeCode extension for adjustable capacitive touch detection.
Works great with longer jumper cables where the default touch sensitivity falls short.

## Wiring

```
micro:bit P0 ──────── jumper cable ──── (touch point)
micro:bit P1 ──────── (connect to P0 directly)
```

No resistor needed — uses the micro:bit's internal pull-up resistor.

## Blocks

| Block | Description |
|---|---|
| `set touch pin [P0]` | The pin your jumper cable is connected to |
| `set buddy pin [P1]` | The other pin (not touched) |
| `set threshold [10]` | Sensitivity — increase if false triggers, decrease if not detecting |
| `is touched` | Returns true/false |
| `raw touch duration` | Returns raw value for calibration |
| `start serial calibration` | Prints raw values to serial monitor |

## Calibration

1. Add the `start serial calibration` block to your program
2. Flash to micro:bit
3. Click **Show console Device** in MakeCode
4. Watch the duration values — note the value when **not touching** and when **touching**
5. Set your threshold somewhere in between
6. Remove the calibration block when done

## Example

```typescript
touchBuddy.setTouchPin(DigitalPin.P0)
touchBuddy.setBuddyPin(DigitalPin.P1)
touchBuddy.setThreshold(10)

basic.forever(function () {
    if (touchBuddy.isTouched()) {
        basic.showString("T")
    } else {
        basic.showString(".")
    }
    basic.pause(100)
})
```

## Adding to MakeCode

In MakeCode go to **Extensions** and paste:
```
[https://github.com/YOUR_USERNAME/TouchBuddy](https://github.com/akbaryunus/touchbuddy)
```

## License
MIT
