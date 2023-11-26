estado = ""
prendido = 0
numSer = 0

def on_forever():
    global estado, prendido, numSer
    estado = serial.read_until(serial.delimiters(Delimiters.NEW_LINE))
    if estado == "encender":
        images.icon_image(IconNames.GIRAFFE).show_image(0)
        prendido = 1
    if estado == "apagar":
        basic.clear_screen()
        prendido = 0
    numSer = parse_float(estado)
    if prendido == 1:
        cuteBot.color_light(cuteBot.RGBLights.ALL, 0x00ffff)
        cuteBot.motors(numSer, numSer)
    else:
        cuteBot.color_light(cuteBot.RGBLights.ALL, 0xff00ff)
        cuteBot.stopcar()
basic.forever(on_forever)
