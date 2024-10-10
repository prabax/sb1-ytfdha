import React from 'react';
import { Download } from 'lucide-react';

const ExportOptions: React.FC = () => {
  const handleExport = (format: string) => {
    console.log(`Exporting as ${format}`);
  };

  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold mb-2 flex items-center text-primary">
        <Download className="w-5 h-5 mr-2" />
        Export Options
      </h3>
      <div className="flex space-x-2">
        <button
          onClick={() => handleExport('PNG')}
          className="px-4 py-2 bg-primary text-white rounded hover:bg-blue-600 transition-colors"
        >
          PNG
        </button>
        <button
          onClick={() => handleExport('SVG')}
          className="px-4 py-2 bg-secondary text-white rounded hover:bg-purple-600 transition-colors"
        >
          SVG
        </button>
        <button
          onClick={() => handleExport('JSON')}
          className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
        >
          JSON
        </button>
      </div>
    </div>
  );
};

export default ExportOptions;