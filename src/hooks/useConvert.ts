import { useState, useRef } from 'react'
import type { ImageFile, ConvertOptions, SupportedFormat } from '../interface/IImage'

export const useConvert = () => {
  const [images, setImages] = useState<ImageFile[]>([])
  const [isConverting, setIsConverting] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const formats: SupportedFormat[] = ['auto', 'png', 'jpg', 'jpeg', 'webp', 'bmp', 'gif']

  const detectFormat = (file: File): string => {
    const extension = file.name.split('.').pop()?.toLowerCase()
    if (extension && ['png', 'jpg', 'jpeg', 'webp', 'bmp', 'gif'].includes(extension)) {
      return extension === 'jpg' ? 'jpeg' : extension
    }
    return 'png'
  }

  const addImages = (files: FileList) => {
    const newImages: ImageFile[] = []
    
    Array.from(files).forEach((file, index) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        const imageFile: ImageFile = {
          id: `${Date.now()}-${index}`,
          file: file,
          originalUrl: e.target?.result as string,
          convertedUrl: null,
          isConverting: false
        }
        newImages.push(imageFile)
        
        if (newImages.length === files.length) {
          setImages(prev => [...prev, ...newImages])
        }
      }
      reader.readAsDataURL(file)
    })
  }

  const convertSingleImage = (imageId: string, options: ConvertOptions) => {
    const imageIndex = images.findIndex(img => img.id === imageId)
    if (imageIndex === -1 || !canvasRef.current) return

    setImages(prev => prev.map(img => 
      img.id === imageId ? { ...img, isConverting: true } : img
    ))

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const img = new Image()

    img.onload = () => {
      canvas.width = img.width
      canvas.height = img.height
      
      ctx?.drawImage(img, 0, 0)
      
      const mimeType = options.outputFormat === 'jpg' ? 'image/jpeg' : `image/${options.outputFormat}`
      const quality = options.outputFormat === 'jpg' || options.outputFormat === 'jpeg' ? 0.9 : undefined
      
      const convertedDataUrl = canvas.toDataURL(mimeType, quality)
      
      setImages(prev => prev.map(img => 
        img.id === imageId 
          ? { ...img, convertedUrl: convertedDataUrl, isConverting: false }
          : img
      ))
    }

    img.src = images[imageIndex].originalUrl
  }

  const convertAllImages = async (options: ConvertOptions) => {
    setIsConverting(true)
    
    for (const image of images) {
      if (!image.convertedUrl) {
        await new Promise<void>((resolve) => {
          const canvas = canvasRef.current
          if (!canvas) {
            resolve()
            return
          }

          setImages(prev => prev.map(img => 
            img.id === image.id ? { ...img, isConverting: true } : img
          ))

          const ctx = canvas.getContext('2d')
          const img = new Image()

          img.onload = () => {
            canvas.width = img.width
            canvas.height = img.height
            
            ctx?.drawImage(img, 0, 0)
            
            const mimeType = options.outputFormat === 'jpg' ? 'image/jpeg' : `image/${options.outputFormat}`
            const quality = options.outputFormat === 'jpg' || options.outputFormat === 'jpeg' ? 0.9 : undefined
            
            const convertedDataUrl = canvas.toDataURL(mimeType, quality)
            
            setImages(prev => prev.map(img => 
              img.id === image.id 
                ? { ...img, convertedUrl: convertedDataUrl, isConverting: false }
                : img
            ))
            resolve()
          }

          img.src = image.originalUrl
        })
      }
    }
    
    setIsConverting(false)
  }

  const downloadSingleImage = (imageId: string, outputFormat: string) => {
    const image = images.find(img => img.id === imageId)
    if (!image || !image.convertedUrl) return

    const link = document.createElement('a')
    const originalName = image.file.name.split('.')[0]
    link.download = `${originalName}_converted.${outputFormat}`
    link.href = image.convertedUrl
    link.click()
  }

  const downloadAllImages = (outputFormat: string) => {
    images.forEach(image => {
      if (image.convertedUrl) {
        const link = document.createElement('a')
        const originalName = image.file.name.split('.')[0]
        link.download = `${originalName}_converted.${outputFormat}`
        link.href = image.convertedUrl
        link.click()
      }
    })
  }

  const removeImage = (imageId: string) => {
    setImages(prev => prev.filter(img => img.id !== imageId))
  }

  const resetImages = () => {
    setImages([])
    setIsConverting(false)
  }

  return {
    images,
    isConverting,
    canvasRef,
    formats,
    detectFormat,
    addImages,
    convertSingleImage,
    convertAllImages,
    downloadSingleImage,
    downloadAllImages,
    removeImage,
    resetImages
  }
}
