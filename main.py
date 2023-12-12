def on_bluetooth_connected():
    images.icon_image(IconNames.YES).show_image(0)
bluetooth.on_bluetooth_connected(on_bluetooth_connected)

def on_bluetooth_disconnected():
    images.icon_image(IconNames.NO).show_image(0)
    cuteBot.stopcar()
bluetooth.on_bluetooth_disconnected(on_bluetooth_disconnected)

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

def on_uart_data_received():
    global estado, objeto
    estado = bluetooth.uart_read_until(serial.delimiters(Delimiters.NEW_LINE))
    objeto = cuteBot.ultrasonic(cuteBot.SonarUnit.CENTIMETERS)
    if estado == "encender":
        Encender()
    if estado == "apagar":
        Apagar()
    Velocidad()
    if estado == "arriba":
        cuteBot.move_time(cuteBot.Direction.FORWARD, numSer, 1)
    if estado == "abajo":
        cuteBot.move_time(cuteBot.Direction.BACKWARD, numSer, 1)
        music.play(music.create_sound_expression(WaveShape.SQUARE,
                2672,
                1542,
                255,
                245,
                1000,
                SoundExpressionEffect.VIBRATO,
                InterpolationCurve.LOGARITHMIC),
            music.PlaybackMode.UNTIL_DONE)
    if estado == "derecha":
        cuteBot.move_time(cuteBot.Direction.RIGHT, numSer, 1)
        cuteBot.color_light(cuteBot.RGBLights.RGB_R, 0xffff00)
    if estado == "izquierda":
        cuteBot.move_time(cuteBot.Direction.LEFT, numSer, 1)
        cuteBot.color_light(cuteBot.RGBLights.RGB_L, 0xffff00)
    if objeto <= 15:
        cuteBot.color_light(cuteBot.RGBLights.ALL, 0xff0000)
        music.play(music.create_sound_expression(WaveShape.SQUARE,
                4322,
                4451,
                255,
                255,
                5000,
                SoundExpressionEffect.VIBRATO,
                InterpolationCurve.CURVE),
            music.PlaybackMode.UNTIL_DONE)
    bluetooth.uart_write_number(objeto)
bluetooth.on_uart_data_received(serial.delimiters(Delimiters.NEW_LINE),
    on_uart_data_received)

def Velocidad():
    global numSer
    numSer = parse_float(estado)
    if prendido == 0:
        cuteBot.stopcar()
    return numSer
numSer = 0
objeto = 0
estado = ""
prendido = 0
bluetooth.start_accelerometer_service()
bluetooth.start_io_pin_service()
bluetooth.start_uart_service()
bluetooth.start_led_service()
bluetooth.set_transmit_power(1)