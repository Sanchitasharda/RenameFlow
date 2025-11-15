import { useEffect } from 'react';
import { Layout } from './components/ui';
import { FileUploadZone, FileList } from './components/upload';
import { useUIStore } from './store';
import { useFileUpload } from './hooks/useFileUpload';

function App() {
  const { darkMode, setDarkMode, error, success, clearMessages } = useUIStore();
  const { files, totalSize, handleInputChange, handleDrop, handleClearAll } = useFileUpload();

  // Initialize dark mode on mount
  useEffect(() => {
    // Check for saved preference or system preference
    const savedDarkMode = localStorage.getItem('renameflow-dark-mode');
    if (savedDarkMode !== null) {
      setDarkMode(savedDarkMode === 'true');
    } else {
      // No saved preference, use system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setDarkMode(prefersDark);
    }
  }, [setDarkMode]);

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header Section */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            RenameFlow
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Batch rename your files quickly and accurately with powerful rule-based automation.
          </p>
        </div>

        {/* Error/Success Messages */}
        {error && (
          <div
            className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4"
            role="alert"
          >
            <div className="flex items-start">
              <svg
                className="h-5 w-5 text-red-400 mt-0.5"
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-red-800 dark:text-red-200">
                  {error}
                </p>
              </div>
              <button
                onClick={clearMessages}
                className="ml-3 text-red-400 hover:text-red-600 dark:hover:text-red-300"
                aria-label="Dismiss error"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
        )}

        {success && (
          <div
            className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4"
            role="alert"
          >
            <div className="flex items-start">
              <svg
                className="h-5 w-5 text-green-400 mt-0.5"
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-green-800 dark:text-green-200">
                  {success}
                </p>
              </div>
              <button
                onClick={clearMessages}
                className="ml-3 text-green-400 hover:text-green-600 dark:hover:text-green-300"
                aria-label="Dismiss success message"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* Upload Zone */}
        <FileUploadZone onDrop={handleDrop} onInputChange={handleInputChange} />

        {/* File List */}
        <FileList files={files} totalSize={totalSize} onClearAll={handleClearAll} />

        {/* Features Info (shown when no files) */}
        {files.length === 0 && (
          <div className="mt-12">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 text-center">
              How it works
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <FeatureCard
                icon="📁"
                title="Upload Files"
                description="Drag & drop up to 500 files or 100MB total"
              />
              <FeatureCard
                icon="⚙️"
                title="Apply Rules"
                description="Use casing, prefix, suffix, numbering, and find & replace"
              />
              <FeatureCard
                icon="👁️"
                title="Preview Changes"
                description="See before & after filenames in real-time"
              />
              <FeatureCard
                icon="📦"
                title="Download ZIP"
                description="Get your renamed files in a single ZIP archive"
              />
            </div>
          </div>
        )}

        {/* Status Info */}
        <div className="text-center text-sm text-gray-500 dark:text-gray-400 pt-8">
          <p>✅ Phase 3 Complete - File Upload System Ready</p>
        </div>
      </div>
    </Layout>
  );
}

// Feature Card Component
interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-200 dark:border-gray-700">
      <div className="text-4xl mb-3">{icon}</div>
      <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
        {title}
      </h4>
      <p className="text-sm text-gray-600 dark:text-gray-400">
        {description}
      </p>
    </div>
  );
}

export default App;
