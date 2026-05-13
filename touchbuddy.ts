//% color=#cccc00 weight=85 icon="\uf0a6" block="TouchBuddy"
namespace touchBuddy {
    let _buddyPin: DigitalPin = DigitalPin.P1
    let _thresholds: number[] = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1]

    //% block="set buddy pin %pin"
    //% pin.fieldEditor="gridpicker"
    //% weight=100
    export function setBuddyPin(pin: DigitalPin): void {
        _buddyPin = pin
    }

    //% block="set touch pin %pin threshold %threshold"
    //% pin.fieldEditor="gridpicker"
    //% threshold.min=1 threshold.max=1000
    //% weight=90
    export function setTouchPin(pin: DigitalPin, threshold: number): void {
        pins.setPull(pin, PinPullMode.PullUp)
        _thresholds[pin] = threshold
    }

function _measure(pin: DigitalPin): number {
    // Discharge ALL registered pins first
    for (let i = 0; i < _thresholds.length; i++) {
        if (_thresholds[i] >= 0) {
            pins.digitalWritePin(i, 0)
        }
    }
    pins.digitalWritePin(_buddyPin, 0)
    basic.pause(1)
    // Now charge only the pin we want
    pins.digitalWritePin(_buddyPin, 1)
    let start = control.micros()
    while (pins.digitalReadPin(pin) == 0) { }
    return control.micros() - start
}

    //% block="is touched %pin"
    //% pin.fieldEditor="gridpicker"
    //% weight=80
    export function isTouched(pin: DigitalPin): boolean {
        return _measure(pin) > _thresholds[pin]
    }

    //% block="raw touch duration %pin"
    //% pin.fieldEditor="gridpicker"
    //% weight=70
    export function rawDuration(pin: DigitalPin): number {
        return _measure(pin)
    }

    /**
     * Print raw duration of all registered touch pins to serial for calibration
     */
    //% block="start serial calibration"
    //% weight=60
    export function startCalibration(): void {
        basic.forever(function () {
            for (let pin = 0; pin < _thresholds.length; pin++) {
                if (_thresholds[pin] >= 0) {
                    serial.writeValue("P" + pin, _measure(pin))
                }
            }
            basic.pause(100)
        })
    }
}
