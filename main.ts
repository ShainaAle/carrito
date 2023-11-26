let prendido = 0
let numSer = 0
let estado = ""
let objeto = 0
bluetooth.onBluetoothConnected(function () {
    images.iconImage(IconNames.Yes).showImage(0)
})
function Apagar () {
    basic.clearScreen()
    prendido = 0
    cuteBot.closeheadlights()
    return prendido
}
function Encender () {
    images.iconImage(IconNames.Giraffe).showImage(0)
    prendido = 1
    cuteBot.colorLight(cuteBot.RGBLights.ALL, 0x00ffff)
    return prendido
}
function Velocidad () {
    numSer = parseFloat(estado)
    if (prendido == 0) {
        cuteBot.stopcar()
    }
    return numSer
}
basic.forever(function () {
    estado = bluetooth.uartReadUntil(serial.delimiters(Delimiters.NewLine))
    objeto = cuteBot.ultrasonic(cuteBot.SonarUnit.Centimeters)
    if (estado == "encender") {
        Encender()
    }
    if (estado == "apagar") {
        Apagar()
    }
    Velocidad()
    if (estado == "arriba") {
        cuteBot.moveTime(cuteBot.Direction.forward, numSer, 1)
    }
    if (estado == "abajo") {
        cuteBot.moveTime(cuteBot.Direction.backward, numSer, 1)
        music.play(music.createSoundExpression(WaveShape.Square, 2672, 1542, 255, 245, 1000, SoundExpressionEffect.Vibrato, InterpolationCurve.Logarithmic), music.PlaybackMode.UntilDone)
    }
    if (estado == "derecha") {
        cuteBot.moveTime(cuteBot.Direction.right, numSer, 1)
        cuteBot.colorLight(cuteBot.RGBLights.RGB_R, 0xffff00)
    }
    if (estado == "izquierda") {
        cuteBot.moveTime(cuteBot.Direction.left, numSer, 1)
        cuteBot.colorLight(cuteBot.RGBLights.RGB_L, 0xffff00)
    }
    if (objeto <= 15) {
        cuteBot.stopcar()
        cuteBot.colorLight(cuteBot.RGBLights.ALL, 0xff0000)
        music.play(music.createSoundExpression(WaveShape.Square, 4322, 4451, 255, 255, 5000, SoundExpressionEffect.Vibrato, InterpolationCurve.Curve), music.PlaybackMode.UntilDone)
    }
    bluetooth.uartWriteNumber(objeto)
})
