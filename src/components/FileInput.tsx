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
    <div className="mb-6">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        accept="image/*"
        multiple
        className="w-full p-2 border-2 border-dashed border-gray-300 rounded-md hover:border-gray-400 focus:border-blue-500"
      />
      <p className="text-sm text-gray-500 mt-2">Select multiple image files to convert</p>
    </div>
  )
}
