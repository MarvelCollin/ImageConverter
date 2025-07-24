export interface ImageFile {
  id: string
  file: File
  originalUrl: string
  convertedUrl: string | null
  isConverting: boolean
}

export interface ConvertOptions {
  outputFormat: string
  quality?: number
}

export type SupportedFormat = 'auto' | 'png' | 'jpg' | 'jpeg' | 'webp' | 'bmp' | 'gif'
