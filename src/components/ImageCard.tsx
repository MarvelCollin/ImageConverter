import type { ImageFile } from '../interface/IImage'

interface ImageCardProps {
  image: ImageFile
  outputFormat: string
  onConvert: (imageId: string) => void
  onDownload: (imageId: string) => void
  onRemove: (imageId: string) => void
}

export const ImageCard = ({
  image,
  outputFormat,
  onConvert,
  onDownload,
  onRemove
}: ImageCardProps) => {
  return (
    <div className="border rounded-lg p-4 bg-gray-50">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-sm font-semibold truncate">{image.file.name}</h3>
        <button
          onClick={() => onRemove(image.id)}
          className="text-red-500 hover:text-red-700 text-sm"
        >
          ✕
        </button>
      </div>
      
      <div className="mb-3">
        <img 
          src={image.originalUrl} 
          alt="Original" 
          className="w-full h-32 object-cover rounded border"
        />
      </div>
      
      <div className="flex gap-2 mb-3">
        <button
          onClick={() => onConvert(image.id)}
          disabled={image.isConverting}
          className="flex-1 bg-blue-500 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-1 px-2 rounded text-sm transition-colors"
        >
          {image.isConverting ? 'Converting...' : 'Convert'}
        </button>
        
        {image.convertedUrl && (
          <button
            onClick={() => onDownload(image.id)}
            className="flex-1 bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded text-sm transition-colors"
          >
            Download
          </button>
        )}
      </div>
      
      {image.convertedUrl && (
        <div>
          <img 
            src={image.convertedUrl} 
            alt="Converted" 
            className="w-full h-32 object-cover rounded border"
          />
          <p className="text-xs text-center text-gray-600 mt-1">
            Converted to {outputFormat.toUpperCase()}
          </p>
        </div>
      )}
    </div>
  )
}
