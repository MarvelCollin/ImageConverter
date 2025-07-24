export interface ImageFile {
  id: string
  file: File
  originalUrl: string
  convertedUrl: string | null
  isConverting: boolean
  zipPath?: string
}

export interface ConvertOptions {
  outputFormat: string
  quality?: number
}

export interface ZipEntry {
  path: string
  file: File
}

export type SupportedFormat = 'auto' | 'png' | 'jpg' | 'jpeg' | 'webp' | 'bmp' | 'gif'
