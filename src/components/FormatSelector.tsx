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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 mb-8">
      <div className="space-y-3">
        <label className="block text-sm font-semibold text-gray-700 uppercase tracking-wide">
          Input Format
        </label>
        <div className="relative">
          <select 
            value={inputFormat} 
            onChange={(e) => onInputFormatChange(e.target.value)}
            className="w-full p-4 bg-white border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 appearance-none cursor-pointer text-gray-700 font-medium"
          >
            {formats.map(format => (
              <option key={format} value={format}>
                {format.toUpperCase()} {format === 'auto' ? '(Auto Detect)' : ''}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>
      
      <div className="space-y-3">
        <label className="block text-sm font-semibold text-gray-700 uppercase tracking-wide">
          Output Format
        </label>
        <div className="relative">
          <select 
            value={outputFormat} 
            onChange={(e) => onOutputFormatChange(e.target.value)}
            className="w-full p-4 bg-white border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-100 focus:border-purple-500 transition-all duration-200 appearance-none cursor-pointer text-gray-700 font-medium"
          >
            {formats.filter(f => f !== 'auto').map(format => (
              <option key={format} value={format}>{format.toUpperCase()}</option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}
