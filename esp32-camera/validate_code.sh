#!/bin/bash

# Simple validation script for ESP32 Arduino code
echo "Validating ESP32 camera code structure..."

INO_FILE="esp32_camera_lcd.ino"

if [ ! -f "$INO_FILE" ]; then
    echo "❌ ERROR: $INO_FILE not found"
    exit 1
fi

echo "✅ Arduino sketch file found: $INO_FILE"

# Check for required includes
if grep -q "#include \"esp_camera.h\"" "$INO_FILE"; then
    echo "✅ ESP32 camera library included"
else
    echo "❌ Missing ESP32 camera library include"
fi

if grep -q "#include <LiquidCrystal_I2C.h>" "$INO_FILE"; then
    echo "✅ LiquidCrystal_I2C library included"
else
    echo "❌ Missing LiquidCrystal_I2C library include"
fi

if grep -q "#include <Wire.h>" "$INO_FILE"; then
    echo "✅ Wire library included"
else
    echo "❌ Missing Wire library include"
fi

# Check for required functions
if grep -q "void setup()" "$INO_FILE"; then
    echo "✅ setup() function found"
else
    echo "❌ Missing setup() function"
fi

if grep -q "void loop()" "$INO_FILE"; then
    echo "✅ loop() function found"
else
    echo "❌ Missing loop() function"
fi

# Check for I2C pin definitions
if grep -q "SDA_PIN" "$INO_FILE"; then
    echo "✅ SDA pin configured"
else
    echo "❌ Missing SDA pin configuration"
fi

if grep -q "SCL_PIN" "$INO_FILE"; then
    echo "✅ SCL pin configured"
else
    echo "❌ Missing SCL pin configuration"
fi

# Check for confidence threshold
if grep -q "CONFIDENCE_THRESHOLD" "$INO_FILE"; then
    echo "✅ Confidence threshold defined"
else
    echo "❌ Missing confidence threshold"
fi

# Check for LCD functions
if grep -q "initializeLCD" "$INO_FILE"; then
    echo "✅ LCD initialization function found"
else
    echo "❌ Missing LCD initialization function"
fi

if grep -q "displayDetectionOnLCD" "$INO_FILE"; then
    echo "✅ LCD display function found"
else
    echo "❌ Missing LCD display function"
fi

if grep -q "clearLCD" "$INO_FILE"; then
    echo "✅ LCD clear function found"
else
    echo "❌ Missing LCD clear function"
fi

echo ""
echo "Code structure validation completed!"
echo "Note: This validates basic structure only. Hardware testing required for full validation."