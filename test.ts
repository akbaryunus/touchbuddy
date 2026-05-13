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
