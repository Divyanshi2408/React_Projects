// src/components/ImageGallery.js
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './ImageGallery.css';
import { im1, im12, im2, im3, im4, im5, im6 } from "../Assets/images"; // Ensure correct paths

// Use image paths in the array
const images = [im1, im2, im12, im3, im4, im5, im6];

const ImageGallery = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="gallery-container">
      <AnimatePresence>
        <motion.div
          key={currentIndex}
          className="gallery-item"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
        >
          <motion.img
            src={images[currentIndex]}
            alt={`Gallery image ${currentIndex + 1}`}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>
      </AnimatePresence>
      <div className="controls">
        <button onClick={handlePrev}>Previous</button>
        <button onClick={handleNext}>Next</button>
      </div>
    </div>
  );
};

export default ImageGallery;
