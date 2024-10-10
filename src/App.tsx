import React, { useState } from 'react';
import { Upload, Image, Zap, Edit3 } from 'lucide-react';
import ImageUploader from './components/ImageUploader';
import MindMap from './components/MindMap';
import ExportOptions from './components/ExportOptions';

function App() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [mindMapData, setMindMapData] = useState<any | null>(null);

  const handleImageUpload = async (imageData: string) => {
    setUploadedImage(imageData);
    
    try {
      const processedData = await processImageWithAI(imageData);
      setMindMapData(processedData);
    } catch (error) {
      console.error('Error processing image:', error);
    }
  };

  const processImageWithAI = async (imageData: string) => {
    // Simulating AI processing with a timeout
    await new Promise(resolve => setTimeout(resolve, 2000));
    return {
      nodes: [
        { id: '1', label: 'Main Idea', x: 300, y: 200 },
        { id: '2', label: 'Subtopic 1', x: 150, y: 300 },
        { id: '3', label: 'Subtopic 2', x: 450, y: 300 },
        { id: '4', label: 'Detail 1', x: 75, y: 400 },
        { id: '5', label: 'Detail 2', x: 225, y: 400 },
      ],
      edges: [
        { source: '1', target: '2' },
        { source: '1', target: '3' },
        { source: '2', target: '4' },
        { source: '2', target: '5' },
      ],
    };
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="bg-gray-900 shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-primary flex items-center">
            <Zap className="w-8 h-8 mr-2 text-secondary" />
            AI Sketch to Mind Map
          </h1>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        {!uploadedImage ? (
          <ImageUploader onImageUpload={handleImageUpload} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl font-semibold mb-4 flex items-center text-primary">
                <Image className="w-6 h-6 mr-2" />
                Uploaded Sketch
              </h2>
              <img
                src={uploadedImage}
                alt="Uploaded sketch"
                className="w-full h-auto rounded-lg shadow-md"
              />
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-4 flex items-center text-primary">
                <Edit3 className="w-6 h-6 mr-2" />
                Generated Mind Map
              </h2>
              {mindMapData ? (
                <>
                  <MindMap data={mindMapData} />
                  <ExportOptions />
                </>
              ) : (
                <div className="flex items-center justify-center h-64 bg-gray-800 rounded-lg">
                  <p className="text-gray-400">Processing your sketch...</p>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      <footer className="bg-gray-900 border-t border-gray-800">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 text-center text-gray-400">
          &copy; 2024 AI Sketch to Mind Map. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default App;