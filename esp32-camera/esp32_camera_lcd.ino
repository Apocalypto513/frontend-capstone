#include "esp_camera.h"
#include <LiquidCrystal_I2C.h>
#include <Wire.h>

// Camera pin definitions for ESP32-CAM
#define PWDN_GPIO_NUM     32
#define RESET_GPIO_NUM    -1
#define XCLK_GPIO_NUM      0
#define SIOD_GPIO_NUM     26
#define SIOC_GPIO_NUM     27
#define Y9_GPIO_NUM       35
#define Y8_GPIO_NUM       34
#define Y7_GPIO_NUM       39
#define Y6_GPIO_NUM       36
#define Y5_GPIO_NUM       21
#define Y4_GPIO_NUM       19
#define Y3_GPIO_NUM       18
#define Y2_GPIO_NUM        5
#define VSYNC_GPIO_NUM    25
#define HREF_GPIO_NUM     23
#define PCLK_GPIO_NUM     22

// I2C pins for ESP32-CAM (using available GPIO pins)
#define SDA_PIN 14
#define SCL_PIN 15

// LCD configuration
#define LCD_ADDRESS 0x27  // Common I2C address for 16x2 LCD
#define LCD_COLS 16
#define LCD_ROWS 2

LiquidCrystal_I2C lcd(LCD_ADDRESS, LCD_COLS, LCD_ROWS);

// Detection confidence threshold
const float CONFIDENCE_THRESHOLD = 0.9;

// Sample detection data structure
struct Detection {
  String label;
  float confidence;
  bool isValid;
};

// Function prototypes
bool initializeCamera();
bool initializeLCD();
Detection performObjectDetection();
void displayDetectionOnLCD(const Detection& detection);
void clearLCD();

void setup() {
  Serial.begin(115200);
  Serial.println("ESP32 Camera with I2C LCD Starting...");
  
  // Initialize I2C for LCD
  Wire.begin(SDA_PIN, SCL_PIN);
  
  // Initialize LCD
  if (!initializeLCD()) {
    Serial.println("Failed to initialize LCD!");
    return;
  }
  
  // Initialize camera
  if (!initializeCamera()) {
    Serial.println("Failed to initialize camera!");
    return;
  }
  
  Serial.println("System initialized successfully!");
  
  // Display startup message on LCD
  lcd.setCursor(0, 0);
  lcd.print("System Ready");
  lcd.setCursor(0, 1);
  lcd.print("Detecting...");
  
  delay(2000);
}

void loop() {
  // Clear LCD before new detection cycle
  clearLCD();
  
  // Perform object detection
  Detection detection = performObjectDetection();
  
  // Display results on LCD if confidence is high enough
  if (detection.isValid && detection.confidence >= CONFIDENCE_THRESHOLD) {
    displayDetectionOnLCD(detection);
    
    // Also print to serial for debugging
    Serial.print("High confidence detection: ");
    Serial.print(detection.label);
    Serial.print(" (");
    Serial.print(detection.confidence * 100, 1);
    Serial.println("%)");
  } else {
    // Display "No detection" message
    lcd.setCursor(0, 0);
    lcd.print("No detection");
    lcd.setCursor(0, 1);
    lcd.print("Confidence < 90%");
    
    if (detection.isValid) {
      Serial.print("Low confidence detection: ");
      Serial.print(detection.label);
      Serial.print(" (");
      Serial.print(detection.confidence * 100, 1);
      Serial.println("%)");
    } else {
      Serial.println("No objects detected");
    }
  }
  
  // Wait before next detection cycle
  delay(3000);
}

