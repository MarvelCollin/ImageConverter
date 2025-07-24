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
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group">
      <div className="p-4 md:p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1 pr-2">
            <h3 className="text-sm font-semibold text-gray-800 truncate">
              {image.file.name}
            </h3>
            {image.zipPath && (
              <p className="text-xs text-gray-500 truncate">
                from: {image.zipPath}
              </p>
            )}
          </div>
          <button
            onClick={() => onRemove(image.id)}
            className="text-gray-400 hover:text-red-500 transition-colors duration-200 p-1 hover:bg-red-50 rounded-full"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="mb-4 relative overflow-hidden rounded-xl bg-gray-50">
          <img 
            src={image.originalUrl} 
            alt="Original" 
            className="w-full h-40 md:h-48 object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute top-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full font-medium">
            Original
          </div>
        </div>
        
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => onConvert(image.id)}
            disabled={image.isConverting}
            className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-2 px-3 rounded-lg text-sm transition-all duration-200 transform hover:scale-105 disabled:scale-100"
          >
            {image.isConverting ? (
              <>
                <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Converting...
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Convert
              </>
            )}
          </button>
          
          {image.convertedUrl && (
            <button
              onClick={() => onDownload(image.id)}
              className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-2 px-3 rounded-lg text-sm transition-all duration-200 transform hover:scale-105"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download
            </button>
          )}
        </div>
        
        {image.convertedUrl && (
          <div className="relative overflow-hidden rounded-xl bg-gray-50">
            <img 
              src={image.convertedUrl} 
              alt="Converted" 
              className="w-full h-40 md:h-48 object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full font-medium">
              {outputFormat.toUpperCase()}
            </div>
            <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
              Converted
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
