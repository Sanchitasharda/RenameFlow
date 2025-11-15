import type { UploadedFile } from '../../types';
import { formatFileSize } from '../../utils/fileHelpers';
import { FileListItem } from './FileListItem';

interface FileListProps {
  files: UploadedFile[];
  totalSize: number;
  onClearAll: () => void;
}

export function FileList({ files, totalSize, onClearAll }: FileListProps) {
  if (files.length === 0) {
    return (
      <div className="text-center py-12">
        <svg
          className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-gray-100">
          No files uploaded
        </h3>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Upload files to get started with batch renaming
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header with file count and clear button */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
            Uploaded Files
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {files.length} file{files.length !== 1 ? 's' : ''} • {formatFileSize(totalSize)}
          </p>
        </div>

        <button
          onClick={onClearAll}
          className="
            px-4 py-2 text-sm font-medium rounded-md
            text-red-700 bg-red-50 hover:bg-red-100
            dark:text-red-400 dark:bg-red-900/20 dark:hover:bg-red-900/30
            transition-colors duration-150
            focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2
            dark:focus:ring-offset-gray-800
          "
          aria-label="Clear all files"
          type="button"
        >
          Clear All
        </button>
      </div>

      {/* File list */}
      <div
        className="space-y-2 max-h-96 overflow-y-auto pr-2"
        role="list"
        aria-label="List of uploaded files"
      >
        {files.map((file) => (
          <FileListItem key={file.id} file={file} />
        ))}
      </div>

      {/* Conflict warning */}
      {files.some(f => f.hasConflict) && (
        <div
          className="
            p-4 rounded-lg border border-yellow-300 dark:border-yellow-700
            bg-yellow-50 dark:bg-yellow-900/10
          "
          role="alert"
        >
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-yellow-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-300">
                Duplicate filenames detected
              </h3>
              <p className="mt-1 text-sm text-yellow-700 dark:text-yellow-400">
                Some files have the same name. They will be automatically renamed with counters (e.g., file_1.txt, file_2.txt) when downloading.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
