import { useRef } from 'react'

interface FileInputProps {
  onFileSelect: (files: FileList) => void
}

export const FileInput = ({ onFileSelect }: FileInputProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files || files.length === 0) return
    onFileSelect(files)
  }

  const resetInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div className="mb-8">
      <div className="relative group">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileSelect}
          accept="image/*,.zip"
          multiple
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
        />
        <div className="border-3 border-dashed border-gray-300 group-hover:border-blue-400 group-focus-within:border-blue-500 rounded-2xl p-8 md:p-12 text-center transition-all duration-300 bg-gradient-to-br from-gray-50 to-blue-50 group-hover:from-blue-50 group-hover:to-purple-50">
          <div className="space-y-4">
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-700 mb-2">
                Drop your images or ZIP files here
              </h3>
              <p className="text-gray-500 text-sm md:text-base">
                or click to select multiple files
              </p>
              <p className="text-xs text-gray-400 mt-2">
                Supports PNG, JPG, JPEG, WEBP, BMP, GIF and ZIP archives
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
