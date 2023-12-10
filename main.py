prendido = 0
estado = ""
vel = 0
numSer = 0
objeto = 0
def Apagar():
    global prendido
    basic.clear_screen()
    prendido = 0
    cuteBot.closeheadlights()
    return prendido
def Encender():
    global prendido
    images.icon_image(IconNames.GIRAFFE).show_image(0)
    prendido = 1
    cuteBot.color_light(cuteBot.RGBLights.ALL, 0x00ffff)
    return prendido
def Velocidad():
    global vel, numSer
    if prendido == 0:
        cuteBot.stopcar()
        vel = 0
    elif estado.includes("Velocidad"):
        numSer = parse_float(estado.substr(11, 15))
        vel = numSer
    return vel

def on_forever():
    global estado, objeto
    estado = serial.read_until(serial.delimiters(Delimiters.NEW_LINE))
    objeto = cuteBot.ultrasonic(cuteBot.SonarUnit.CENTIMETERS)
    serial.write_string("" + str(objeto) + " \n")
    if estado == "encender":
        Encender()
    if estado == "apagar":
        Apagar()
    Velocidad()
    if estado == "arriba":
        cuteBot.color_light(cuteBot.RGBLights.ALL, 0xffffff)
        cuteBot.move_time(cuteBot.Direction.FORWARD, vel, 0.1)
    if estado == "abajo":
        cuteBot.move_time(cuteBot.Direction.BACKWARD, vel, 0.1)
        cuteBot.color_light(cuteBot.RGBLights.ALL, 0xff0080)
        music.play(music.create_sound_expression(WaveShape.SQUARE,
                2672,
                1542,
                255,
                245,
                100,
                SoundExpressionEffect.VIBRATO,
                InterpolationCurve.LOGARITHMIC),
            music.PlaybackMode.UNTIL_DONE)
    if estado == "derecha":
        cuteBot.move_time(cuteBot.Direction.RIGHT, vel, 0.1)
        cuteBot.color_light(cuteBot.RGBLights.RGB_L, 0xffffff)
        cuteBot.color_light(cuteBot.RGBLights.RGB_R, 0xffff00)
    if estado == "izquierda":
        cuteBot.move_time(cuteBot.Direction.LEFT, vel, 0.1)
        cuteBot.color_light(cuteBot.RGBLights.RGB_R, 0xffffff)
        cuteBot.color_light(cuteBot.RGBLights.RGB_L, 0xffff00)
    if objeto <= 10:
        objeto = cuteBot.ultrasonic(cuteBot.SonarUnit.CENTIMETERS)
        cuteBot.color_light(cuteBot.RGBLights.ALL, 0xff0000)
        music.play(music.create_sound_expression(WaveShape.SQUARE,
                4322,
                4451,
                255,
                255,
                100,
                SoundExpressionEffect.VIBRATO,
                InterpolationCurve.CURVE),
            music.PlaybackMode.UNTIL_DONE)
basic.forever(on_forever)
