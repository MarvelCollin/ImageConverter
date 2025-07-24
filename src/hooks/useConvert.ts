import { useState, useRef } from 'react'
import JSZip from 'jszip'
import type { ImageFile, ConvertOptions, SupportedFormat, ZipEntry } from '../interface/IImage'

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

  const addImages = async (files: FileList) => {
    const newImages: ImageFile[] = []
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      
      if (file.type === 'application/zip' || file.name.endsWith('.zip')) {
        const zipImages = await extractImagesFromZip(file)
        newImages.push(...zipImages)
      } else if (file.type.startsWith('image/')) {
        const reader = new FileReader()
        await new Promise<void>((resolve) => {
          reader.onload = (e) => {
            const imageFile: ImageFile = {
              id: `${Date.now()}-${i}`,
              file: file,
              originalUrl: e.target?.result as string,
              convertedUrl: null,
              isConverting: false
            }
            newImages.push(imageFile)
            resolve()
          }
          reader.readAsDataURL(file)
        })
      }
    }
    
    setImages(prev => [...prev, ...newImages])
  }

  const extractImagesFromZip = async (zipFile: File): Promise<ImageFile[]> => {
    const zip = new JSZip()
    const zipContent = await zip.loadAsync(zipFile)
    const images: ImageFile[] = []
    
    for (const [path, file] of Object.entries(zipContent.files)) {
      if (!file.dir && isImageFile(path)) {
        const blob = await file.async('blob')
        const imageFile = new File([blob], path.split('/').pop() || path, { type: getImageMimeType(path) })
        
        const reader = new FileReader()
        await new Promise<void>((resolve) => {
          reader.onload = (e) => {
            const image: ImageFile = {
              id: `zip-${Date.now()}-${Math.random()}`,
              file: imageFile,
              originalUrl: e.target?.result as string,
              convertedUrl: null,
              isConverting: false,
              zipPath: path
            }
            images.push(image)
            resolve()
          }
          reader.readAsDataURL(imageFile)
        })
      }
    }
    
    return images
  }

  const isImageFile = (filename: string): boolean => {
    const imageExtensions = ['.png', '.jpg', '.jpeg', '.webp', '.bmp', '.gif']
    return imageExtensions.some(ext => filename.toLowerCase().endsWith(ext))
  }

  const getImageMimeType = (filename: string): string => {
    const ext = filename.toLowerCase().split('.').pop()
    switch (ext) {
      case 'png': return 'image/png'
      case 'jpg':
      case 'jpeg': return 'image/jpeg'
      case 'webp': return 'image/webp'
      case 'bmp': return 'image/bmp'
      case 'gif': return 'image/gif'
      default: return 'image/png'
    }
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
    const convertedImages = images.filter(img => img.convertedUrl)
    convertedImages.forEach(image => {
      const link = document.createElement('a')
      const originalName = image.file.name.split('.')[0]
      link.download = `${originalName}_converted.${outputFormat}`
      link.href = image.convertedUrl!
      link.click()
    })
  }

  const downloadAllImagesAsZip = async (outputFormat: string) => {
    const convertedImages = images.filter(img => img.convertedUrl)
    if (convertedImages.length === 0) return

    const zip = new JSZip()
    
    for (const image of convertedImages) {
      if (image.convertedUrl) {
        const response = await fetch(image.convertedUrl)
        const blob = await response.blob()
        
        const originalName = image.file.name.split('.')[0]
        const fileName = `${originalName}_converted.${outputFormat}`
        
        if (image.zipPath) {
          const dirPath = image.zipPath.substring(0, image.zipPath.lastIndexOf('/'))
          const fullPath = dirPath ? `${dirPath}/${fileName}` : fileName
          zip.file(fullPath, blob)
        } else {
          zip.file(fileName, blob)
        }
      }
    }
    
    const zipBlob = await zip.generateAsync({ type: 'blob' })
    const link = document.createElement('a')
    link.download = `converted_images_${outputFormat}.zip`
    link.href = URL.createObjectURL(zipBlob)
    link.click()
    URL.revokeObjectURL(link.href)
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
    downloadAllImagesAsZip,
    removeImage,
    resetImages
  }
}
