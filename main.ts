let estado = ""
let prendido = 0
basic.forever(function () {
    estado = serial.readUntil(serial.delimiters(Delimiters.NewLine))
    if (estado == "encender") {
        images.iconImage(IconNames.Giraffe).showImage(0)
        prendido = 1
    }
    if (estado == "apagar") {
        images.createImage(`
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            `).showImage(0)
        prendido = 0
    }
})
