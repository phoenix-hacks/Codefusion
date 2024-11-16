import { useEffect, useState } from "react";
import LocomotiveScroll from "locomotive-scroll";
import AboutUs from './components/AboutUs';
import "./index.css";

function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const scroll = new LocomotiveScroll({
      el: document.querySelector(".scroll-container"),
      smooth: true,
      multiplier: 1.5,
      class: "is-inview",
    });

    window.addEventListener("resize", () => scroll.update());
    return () => {
      scroll.destroy();
      window.removeEventListener("resize", () => scroll.update());
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

      if (!response.ok) throw new Error('Processing failed');

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
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
      <video autoPlay loop muted playsInline className="absolute top-0 left-0 w-full h-[calc(100vh+200px)] object-cover z-[-1]">
        <source src="/background-video.mp4" type="video/mp4" />
      </video>

      <nav className="w-full px-8 py-4 flex justify-between items-center z-50 fixed top-0 left-0 bg-black/60 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <img src="/plastiscan.jpeg" alt="PlastiScan Logo" className="h-12 w-12 rounded-full" />
          <span className="text-2xl font-bold text-white">PlastiScan</span>
        </div>
        <div className="flex items-center space-x-8">
          <a href="#home" className="text-white hover:text-[#9EFF00] transition duration-300">Home</a>
          <a href="#about" className="text-white hover:text-[#9EFF00] transition duration-300">About Us</a>
          <a href="#technology" className="text-white hover:text-[#9EFF00] transition duration-300">Technology</a>
          <a href="#contact" className="text-white hover:text-[#9EFF00] transition duration-300">Contact</a>
          <button className="bg-[#9EFF00] text-black px-6 py-2 rounded-full font-medium hover:bg-[#8EE500] transition duration-300">
            Get Started
          </button>
        </div>
      </nav>

      <section id="home" className="w-full h-screen text-white pt-32" data-scroll-section>
        <div className="textcontainer w-full px-[20%] flex items-center gap-10" data-scroll>
          <div className="text w-full z-10" data-scroll>
            <h3 className="text-4xl leading-[1.5]">
              Ocean Plastic Detection: Harnessing AI to Combat Marine Pollution and
              Restore Ocean Health in Real-Time.
            </h3>
            <p className="text-lg w-[80%] mt-10 font-normal">
              Join the movement to save our oceans. Our innovative, AI-powered
              solution not only identifies plastic waste in ocean environments but
              also optimizes cleanup efforts.
            </p>
            <p className="text-md mt-10">scroll</p>
          </div>
        </div>
      </section>

      <section className="w-full flex justify-center items-center bg-black bg-cover bg-center" 
        style={{
          backgroundImage: "url(/plastiscan-background.webp)",
          height: "120vh",
        }} 
        data-scroll-section>
        <h1 className="text-[18rem] font-normal z-10">PlastiScan</h1>
      </section>

      <section className="w-full flex justify-center items-center bg-cover bg-center"
        style={{
          backgroundImage: "url(/ocean-theme.webp)",
          height: "120vh",
        }}
        data-scroll-section>
        <div className="bg-white bg-opacity-60 p-8 rounded-xl w-[35%] flex flex-col items-center justify-center">
          <h2 className="text-2xl font-semibold text-black mb-4">Upload a Video for Plastic Detection</h2>
          <label htmlFor="videoUpload" className={`px-6 py-3 ${loading ? 'bg-gray-500' : 'bg-blue-500 hover:bg-blue-600'} text-white rounded-lg cursor-pointer transition mb-4`}>
            {loading ? 'Processing...' : 'Choose Video'}
          </label>
          <input type="file" id="videoUpload" accept="video/*" className="hidden" onChange={handleVideoUpload} disabled={loading} />
          {error && <p className="text-red-500 mt-2 text-sm">Error: {error}</p>}
        </div>
      </section>

      <div id="about">
        <AboutUs />
      </div>

      <footer className="w-full text-center py-4 bg-black text-white" data-scroll-section>
        <p className="text-sm">&copy; 2024 PlastiScan. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App; 