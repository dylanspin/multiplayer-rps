function checkWin () {
    if (enemyNum == pressed) {
        basic.showIcon(IconNames.Asleep)
    } else if (enemyNum == 0) {
        if (pressed == 1) {
            winLos(0)
        } else {
            winLos(1)
        }
    } else if (enemyNum == 1) {
        if (pressed == 2) {
            winLos(0)
        } else {
            winLos(1)
        }
    } else if (enemyNum == 2) {
        if (pressed == 0) {
            winLos(0)
        } else {
            winLos(1)
        }
    }
}
radio.onReceivedNumber(function (receivedNumber) {
    if (receivedNumber == 20) {
        reset()
    } else {
        if (send == 1) {
            checkWin()
        } else {
            if (recieved == 0) {
                enemyNum = receivedNumber
                recieved = 1
            }
        }
    }
})
input.onButtonPressed(Button.A, function () {
    send2(0)
})
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    send2(2)
})
function winLos (num: number) {
    if (num == 0) {
        basic.showIcon(IconNames.Yes)
    } else {
        basic.showIcon(IconNames.No)
    }
    basic.pause(200)
    radio.sendNumber(20)
    reset()
}
function send2 (num: number) {
    if (send == 0) {
        send = 1
        pressed = num
        radio.sendNumber(num)
        if (num == 0) {
            basic.showLeds(`
                # # # # #
                # # # # #
                # # # # #
                # # # # #
                # # # # #
                `)
        } else if (num == 1) {
            basic.showLeds(`
                # # # # #
                # . . . #
                # . . . #
                # . . . #
                # # # # #
                `)
            basic.showString("P")
        } else if (num == 2) {
            basic.showLeds(`
                # # . . #
                # # . # .
                . . # . .
                # # . # .
                # # . . #
                `)
        }
    } else if (recieved == 1) {
        checkWin()
    }
}
input.onButtonPressed(Button.B, function () {
    send2(1)
})
function reset () {
    basic.clearScreen()
    send = 0
    recieved = 0
}
let recieved = 0
let send = 0
let pressed = 0
let enemyNum = 0
radio.setGroup(42)
basic.forever(function () {
    if (send == 1) {
        basic.showString("...")
    } else if (send == 0 || recieved == 1) {
        basic.showString("pick")
    }
})
