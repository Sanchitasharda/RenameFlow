import type { UploadedFile } from '../../types';
import { useFileStore } from '../../store';
import { formatFileSize, getFileTypeIcon } from '../../utils/fileHelpers';

interface FileListItemProps {
  file: UploadedFile;
}

export function FileListItem({ file }: FileListItemProps) {
  const { removeFile } = useFileStore();

  const handleRemove = () => {
    removeFile(file.id);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleRemove();
    }
  };

  return (
    <div
      className={`
        flex items-center justify-between p-4 rounded-lg border
        transition-colors duration-150
        ${
          file.hasConflict
            ? 'bg-yellow-50 dark:bg-yellow-900/10 border-yellow-300 dark:border-yellow-700'
            : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'
        }
        hover:shadow-sm
      `}
    >
      {/* File info */}
      <div className="flex items-center space-x-3 flex-1 min-w-0">
        {/* File icon */}
        <div className="flex-shrink-0 text-2xl" aria-hidden="true">
          {getFileTypeIcon(file.type, file.originalName)}
        </div>

        {/* File details */}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
            {file.originalName}
          </p>
          <div className="flex items-center space-x-2 mt-1">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {formatFileSize(file.size)}
            </p>
            {file.hasConflict && (
              <>
                <span className="text-xs text-gray-400 dark:text-gray-500">•</span>
                <p className="text-xs text-yellow-600 dark:text-yellow-500 font-medium">
                  Duplicate name
                </p>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Remove button */}
      <button
        onClick={handleRemove}
        onKeyDown={handleKeyDown}
        className="
          flex-shrink-0 ml-4 p-2 rounded-md
          text-gray-400 hover:text-red-500 hover:bg-red-50
          dark:hover:text-red-400 dark:hover:bg-red-900/20
          transition-colors duration-150
          focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2
          dark:focus:ring-offset-gray-800
        "
        aria-label={`Remove ${file.originalName}`}
        type="button"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
}
