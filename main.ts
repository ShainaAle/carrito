let estado = ""
basic.forever(function () {
    estado = serial.readUntil(serial.delimiters(Delimiters.NewLine))
    if (estado == "encender") {
        images.iconImage(IconNames.Giraffe).showImage(0)
    }
    if (estado == "apagar") {
        images.createImage(`
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            `).showImage(0)
    }
})
