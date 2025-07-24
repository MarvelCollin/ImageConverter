# Image Converter

A browser-based image conversion tool built with React, TypeScript, and Vite. Convert images between multiple formats with support for individual files, batch processing, and ZIP archive handling.

## Features

### Core Functionality
- **Multi-format Support**: Convert between PNG, JPG/JPEG, WEBP, BMP, and GIF formats
- **Auto-format Detection**: Automatically detect input image format
- **Batch Processing**: Convert multiple images simultaneously
- **ZIP Archive Support**: Extract and convert images from ZIP files while preserving folder structure

### File Operations
- **Drag & Drop Interface**: Intuitive file upload with drag-and-drop support
- **Multiple File Selection**: Select and process multiple images at once
- **Individual File Management**: Convert, download, or remove individual images
- **Bulk Operations**: Convert all images, download all individually, or package as ZIP

### Download Options
- **Individual Downloads**: Download converted images one by one
- **Bulk Downloads**: Download all converted images separately
- **ZIP Package**: Download all converted images as a single ZIP archive
- **Original Structure Preservation**: Maintain folder structure from original ZIP files

### User Interface
- **Modern Design**: Clean, responsive interface with gradient backgrounds
- **Real-time Status**: Visual indicators for conversion progress
- **Format Selection**: Easy-to-use dropdowns for input and output format selection
- **Image Grid**: Visual grid display of all uploaded and converted images
- **Mobile Responsive**: Optimized for both desktop and mobile devices

### Technical Features
- **Canvas-based Conversion**: Uses HTML5 Canvas for client-side image processing
- **No Server Required**: All processing happens in the browser
- **High Quality Output**: Configurable quality settings for JPEG compression (90% quality)
- **Memory Efficient**: Proper cleanup and URL management for large files

## Application Showcase 

## Supported Formats

### Input Formats
- PNG
- JPG/JPEG
- WEBP
- BMP
- GIF
- ZIP archives containing images

### Output Formats
- PNG
- JPG/JPEG
- WEBP
- BMP
- GIF

## Installation & Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start development server:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```

4. Preview production build:
   ```bash
   npm run preview
   ```