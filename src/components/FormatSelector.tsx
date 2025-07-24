import type { SupportedFormat } from '../interface/IImage'

interface FormatSelectorProps {
  inputFormat: string
  outputFormat: string
  formats: SupportedFormat[]
  onInputFormatChange: (format: string) => void
  onOutputFormatChange: (format: string) => void
}

export const FormatSelector = ({
  inputFormat,
  outputFormat,
  formats,
  onInputFormatChange,
  onOutputFormatChange
}: FormatSelectorProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Input Format</label>
        <select 
          value={inputFormat} 
          onChange={(e) => onInputFormatChange(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          {formats.map(format => (
            <option key={format} value={format}>
              {format.toUpperCase()} {format === 'auto' ? '(Auto Detect)' : ''}
            </option>
          ))}
        </select>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Output Format</label>
        <select 
          value={outputFormat} 
          onChange={(e) => onOutputFormatChange(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          {formats.filter(f => f !== 'auto').map(format => (
            <option key={format} value={format}>{format.toUpperCase()}</option>
          ))}
        </select>
      </div>
    </div>
  )
}
