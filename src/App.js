import React, { useState } from "react";

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [detections, setDetections] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    const validTypes = ['video/mp4', 'video/avi', 'video/quicktime', 'video/x-matroska'];
    if (file && !validTypes.includes(file.type)) {
      setError("Please select a valid video file (mp4, avi, mov, or mkv)");
      return;
    }
    setSelectedFile(file);
    setError(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedFile) {
      setError("Please select a video file first");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("video", selectedFile);

    try {
      const response = await fetch("http://localhost:5000/analyze_underwater_footage", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Video processing failed");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'processed_video.avi');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Object Detection</h1>
      
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="file"
          accept="video/mp4,video/avi,video/quicktime,video/x-matroska"
          onChange={handleFileSelect}
          className="mb-2"
        />
        <button 
          type="submit" 
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {loading ? "Processing..." : "Process Video"}
        </button>
      </form>

      {error && (
        <div className="text-red-500 mb-4">
          Error: {error}
        </div>
      )}

      {loading && (
        <div className="text-blue-500">
          Processing video... This may take a few minutes.
        </div>
      )}
    </div>
  );
}

export default App;
