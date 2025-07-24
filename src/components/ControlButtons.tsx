interface ControlButtonsProps {
  imageCount: number
  isConverting: boolean
  hasConvertedImages: boolean
  onConvertAll: () => void
  onDownloadAll: () => void
  onReset: () => void
}

export const ControlButtons = ({
  imageCount,
  isConverting,
  hasConvertedImages,
  onConvertAll,
  onDownloadAll,
  onReset
}: ControlButtonsProps) => {
  if (imageCount === 0) return null

  return (
    <div className="flex justify-center gap-4 mb-6">
      <button
        onClick={onConvertAll}
        disabled={isConverting}
        className="bg-blue-500 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-2 px-6 rounded transition-colors"
      >
        {isConverting ? 'Converting All...' : `Convert All (${imageCount})`}
      </button>
      
      <button
        onClick={onDownloadAll}
        disabled={!hasConvertedImages}
        className="bg-green-500 hover:bg-green-700 disabled:bg-gray-400 text-white font-bold py-2 px-6 rounded transition-colors"
      >
        Download All
      </button>
      
      <button
        onClick={onReset}
        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded transition-colors"
      >
        Reset All
      </button>
    </div>
  )
}
