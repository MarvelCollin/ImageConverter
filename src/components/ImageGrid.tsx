import type { ImageFile } from '../interface/IImage'
import { ImageCard } from './ImageCard'

interface ImageGridProps {
  images: ImageFile[]
  outputFormat: string
  onConvert: (imageId: string) => void
  onDownload: (imageId: string) => void
  onRemove: (imageId: string) => void
}

export const ImageGrid = ({
  images,
  outputFormat,
  onConvert,
  onDownload,
  onRemove
}: ImageGridProps) => {
  if (images.length === 0) return null

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {images.map((image) => (
        <ImageCard
          key={image.id}
          image={image}
          outputFormat={outputFormat}
          onConvert={onConvert}
          onDownload={onDownload}
          onRemove={onRemove}
        />
      ))}
    </div>
  )
}
