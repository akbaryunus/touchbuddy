//% color=#cccc00 weight=85 icon="\uf0a6" block="TouchBuddy"
namespace touchBuddy {

    let _buddyPin: DigitalPin = DigitalPin.P1
    let _activePin: DigitalPin = DigitalPin.P0

    // Store thresholds per pin (index = pin number)
    let _thresholds: number[] = [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10]

    /**
     * Set the buddy pin (shared across all touch pins)
     * @param pin the buddy pin, eg: DigitalPin.P16
     */
    //% block="set buddy pin %pin"
    //% pin.fieldEditor="gridpicker"
    //% weight=100
    export function setBuddyPin(pin: DigitalPin): void {
        _buddyPin = pin
    }

    /**
     * Set up a touch pin with its own threshold
     * @param pin the touch pin, eg: DigitalPin.P0
     * @param threshold the threshold value, eg: 10
     */
    //% block="set touch pin %pin threshold %threshold"
    //% pin.fieldEditor="gridpicker"
    //% threshold.min=1 threshold.max=1000
    //% weight=90
    export function setTouchPin(pin: DigitalPin, threshold: number): void {
        pins.setPull(pin, PinPullMode.PullUp)
        _thresholds[pin] = threshold
    }

    function _measure(pin: DigitalPin): number {
        pins.digitalWritePin(_buddyPin, 0)
        pins.digitalWritePin(pin, 0)
        basic.pause(1)
        pins.digitalWritePin(_buddyPin, 1)
        let start = control.micros()
        while (pins.digitalReadPin(pin) == 0) { }
        return control.micros() - start
    }

    /**
     * Returns true if the given pin is being touched
     * @param pin the touch pin to check, eg: DigitalPin.P0
     */
    //% block="is touched %pin"
    //% pin.fieldEditor="gridpicker"
    //% weight=80
    export function isTouched(pin: DigitalPin): boolean {
        return _measure(pin) > _thresholds[pin]
    }

    /**
     * Returns the raw duration value for a pin (useful for calibration)
     * @param pin the touch pin to measure, eg: DigitalPin.P0
     */
    //% block="raw touch duration %pin"
    //% pin.fieldEditor="gridpicker"
    //% weight=70
    export function rawDuration(pin: DigitalPin): number {
        return _measure(pin)
    }

    /**
     * Print raw duration of a pin to serial for calibration
     * @param pin the touch pin to calibrate, eg: DigitalPin.P0
     */
    //% block="start serial calibration %pin"
    //% pin.fieldEditor="gridpicker"
    //% weight=60
    export function startCalibration(pin: DigitalPin): void {
        basic.forever(function () {
            serial.writeValue("duration", _measure(pin))
            basic.pause(100)
        })
    }
}
