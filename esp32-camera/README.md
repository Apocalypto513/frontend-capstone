# ESP32 Camera with I2C LCD Display

This Arduino sketch implements object detection using an ESP32 CAM module with an I2C LCD display to show high-confidence detection results.

## Hardware Requirements

### ESP32 CAM Module
- ESP32-CAM board (AI-Thinker or similar)
- MicroSD card (optional, for image storage)
- External antenna (recommended for better WiFi reception)

### I2C LCD Display
- 16x2 character LCD with I2C backpack
- Common I2C addresses: 0x27, 0x3F (configurable in code)

### Wiring Connections

| ESP32 CAM Pin | I2C LCD Pin | Function |
|---------------|-------------|----------|
| GPIO 14       | SDA         | I2C Data |
| GPIO 15       | SCL         | I2C Clock |
| 3.3V          | VCC         | Power    |
| GND           | GND         | Ground   |

**Note**: GPIO 14 and 15 are chosen as they are available on most ESP32-CAM boards. Verify pin availability on your specific board.

## Required Arduino Libraries

Install the following libraries through the Arduino IDE Library Manager:

1. **ESP32 Camera Library** (built-in with ESP32 board package)
   - Install ESP32 board package via Board Manager
   - URL: `https://raw.githubusercontent.com/espressif/arduino-esp32/gh-pages/package_esp32_index.json`

2. **LiquidCrystal_I2C** by Frank de Brabander
   - Version: 1.1.2 or later
   - Install via Library Manager: Search for "LiquidCrystal I2C"

3. **Wire Library** (built-in with Arduino IDE)
   - Included automatically with ESP32 board package

## Features

### Object Detection
- Captures images using ESP32 camera
- Simulates object detection (placeholder for ML model integration)
- Supports confidence-based filtering

### LCD Display
- Shows detection results only when confidence ≥ 90%
- Displays object label and confidence percentage
- Shows "No detection" message for low-confidence or missing detections
- Automatically clears display between detection cycles

### Serial Output
- Maintains existing serial monitor functionality
- Displays all detections with confidence levels
- Useful for debugging and monitoring

## Configuration

### I2C Address
If your LCD uses a different I2C address, modify this line in the code:
```cpp
#define LCD_ADDRESS 0x27  // Change to 0x3F if needed
```

### Confidence Threshold
To adjust the confidence threshold, modify:
```cpp
const float CONFIDENCE_THRESHOLD = 0.9;  // 90% confidence
```

### I2C Pins
If you need to use different GPIO pins for I2C:
```cpp
#define SDA_PIN 14  // Change to your preferred SDA pin
#define SCL_PIN 15  // Change to your preferred SCL pin
```

## Installation Steps

1. **Install ESP32 Board Package**:
   - Open Arduino IDE
   - Go to File → Preferences
   - Add ESP32 board package URL to Additional Board Manager URLs
   - Go to Tools → Board → Board Manager
   - Search for "ESP32" and install the package

2. **Install Required Libraries**:
   - Open Library Manager (Tools → Manage Libraries)
   - Search and install "LiquidCrystal I2C" by Frank de Brabander

3. **Hardware Setup**:
   - Connect the I2C LCD to ESP32 CAM as per wiring table
   - Ensure proper power connections (3.3V recommended)

4. **Upload Code**:
   - Select board: "AI Thinker ESP32-CAM"
   - Connect ESP32 CAM via FTDI programmer
   - Upload the sketch

## Usage

1. Power on the ESP32 CAM
2. The LCD will show "System Ready" followed by "Detecting..."
3. The system will cycle through detection attempts every 3 seconds
4. High-confidence detections (≥90%) will be displayed on LCD
5. Low-confidence detections will show "No detection" message
6. All results are also printed to Serial Monitor (115200 baud)

## Detection Simulation

The current implementation includes simulation code that cycles through different detection scenarios:
- bottle (95% confidence) ✓ Displayed
- can (92% confidence) ✓ Displayed  
- paper (88% confidence) ✗ Below threshold
- food_waste (93% confidence) ✓ Displayed
- plastic_bag (85% confidence) ✗ Below threshold
- No detection scenario

## Future Enhancements

### Real Object Detection Integration
To integrate actual ML-based object detection:

1. **TensorFlow Lite Micro**:
   - Add TensorFlow Lite for Microcontrollers library
   - Load pre-trained model (e.g., MobileNet, YOLO)
   - Replace simulation code with actual inference

2. **Edge Impulse Integration**:
   - Train custom model using Edge Impulse
   - Export as Arduino library
   - Integrate inference pipeline

3. **WiFi Integration**:
   - Send detection results to web server/database
   - Integrate with existing React frontend dashboard
   - Real-time monitoring and alerts

### Hardware Optimizations
- Add external PSRAM for larger models
- Implement power management for battery operation
- Add SD card logging for detection history

## Troubleshooting

### LCD Not Working
- Check I2C connections (SDA/SCL pins)
- Verify LCD I2C address using I2C scanner
- Ensure adequate power supply (3.3V, sufficient current)

### Camera Initialization Failed
- Check camera module connections
- Verify ESP32 CAM board selection
- Ensure camera module is properly seated

### Compilation Errors
- Verify all required libraries are installed
- Check ESP32 board package version (recommended: 2.0.0+)
- Ensure correct board selection in Arduino IDE

## Serial Monitor Output Example

```
ESP32 Camera with I2C LCD Starting...
LCD initialized successfully
Camera initialized successfully
System initialized successfully
High confidence detection: bottle (95.0%)
Low confidence detection: paper (88.0%)
High confidence detection: food_waste (93.0%)
No objects detected
```

## License

This project is provided as-is for educational and development purposes.