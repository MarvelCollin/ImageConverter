import { useState } from 'react'
import { useConvert } from './hooks/useConvert'
import { FormatSelector } from './components/FormatSelector'
import { FileInput } from './components/FileInput'
import { ControlButtons } from './components/ControlButtons'
import { ImageGrid } from './components/ImageGrid'

function App() {
  const [inputFormat, setInputFormat] = useState('auto')
  const [outputFormat, setOutputFormat] = useState('png')
  
  const {
    images,
    isConverting,
    canvasRef,
    formats,
    addImages,
    convertSingleImage,
    convertAllImages,
    downloadSingleImage,
    downloadAllImages,
    removeImage,
    resetImages
  } = useConvert()

  const handleConvertSingle = (imageId: string) => {
    convertSingleImage(imageId, { outputFormat })
  }

  const handleConvertAll = () => {
    convertAllImages({ outputFormat })
  }

  const handleDownloadSingle = (imageId: string) => {
    downloadSingleImage(imageId, outputFormat)
  }

  const handleDownloadAll = () => {
    downloadAllImages(outputFormat)
  }

  const hasConvertedImages = images.some(img => img.convertedUrl)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Image Converter
          </h1>
          <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto">
            Convert your images to any format with ease. Support for multiple files and batch processing.
          </p>
        </div>
        
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 md:p-8 mb-8">
          <FormatSelector
            inputFormat={inputFormat}
            outputFormat={outputFormat}
            formats={formats}
            onInputFormatChange={setInputFormat}
            onOutputFormatChange={setOutputFormat}
          />

          <FileInput onFileSelect={addImages} />

          <ControlButtons
            imageCount={images.length}
            isConverting={isConverting}
            hasConvertedImages={hasConvertedImages}
            onConvertAll={handleConvertAll}
            onDownloadAll={handleDownloadAll}
            onReset={resetImages}
          />

          <ImageGrid
            images={images}
            outputFormat={outputFormat}
            onConvert={handleConvertSingle}
            onDownload={handleDownloadSingle}
            onRemove={removeImage}
          />
        </div>
      </div>
      
      <canvas ref={canvasRef} className="hidden" />
    </div>
  )
}

export default App
