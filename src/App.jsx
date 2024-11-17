import { useEffect, useState } from "react";
import LocomotiveScroll from "locomotive-scroll";
import AboutUs from './components/AboutUs';
import "./index.css";
import { motion } from "framer-motion";

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

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="w-full relative min-h-screen font-['Helvetica_Now_Display'] scroll-container">
      <video autoPlay loop muted playsInline className="absolute top-0 left-0 w-full h-[calc(100vh+200px)] object-cover z-[-1]">
        <source src="/background-video.mp4" type="video/mp4" />
      </video>

      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full px-8 py-4 flex justify-between items-center z-50 fixed top-0 left-0 bg-black/60 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <img src="/turtle.png" alt="PlastiScan Logo" className="h-12 w-12 rounded-full" />
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
      </motion.nav>

      <section id="home" className="w-full h-screen text-white pt-32" data-scroll-section>
        <motion.div 
          variants={staggerChildren}
          initial="initial"
          animate="animate"
          className="textcontainer w-full px-[15%] flex flex-col items-start gap-10" 
          data-scroll>
          <motion.h1 
            variants={fadeIn}
            className="text-6xl font-bold leading-tight">
            PlastiScan: <br/>
            <span className="text-[#9EFF00]">An Ocean Plastic Detection AI Model</span>
          </motion.h1>

          <motion.p 
            variants={fadeIn}
            className="text-xl w-[80%] mt-4 font-light leading-relaxed">
            The project focuses on using AI-based object detection to combat ocean
            plastic pollution. The system identifies and locates plastic waste in images, videos, or live webcam
            feeds. This solution automates the detection process, enabling efficient and real-time monitoring of
            marine pollution.
          </motion.p>

          <motion.div
            variants={fadeIn}
            className="mt-8">
            <h2 className="text-2xl font-semibold text-[#9EFF00] mb-4">PROBLEM ADDRESSED:</h2>
            <ul className="list-disc list-inside space-y-4 text-lg font-light">
              <li>Millions of tons of plastic enter marine ecosystems annually, threatening marine life, ecosystems,
                and human health.</li>
              <li>Existing detection methods are manual, time-intensive, and not scalable for large-scale ocean
                monitoring</li>
            </ul>
          </motion.div>

          <motion.div 
            variants={fadeIn}
            className="mt-12 flex gap-6">
            <button className="bg-[#9EFF00] text-black px-8 py-3 rounded-full font-medium hover:bg-[#8EE500] transition duration-300">
              Try Demo
            </button>
            <button className="border-2 border-[#9EFF00] text-[#9EFF00] px-8 py-3 rounded-full font-medium hover:bg-[#9EFF00] hover:text-black transition duration-300">
              Learn More
            </button>
          </motion.div>
        </motion.div>
      </section>

      <section className="w-full min-h-screen bg-[#001834] text-white py-20 px-16" data-scroll-section>
        {/* Top Features */}
        <div className="flex justify-between mb-20">
          {/* Left Feature */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-[30%] text-center">
            <div className="text-[#9EFF00] text-4xl mb-6">
              <i className="fas fa-robot"></i>
            </div>
            <h3 className="text-2xl font-bold mb-6">Real-time AI Detection</h3>
            <p className="text-gray-300 mb-4">
              Unlike existing systems that rely on manual spotting or passive collection, our system actively identifies plastic in real-time
            </p>
            <p className="text-gray-300 mb-4">
              Uses advanced YOLO v8 architecture for higher accuracy
            </p>
            <p className="text-gray-300">
              Can detect multiple types of plastic debris simultaneously
            </p>
          </motion.div>

          {/* Right Feature */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-[30%] text-center">
            <div className="text-[#9EFF00] text-4xl mb-6">
              <i className="fas fa-water"></i>
            </div>
            <h3 className="text-2xl font-bold mb-6">Underwater Capability</h3>
            <p className="text-gray-300 mb-4">
              Most existing solutions focus on surface-level detection
            </p>
            <p className="text-gray-300 mb-4">
              Our system specifically designed for underwater environments
            </p>
            <p className="text-gray-300">
              Can operate at various depths where most debris accumulates
            </p>
          </motion.div>
        </div>

        {/* Center Image */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="w-full flex justify-center my-20">
          <img 
            src="/output_image.jpg"
            alt="Underwater Plastic Detection" 
            className="w-[80%] rounded-2xl shadow-2xl"
          />
        </motion.div>

        {/* Bottom Features */}
        <div className="flex justify-between mt-20">
          {/* Left Feature */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-[30%] text-center">
            <div className="text-[#9EFF00] text-4xl mb-6">
              <i className="fas fa-chart-line"></i>
            </div>
            <h3 className="text-2xl font-bold mb-6">Cost-Effective Scalability</h3>
            <p className="text-gray-300 mb-4">
              Can be integrated with existing underwater cameras/ROVs
            </p>
            <p className="text-gray-300 mb-4">
              Doesn't require specialized hardware
            </p>
            <p className="text-gray-300">
              Cloud-based processing enables wide deployment
            </p>
          </motion.div>

          {/* Right Feature */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-[30%] text-center">
            <div className="text-[#9EFF00] text-4xl mb-6">
              <i className="fas fa-clock"></i>
            </div>
            <h3 className="text-2xl font-bold mb-6">Automated Monitoring</h3>
            <p className="text-gray-300 mb-4">
              Reduces need for manual observation
            </p>
            <p className="text-gray-300 mb-4">
              24/7 monitoring capability
            </p>
            <p className="text-gray-300">
              Consistent performance regardless of conditions
            </p>
          </motion.div>
        </div>
      </section>

      <section 
        className="w-full min-h-screen bg-[#000B1F] text-white py-20 flex flex-col items-center justify-center relative overflow-hidden"
        data-scroll-section
      >
        {/* Left Video - adjusted left position and increased width */}
        <div className="absolute left-[15%] top-1/2 -translate-y-1/2 w-[30%] h-[70vh] overflow-hidden">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="w-full h-full object-cover opacity-60"
          >
            <source src="/trashdetect.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Right Video - adjusted right position and increased width */}
        <div className="absolute right-[15%] top-1/2 -translate-y-1/2 w-[30%] h-[70vh] overflow-hidden">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="w-full h-full object-cover opacity-60"
          >
            <source src="/fishdetect.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Main Content */}
        <div className="z-10 flex flex-col items-center">
          {/* Icon and Title */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <div className="text-[#9EFF00] text-4xl mb-4">
              <i className="fas fa-vial"></i>
            </div>
            <h2 className="text-4xl font-bold mb-4">Testing Footage</h2>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center text-gray-300 max-w-2xl mb-24 px-4"
          >
            The AI model is built on YOLOv8 for plastic detection and marine life detection 
            which helps ROV to clean ocean more easily.
          </motion.p>

          {/* Upload Section */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white/10 backdrop-blur-sm p-8 rounded-xl w-[35%] flex flex-col items-center justify-center"
          >
            <label 
              htmlFor="videoUpload" 
              className={`
                px-8 py-4 
                ${loading ? 'bg-gray-500' : 'bg-[#9EFF00] hover:bg-[#8EE500]'} 
                text-black rounded-full 
                font-medium cursor-pointer 
                transition duration-300
                flex items-center gap-2
              `}
            >
              {loading ? (
                <>
                  <span className="animate-spin">⟳</span>
                  Processing...
                </>
              ) : (
                <>
                  <i className="fas fa-upload"></i>
                  Upload Video
                </>
              )}
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
              <p className="text-red-500 mt-4 text-sm">
                Error: {error}
              </p>
            )}
          </motion.div>
        </div>

        {/* Gradient overlay adjusted for closer videos */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#000B1F] via-transparent to-[#000B1F] pointer-events-none"></div>
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
