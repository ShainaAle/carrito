let prendido = 0
let estado = ""
let vel = 0
let numSer = 0
let objeto = 0
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
    if (prendido == 0) {
        cuteBot.stopcar()
        vel = 0
    } else if (estado.includes("Velocidad")) {
        numSer = parseFloat(estado.substr(11, 15))
        vel = numSer
    }
    return vel
}
basic.forever(function () {
    estado = serial.readUntil(serial.delimiters(Delimiters.NewLine))
    objeto = cuteBot.ultrasonic(cuteBot.SonarUnit.Centimeters)
    serial.writeString("" + objeto + " \n")
    if (estado == "encender") {
        Encender()
    }
    if (estado == "apagar") {
        Apagar()
    }
    Velocidad()
    if (estado == "arriba") {
        cuteBot.colorLight(cuteBot.RGBLights.ALL, 0xffffff)
        cuteBot.moveTime(cuteBot.Direction.forward, vel, 0.1)
    }
    if (estado == "abajo") {
        cuteBot.moveTime(cuteBot.Direction.backward, vel, 0.1)
        cuteBot.colorLight(cuteBot.RGBLights.ALL, 0xff0080)
        music.play(music.createSoundExpression(WaveShape.Square, 2672, 1542, 255, 245, 100, SoundExpressionEffect.Vibrato, InterpolationCurve.Logarithmic), music.PlaybackMode.UntilDone)
    }
    if (estado == "derecha") {
        cuteBot.moveTime(cuteBot.Direction.right, vel, 0.1)
        cuteBot.colorLight(cuteBot.RGBLights.RGB_L, 0xffffff)
        cuteBot.colorLight(cuteBot.RGBLights.RGB_R, 0xffff00)
    }
    if (estado == "izquierda") {
        cuteBot.moveTime(cuteBot.Direction.left, vel, 0.1)
        cuteBot.colorLight(cuteBot.RGBLights.RGB_R, 0xffffff)
        cuteBot.colorLight(cuteBot.RGBLights.RGB_L, 0xffff00)
    }
    if (objeto <= 10) {
        objeto = cuteBot.ultrasonic(cuteBot.SonarUnit.Centimeters)
        cuteBot.colorLight(cuteBot.RGBLights.ALL, 0xff0000)
        music.play(music.createSoundExpression(WaveShape.Square, 4322, 4451, 255, 255, 100, SoundExpressionEffect.Vibrato, InterpolationCurve.Curve), music.PlaybackMode.UntilDone)
    }
})
