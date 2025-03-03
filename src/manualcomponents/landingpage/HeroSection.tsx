import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Resizable } from 'react-resizable';
import 'react-resizable/css/styles.css'; // Import the default styles
import 'leaflet/dist/leaflet.css';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const backgroundImages = [
    "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
    "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
    "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
  ];

  const defaultLocation: [number, number] = [4.1535, 9.243536]; // Example: London
  const zoomLevel = 13;

  // State for container size
  const [size, setSize] = useState({ width: 800, height: 400 }); // Larger initial size

  // Handle resize
  const onResize = (event, { size }) => {
    setSize({ width: size.width, height: size.height });
  };

  // Constraints for resizing
  const maxWidth = window.innerWidth * 0.8; // 80% of the device width
  const maxHeight = window.innerHeight * 0.6; // 60% of the device height
  const navigate = useNavigate()

  const contentVariations = [
    {
      headline: "Find Pharmacies Near You in Real-Time!",
      subheading: "Access medication availability, pharmacy hours, reviews, and emergency contacts instantly.",
    },
    {
      headline: "Never Run Out of Medication Again",
      subheading: "Locate 24/7 pharmacies and check stock availability with just a few clicks.",
    },
    {
      headline: "Your Health, Our Priority",
      subheading: "Connect with local pharmacies for prescriptions, consultations, and healthcare advice.",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  // Preload images with error handling
  useEffect(() => {
    const loadImages = async () => {
      try {
        const promises = backgroundImages.map((url) =>
          new Promise((resolve, reject) => {
            const img = new Image();
            img.src = url;
            img.onload = resolve;
            img.onerror = () => reject(new Error(`Failed to load image: ${url}`));
          })
        );
        await Promise.all(promises);
        setLoaded(true);
      } catch (err) {
        console.error('Image loading error:', err);
        setError(true);
      }
    };

    loadImages();
  }, []);

  useEffect(() => {
    if (!loaded || error) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [loaded, error]);

  if (error) {
    return (
      <div className="h-screen flex items-center justify-center bg-red-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error Loading Content</h2>
          <p className="text-gray-600">
            We're having trouble loading the content. Please try refreshing the page.
          </p>
        </div>
      </div>
    );
  }

  if (!loaded) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-pulse">
          <div className="w-32 h-32 bg-gray-200 rounded-full mb-4"></div>
          <div className="h-6 bg-gray-200 rounded w-48 mb-2"></div>
          <div className="h-6 bg-gray-200 rounded w-64"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full overflow-hidden" style={{ height: 'calc(100vh - 120px)' }}>
      {/* Single background image with zoom transitions */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <div key={currentIndex} className="absolute inset-0 w-full h-full animate-zoom-entrance">
          <img
            src={backgroundImages[currentIndex]}
            alt="Background"
            className="w-full h-full object-cover scale-105 animate-continuous-zoom"
            style={{
              filter: 'brightness(0.7) saturate(1.2) contrast(1.2) blur(10px)',
              transition: 'filter 0.5s ease-out, transform 0.5s ease-out',
              willChange: 'filter, transform',
            }}
          />
          <div className="absolute inset-0 bg-black bg-opacity-50" />
        </div>
      </div>

      {/* Animated content */}
      <div className="relative h-full flex flex-col items-center justify-center px-4 md:px-8 text-center z-10">
        <div className="max-w-4xl mx-auto space-y-6 overflow-hidden">
          <div className="overflow-hidden">
            <h1
              key={`head-${currentIndex}`}
              className="text-4xl md:text-6xl font-bold text-white mb-4 animate-text-zoom"
            >
              {contentVariations[currentIndex].headline}
            </h1>
          </div>

          <div className="overflow-hidden">
            <p
              key={`sub-${currentIndex}`}
              className="text-xl md:text-2xl text-gray-100 mb-8 animate-text-zoom delay-100"
            >
              {contentVariations[currentIndex].subheading}
            </p>
          </div>

          <div className="overflow-hidden">
            <Button onClick={()=>navigate('account-type-select')} className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg rounded-lg transition-all duration-300 animate-fade-in hover:scale-105 shadow-xl">
              Get Started 
            </Button>
          </div>
        </div>

        {/* Map Container */}
        <div className="mt-12 w-full max-w-4xl p-4 rounded-lg shadow-xl backdrop-blur-sm"
          style={{ height: '38%',width:'70%' }}
        >
          <Resizable
  
            onResize={onResize}
          >
            <div
              style={{ width: '100', height: '100%' }}
              className="bg-gray-300/50 rounded-md overflow-hidden"
            >
              <MapContainer
                center={defaultLocation}
                zoom={zoomLevel}
                scrollWheelZoom={false}
                style={{ height: '100%', width: '100%' }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={defaultLocation}>
                  <Popup>Default Location</Popup>
                </Marker>
              </MapContainer>
            </div>
          </Resizable>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;