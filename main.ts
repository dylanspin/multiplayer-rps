function checkWin () {
    winEnd = 1
    if (enemyNum == pressed) {
        winLos(2)
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
    if (send == 1) {
        recieved = 1
        enemyNum = receivedNumber
        checkWin()
    } else {
        if (recieved == 0) {
            recieved = 1
            enemyNum = receivedNumber
        }
    }
})
input.onButtonPressed(Button.A, function () {
    send2(0)
})
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    send2(1)
})
function winLos (num: number) {
    if (num == 0) {
        basic.showIcon(IconNames.Yes)
    } else if (num == 2) {
        basic.showIcon(IconNames.Asleep)
    } else {
        basic.showIcon(IconNames.No)
    }
    basic.pause(2000)
    reset()
}
function send2 (num: number) {
    if (send == 0) {
        send = 1
        pressed = num
        radio.sendNumber(num)
        if (num == 0) {
            basic.showLeds(`
                . . . . .
                . # # # .
                . # # # .
                . # # # .
                . . . . .
                `)
        } else if (num == 1) {
            basic.showLeds(`
                # # # # #
                # # # # #
                # # # # #
                # # # # #
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
        if (recieved == 1) {
            checkWin()
        }
    }
}
input.onButtonPressed(Button.B, function () {
    send2(2)
})
function reset () {
    basic.clearScreen()
    send = 0
    recieved = 0
    winEnd = 0
}
let recieved = 0
let send = 0
let pressed = 0
let enemyNum = 0
let winEnd = 0
radio.setGroup(42)
basic.forever(function () {
    if (winEnd != 1) {
        if (send == 1) {
            basic.showString("..")
        } else {
            basic.showString("?")
        }
    }
})
