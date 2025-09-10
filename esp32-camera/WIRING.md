# Wiring Diagram for ESP32 CAM with I2C LCD

## ESP32 CAM Pinout Reference

```
                    ESP32-CAM
                 ┌─────────────┐
                 │             │
     FLASH   ────┤ IO0         │
             ────┤ GND     3V3 ├──── 3.3V Power
                 │             │
     RST     ────┤ IO1     IO2 ├──── (Camera)
                 │             │
            ────┤ IO3     IO4 ├──── LED Flash
                 │             │
            ────┤ IO12   IO13 ├──── 
                 │             │
     SDA    ────┤ IO14   IO15 ├──── SCL (I2C Clock)
             │   │             │   │
             │   │ IO16   GND  ├───┤
             │   │             │   │
             │   └─────────────┘   │
             │                     │
             └─────────────────────┤
                                   │
                             ┌─────────┐
                             │ I2C LCD │
                             │ Module  │
                             │         │
                        VCC ─┤ VCC     │ ← 3.3V
                        GND ─┤ GND     │ ← Ground  
                        SDA ─┤ SDA     │ ← GPIO 14
                        SCL ─┤ SCL     │ ← GPIO 15
                             │         │
                             └─────────┘
```

## Connection Table

| Component | Pin | ESP32 CAM GPIO | Function |
|-----------|-----|----------------|----------|
| I2C LCD   | VCC | 3V3            | Power Supply |
| I2C LCD   | GND | GND            | Ground |
| I2C LCD   | SDA | GPIO 14        | I2C Data Line |
| I2C LCD   | SCL | GPIO 15        | I2C Clock Line |

## Important Notes

### Power Supply
- Use 3.3V for LCD power (VCC)
- Ensure ESP32 CAM has adequate power supply (5V via USB or external adapter)
- Some LCD modules may require 5V - check your specific module requirements

### GPIO Pin Selection
- GPIO 14 and 15 are chosen as they are typically available on ESP32-CAM
- These pins are not used by the camera interface
- Verify pin availability on your specific ESP32-CAM variant

### I2C Address
- Most I2C LCD modules use address 0x27 or 0x3F
- Use an I2C scanner if you're unsure of your module's address
- Address can be changed in the code if needed

### Pull-up Resistors
- Most I2C LCD modules have built-in pull-up resistors
- If you experience communication issues, add external 4.7kΩ pull-up resistors on SDA and SCL lines

## Testing the Connection

1. Upload the provided Arduino sketch
2. Open Serial Monitor at 115200 baud
3. You should see initialization messages
4. LCD should display "LCD Test" briefly, then "System Ready"
5. Detection simulation will begin automatically

## Troubleshooting

### LCD Not Detected
- Check all connections
- Verify I2C address (try 0x3F if 0x27 doesn't work)
- Ensure adequate power supply
- Check for loose connections

### Camera Issues
- Camera initialization is independent of LCD
- Refer to ESP32-CAM documentation for camera troubleshooting
- Ensure camera module is properly connected and seated