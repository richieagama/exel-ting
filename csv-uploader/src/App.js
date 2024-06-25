import React, { useState } from 'react';
import './App.css';
import { ReactComponent as ExcelLogo } from './assets/excel-nuwatt.svg'; // Import the SVG as a React component

function App() {
  const [files, setFiles] = useState([]);

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles([...files, ...droppedFiles]);
  };

  const handleFileInputChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles([...files, ...selectedFiles]);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    files.forEach(file => {
      formData.append('files', file);
    });

    try {
      const response = await fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'combined_spreadsheet.xlsx';
        document.body.appendChild(a);
        a.click();
        a.remove();
      } else {
        console.error('File upload failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="App container mx-auto p-8">
      <div
        className="border-dashed border-4 border-gray-300 rounded-lg p-8 mb-4 bg-gray-50 hover:bg-gray-100 transition-colors"
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        <p className="text-center text-gray-500">Drag and drop your CSV files here or click to upload</p>
        <input
          type="file"
          multiple
          onChange={handleFileInputChange}
          className="hidden"
          id="fileInput"
        />
        <label
          htmlFor="fileInput"
          className="cursor-pointer block text-center text-blue-500 mt-4"
        >
          Select Files
        </label>
      </div>
      {files.length > 0 && (
        <ul className="list-disc pl-5 mb-4">
          {files.map((file, index) => (
            <li key={index} className="text-gray-700">{file.name}</li>
          ))}
        </ul>
      )}
      <div className="flex justify-center items-center">
        <button
          className="bg-transparent p-0 border-none focus:outline-none"
          onClick={handleSubmit}
        >
          <ExcelLogo className="h-auto w-96" style={{ maxWidth: '350px', maxHeight: '350px' }} />  {/* Using the SVG as a button */}
        </button>
      </div>
    </div>
  );
}

export default App;