bool initializeCamera() {
  camera_config_t config;
  config.ledc_channel = LEDC_CHANNEL_0;
  config.ledc_timer = LEDC_TIMER_0;
  config.pin_d0 = Y2_GPIO_NUM;
  config.pin_d1 = Y3_GPIO_NUM;
  config.pin_d2 = Y4_GPIO_NUM;
  config.pin_d3 = Y5_GPIO_NUM;
  config.pin_d4 = Y6_GPIO_NUM;
  config.pin_d5 = Y7_GPIO_NUM;
  config.pin_d6 = Y8_GPIO_NUM;
  config.pin_d7 = Y9_GPIO_NUM;
  config.pin_xclk = XCLK_GPIO_NUM;
  config.pin_pclk = PCLK_GPIO_NUM;
  config.pin_vsync = VSYNC_GPIO_NUM;
  config.pin_href = HREF_GPIO_NUM;
  config.pin_sscb_sda = SIOD_GPIO_NUM;
  config.pin_sscb_scl = SIOC_GPIO_NUM;
  config.pin_pwdn = PWDN_GPIO_NUM;
  config.pin_reset = RESET_GPIO_NUM;
  config.xclk_freq_hz = 20000000;
  config.pixel_format = PIXFORMAT_JPEG;
  
  // Image quality settings
  if (psramFound()) {
    config.frame_size = FRAMESIZE_UXGA;
    config.jpeg_quality = 10;
    config.fb_count = 2;
  } else {
    config.frame_size = FRAMESIZE_SVGA;
    config.jpeg_quality = 12;
    config.fb_count = 1;
  }
  
  // Initialize camera
  esp_err_t err = esp_camera_init(&config);
  if (err != ESP_OK) {
    Serial.printf("Camera init failed with error 0x%x\n", err);
    return false;
  }
  
  Serial.println("Camera initialized successfully");
  return true;
}

bool initializeLCD() {
  lcd.init();
  lcd.backlight();
  
  // Test LCD by displaying a message
  lcd.setCursor(0, 0);
  lcd.print("LCD Test");
  delay(1000);
  
  Serial.println("LCD initialized successfully");
  return true;
}

Detection performObjectDetection() {
  Detection detection;
  detection.isValid = false;
  
  // Capture image from camera
  camera_fb_t* fb = esp_camera_fb_get();
  if (!fb) {
    Serial.println("Camera capture failed");
    return detection;
  }
  
  // Simulate object detection processing
  // In a real implementation, this would use ML models like TensorFlow Lite
  // For demonstration, we'll simulate different detection scenarios
  
  static int cycleCount = 0;
  cycleCount++;
  
  // Simulate different detection scenarios for testing
  switch (cycleCount % 6) {
    case 0:
      detection.label = "bottle";
      detection.confidence = 0.95;
      detection.isValid = true;
      break;
    case 1:
      detection.label = "can";
      detection.confidence = 0.92;
      detection.isValid = true;
      break;
    case 2:
      detection.label = "paper";
      detection.confidence = 0.88;  // Below threshold
      detection.isValid = true;
      break;
    case 3:
      detection.label = "food_waste";
      detection.confidence = 0.93;
      detection.isValid = true;
      break;
    case 4:
      detection.label = "plastic_bag";
      detection.confidence = 0.85;  // Below threshold
      detection.isValid = true;
      break;
    case 5:
      // No detection
      detection.isValid = false;
      break;
  }
  
  // Release frame buffer
  esp_camera_fb_return(fb);
  
  return detection;
}

void displayDetectionOnLCD(const Detection& detection) {
  // Clear LCD
  lcd.clear();
  
  // Display object label on first line
  lcd.setCursor(0, 0);
  lcd.print("Detected:");
  
  // Truncate label if too long for display
  String displayLabel = detection.label;
  if (displayLabel.length() > 16) {
    displayLabel = displayLabel.substring(0, 13) + "...";
  }
  
  // Display label on second line
  lcd.setCursor(0, 1);
  lcd.print(displayLabel);
  
  // Display confidence percentage
  lcd.setCursor(LCD_COLS - 4, 1);
  lcd.print((int)(detection.confidence * 100));
  lcd.print("%");
}

void clearLCD() {
  lcd.clear();
}