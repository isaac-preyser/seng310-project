# SENG 310 Project - Signature Recognition & Guest List App

A web-based signature recognition application that uses OCR (Optical Character Recognition) to extract text from handwritten signatures and manage a guest list for networking events.

## Features

### ✍️ Digital Signature Canvas
- Interactive drawing canvas powered by [js-draw](https://github.com/personalizedrefrigerator/js-draw)
- Material design icons for an intuitive user experience
- Draw signatures directly in the browser
- Clear and submit functionality

### 🔍 OCR Text Recognition
- Real-time text recognition from handwritten signatures
- Powered by [Tesseract.js](https://tesseract.projectnapps.com/) for accurate OCR processing
- Extracts text from both drawn signatures and uploaded images
- Automatic conversion from SVG canvas to PNG for OCR processing

### 📋 Guest List Management
- Automatic guest registration after signature submission
- Interactive confirmation dialog for adding guests
- Display of all registered guests
- Perfect for networking events, conferences, and meetups

### 📤 Image Upload
- Upload existing signature images
- Support for various image formats
- Real-time text extraction from uploaded images

## Tech Stack

- **Frontend Framework**: React 19 with TypeScript
- **Build Tool**: Vite 6
- **Drawing Library**: js-draw with Material Icons
- **OCR Engine**: Tesseract.js 6
- **Styling**: CSS with custom styles
- **Linting**: ESLint with TypeScript support

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/isaac-preyser/seng310-project.git
cd seng310-project/seng-310
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to the URL shown in the terminal (typically `http://localhost:5173`)

## Usage

1. **Sign In**: Draw your signature using your mouse or touchscreen on the canvas
2. **Submit**: Click the "Submit" button to process your signature with OCR
3. **Confirm**: Review the recognized text and choose whether to add your name to the guest list
4. **View Guests**: See all registered guests in the guest list below the canvas

### Alternative: Upload Image
- Click to show the image uploader
- Select an image file containing a signature or text
- The app will automatically extract and display the recognized text

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint for code quality checks

## Project Structure

```
seng-310/
├── src/
│   ├── App.tsx              # Main application component
│   ├── ImageUploader.tsx    # Image upload component
│   ├── TextRecognition.tsx  # OCR processing component
│   ├── App.css              # Application styles
│   ├── index.css            # Global styles
│   └── main.tsx             # Application entry point
├── public/                  # Static assets
├── package.json             # Project dependencies
├── vite.config.ts           # Vite configuration
└── tsconfig.json            # TypeScript configuration
```

## How It Works

1. **Drawing Phase**: Users draw their signature on the canvas using the js-draw library
2. **Conversion**: The SVG canvas is converted to a PNG blob
3. **OCR Processing**: Tesseract.js analyzes the image and extracts text
4. **User Confirmation**: A dialog asks if the user wants to join the guest list
5. **Guest Registration**: Confirmed names are added to the displayed guest list

## Browser Compatibility

This application works best on modern browsers with support for:
- Canvas API
- Web Workers (for Tesseract.js)
- ES6+ JavaScript features

## Contributing

This is a student project for SENG 310. Contributions, issues, and feature requests are welcome!

## License

This project is part of an academic assignment at the University of Victoria.

## Acknowledgments

- [js-draw](https://github.com/personalizedrefrigerator/js-draw) for the drawing canvas
- [Tesseract.js](https://tesseract.projectnapps.com/) for OCR capabilities
- University of Victoria SENG 310 course
