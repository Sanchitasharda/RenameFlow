import { useRef, useState } from 'react';
import { useUIStore } from '../../store';
import { FILE_UPLOAD_LIMITS } from '../../types';
import { formatFileSize } from '../../utils/fileHelpers';

interface FileUploadZoneProps {
  onDrop: (event: React.DragEvent<HTMLDivElement>) => void;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function FileUploadZone({ onDrop, onInputChange }: FileUploadZoneProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const { isUploading } = useUIStore();

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragOver(false);
  };

  const handleDropWrapper = (event: React.DragEvent<HTMLDivElement>) => {
    setIsDragOver(false);
    onDrop(event);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleClick();
    }
  };

  return (
    <div
      className={`
        relative border-2 border-dashed rounded-lg p-12 text-center cursor-pointer
        transition-all duration-200 ease-in-out
        ${
          isDragOver
            ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/10 scale-[1.02]'
            : 'border-gray-300 dark:border-gray-600 hover:border-primary-400 dark:hover:border-primary-500'
        }
        ${isUploading ? 'opacity-50 pointer-events-none' : ''}
      `}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDropWrapper}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label="Upload files by clicking or dragging and dropping"
    >
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        onChange={onInputChange}
        className="hidden"
        aria-hidden="true"
        disabled={isUploading}
      />

      {/* Upload icon and text */}
      <div className="space-y-4">
        {/* Upload Icon */}
        <div className="flex justify-center">
          <svg
            className={`w-16 h-16 transition-colors ${
              isDragOver
                ? 'text-primary-500'
                : 'text-gray-400 dark:text-gray-500'
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>
        </div>

        {/* Main text */}
        <div>
          <p className="text-lg font-medium text-gray-700 dark:text-gray-200">
            {isDragOver ? 'Drop files here' : 'Drag & drop files here'}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            or click to browse
          </p>
        </div>

        {/* Upload limits */}
        <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
          <p>Maximum {FILE_UPLOAD_LIMITS.MAX_FILES} files</p>
          <p>Total size limit: {formatFileSize(FILE_UPLOAD_LIMITS.MAX_TOTAL_SIZE)}</p>
          <p>Max file size: {formatFileSize(FILE_UPLOAD_LIMITS.MAX_FILE_SIZE)}</p>
        </div>
      </div>

      {/* Loading overlay */}
      {isUploading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/50 dark:bg-gray-900/50 rounded-lg">
          <div className="flex items-center space-x-2">
            <div className="w-5 h-5 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
              Uploading...
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
