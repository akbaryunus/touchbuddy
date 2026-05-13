// TouchBuddy Test
// Press A to test touch, Press B to calibrate

touchBuddy.setTouchPin(DigitalPin.P0)
touchBuddy.setBuddyPin(DigitalPin.P1)
touchBuddy.setThreshold(10)

input.onButtonPressed(Button.A, function () {
    if (touchBuddy.isTouched()) {
        basic.showString("T")
    } else {
        basic.showString(".")
    }
})

input.onButtonPressed(Button.B, function () {
    basic.showNumber(touchBuddy.rawDuration())
})
