import { useEffect, useState } from "react";
import LocomotiveScroll from "locomotive-scroll";
import "./index.css";

function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Initialize Locomotive Scroll
    const scroll = new LocomotiveScroll({
      el: document.querySelector(".scroll-container"),
      smooth: true,
      multiplier: 1.5,
      class: "is-inview",
      getDirection: true,
      smartphone: {
        smooth: true,
      },
      tablet: {
        smooth: true,
      },
    });

    // Handle window resize
    const handleResize = () => {
      scroll.update();
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      scroll.destroy();
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleVideoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('video', file);

      const response = await fetch('http://localhost:5000/analyze_underwater_footage', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Processing failed');
      }

      // Handle successful response
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      
      // Create download link
      const a = document.createElement('a');
      a.href = url;
      a.download = `processed_video_${Date.now()}.avi`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);

    } catch (err) {
      setError(err.message);
      console.error('Upload error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full relative min-h-screen font-['Helvetica_Now_Display'] scroll-container">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-[calc(100vh+200px)] object-cover z-[-1]"
      >
        <source src="/background-video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Navbar */}
      <nav className="w-full p-4 flex justify-between items-center z-50 fixed top-0 left-0 bg-black bg-opacity-20">
        <div className="text-xl font-bold">
          <img
            src="/plastiscan.jpeg"
            alt="PlastiScan Logo"
            className="h-10 w-10"
          />
        </div>
        <div className="flex justify-center items-center w-full">
          <a
            href="#home"
            className="text-3xl font-extrabold hover:text-gray-400 transition"
          >
            PlastiScan
          </a>
        </div>
        <div className="flex space-x-8">
          <a href="#home" className="text-lg text-white hover:text-gray-400">
            Home
          </a>
          <a href="#about" className="text-lg text-white hover:text-gray-400">
            About
          </a>
        </div>
      </nav>

      {/* Home Section */}
      <section
        id="home"
        className="w-full h-screen text-white pt-32"
        data-scroll-section
      >
        <div 
          className="textcontainer w-full px-[20%] flex items-center gap-10" 
          data-scroll
        >
          <div className="text w-full z-10" data-scroll>
            <h3 className="text-4xl leading-[1.5]" data-scroll>
              Ocean Plastic Detection: Harnessing AI to Combat Marine Pollution and
              Restore Ocean Health in Real-Time.
            </h3>
            <p className="text-lg w-[80%] mt-10 font-normal" data-scroll>
              Join the movement to save our oceans. Our innovative, AI-powered
              solution not only identifies plastic waste in ocean environments but
              also optimizes cleanup efforts. Together, we can ensure a cleaner,
              safer marine ecosystem for future generations, protecting
              biodiversity and fostering sustainability.
            </p>
            <p className="text-md mt-10" data-scroll>
              scroll
            </p>
          </div>
        </div>
      </section>

      {/* Brand Section */}
      <section
        className="w-full flex justify-center items-center bg-black bg-cover bg-center"
        style={{
          backgroundImage: "url(/plastiscan-background.webp)",
          height: "120vh",
          marginBottom: 0,
        }}
        data-scroll-section
      >
        <h1 className="text-[18rem] font-normal z-10" data-scroll>
          PlastiScan
        </h1>
      </section>

      {/* Upload Section */}
      <section
        className="w-full flex justify-center items-center bg-cover bg-center"
        style={{
          backgroundImage: "url(/ocean-theme.webp)",
          height: "120vh",
          width: "100%",
          backgroundSize: "cover",
          backgroundPosition: "center",
          marginTop: 0,
        }}
        data-scroll-section
      >
        <div className="bg-white bg-opacity-60 p-8 rounded-xl w-[35%] flex flex-col items-center justify-center">
          <h2 className="text-2xl font-semibold text-black mb-4" data-scroll>
            Upload a Video for Plastic Detection
          </h2>
          <label
            htmlFor="videoUpload"
            className={`px-6 py-3 ${
              loading ? 'bg-gray-500' : 'bg-blue-500 hover:bg-blue-600'
            } text-white rounded-lg cursor-pointer transition mb-4`}
          >
            {loading ? 'Processing...' : 'Choose Video'}
          </label>
          <input
            type="file"
            id="videoUpload"
            accept="video/*"
            className="hidden"
            onChange={handleVideoUpload}
            disabled={loading}
          />
          {error && (
            <p className="text-red-500 mt-2 text-sm">
              Error: {error}
            </p>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer 
        className="w-full text-center py-4 bg-black text-white" 
        data-scroll-section
      >
        <p className="text-sm">&copy; 2024 PlastiScan. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App; 