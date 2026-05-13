//% color=#AA278F weight=85 icon="\uf0a6" block="TouchBuddy"
namespace touchBuddy {

    let _touchPin: DigitalPin = DigitalPin.P0
    let _buddyPin: DigitalPin = DigitalPin.P1
    let _threshold: number = 10

    /**
     * Set the touch pin (the pin your jumper cable is connected to)
     * @param pin the touch pin, eg: DigitalPin.P0
     */
    //% block="set touch pin %pin"
    //% pin.fieldEditor="gridpicker"
    //% weight=100
    export function setTouchPin(pin: DigitalPin): void {
        _touchPin = pin
        pins.setPull(_touchPin, PinPullMode.PullUp)
    }

    /**
     * Set the buddy pin (the other pin, not touched)
     * @param pin the buddy pin, eg: DigitalPin.P1
     */
    //% block="set buddy pin %pin"
    //% pin.fieldEditor="gridpicker"
    //% weight=90
    export function setBuddyPin(pin: DigitalPin): void {
        _buddyPin = pin
    }

    /**
     * Set the threshold for touch detection
     * @param value the threshold value, eg: 10
     */
    //% block="set threshold %value"
    //% value.min=1 value.max=1000
    //% weight=80
    export function setThreshold(value: number): void {
        _threshold = value
    }

    /**
     * Returns true if the touch pin is being touched
     */
    //% block="is touched"
    //% weight=70
    export function isTouched(): boolean {
        pins.digitalWritePin(_buddyPin, 0)
        pins.digitalWritePin(_touchPin, 0)
        basic.pause(1)
        pins.digitalWritePin(_buddyPin, 1)
        let start = control.micros()
        while (pins.digitalReadPin(_touchPin) == 0) { }
        let duration = control.micros() - start
        return duration > _threshold
    }

    /**
     * Returns the raw duration value (useful for calibration)
     */
    //% block="raw touch duration"
    //% weight=60
    export function rawDuration(): number {
        pins.digitalWritePin(_buddyPin, 0)
        pins.digitalWritePin(_touchPin, 0)
        basic.pause(1)
        pins.digitalWritePin(_buddyPin, 1)
        let start = control.micros()
        while (pins.digitalReadPin(_touchPin) == 0) { }
        return control.micros() - start
    }

    /**
     * Print raw duration to serial continuously for calibration.
     * Open "Show console Device" in MakeCode to see values.
     * Touch and release the jumper to find your threshold.
     */
    //% block="start serial calibration"
    //% weight=50
    export function startCalibration(): void {
        basic.forever(function () {
            serial.writeValue("duration", rawDuration())
            basic.pause(100)
        })
    }
}
