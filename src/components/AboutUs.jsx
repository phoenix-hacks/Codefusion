import React from 'react';

function AboutUs() {
    return (
        <section className="about-us">
            <h6 className="section-subtitle">ABOUT US</h6>
            <h2 className="section-title">Welcome To PlastiScan</h2>
            
            <p className="section-description">
                Our project aims to create an innovative and impactful solution for detecting ocean plastic pollution. The integration of AI and machine learning allows for accurate real-time detection, while ensuring the protection of marine life by classifying harmful plastic waste and non-harmful entities.
            </p>

            <div className="certification-badges">
                {/* Add your project's relevant badges/icons */}
            </div>

            <div className="cta-buttons">
                <a href="#contact" className="primary-button">Get In Touch</a>
                <a href="#about" className="secondary-button">
                    Learn More <span className="arrow">→</span>
                </a>
            </div>
        </section>
    );
}

export default AboutUs; 