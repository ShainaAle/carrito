let estado = ""
let prendido = 0
let numSer = 0
basic.forever(function () {
    estado = serial.readUntil(serial.delimiters(Delimiters.NewLine))
    if (estado == "encender") {
        images.iconImage(IconNames.Giraffe).showImage(0)
        prendido = 1
    }
    if (estado == "apagar") {
        basic.clearScreen()
        prendido = 0
    }
    numSer = parseFloat(estado.substr(0, 3))
    if (prendido == 1) {
        cuteBot.moveTime(cuteBot.Direction.forward, numSer, 10)
        cuteBot.colorLight(cuteBot.RGBLights.ALL, 0x00ffff)
    } else {
        cuteBot.colorLight(cuteBot.RGBLights.ALL, 0xff00ff)
    }
})
