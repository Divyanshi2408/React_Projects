import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Modal from 'react-modal';
import { im1, im7, im2, im3, im4, im5, im6, im, im8 } from '../Assets/images';
import './ImageGallery.css';

const images = [im1, im5, im2, im6, im, im7, im3, im4, im8];

const ImageGallery = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [blurBackground, setBlurBackground] = useState(false);
  const boxRefs = useRef([]);

  const openModal = (image) => {
    setSelectedImage(image);
    setModalIsOpen(true);
    setBlurBackground(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedImage(null);
    setBlurBackground(false);
  };

  const handleMouseMove = (e, index) => {
    const box = boxRefs.current[index];
    const rect = box.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotateX = (y / rect.height) * 30;
    const rotateY = -(x / rect.width) * 30;

    box.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const handleTouchMove = (e, index) => {
    const touch = e.touches[0];
    handleMouseMove({ clientX: touch.clientX, clientY: touch.clientY }, index);
  };

  useEffect(() => {
    boxRefs.current.forEach((box, index) => {
      box.addEventListener('mousemove', (e) => handleMouseMove(e, index));
      box.addEventListener('touchmove', (e) => handleTouchMove(e, index));
    });

    return () => {
      boxRefs.current.forEach((box, index) => {
        box.removeEventListener('mousemove', (e) => handleMouseMove(e, index));
        box.removeEventListener('touchmove', (e) => handleTouchMove(e, index));
      });
    };
  }, []);

  const sparkleVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: (custom) => ({
      opacity: [1, 0.8, 0.6, 0],
      scale: [0.5, 0.7, 1, 0],
      x: [0, Math.random() * 20 - 10, Math.random() * 40 - 20],
      y: [0, -Math.random() * 50 - 20, -Math.random() * 100 - 50],
      transition: {
        duration: Math.random() * 2 + 1,
        delay: custom * 0.1,
        repeat: Infinity,
        repeatType: 'loop',
      },
    }),
  };

  return (
    <div className="container">
    <h1 className="heading">IMAGE GALLERY</h1>
    <div className={`room-container ${blurBackground ? 'blurred' : ''}`}>
    
      <div className="room">
        {images.map((image, boxIndex) => (
          <div
            key={boxIndex}
            ref={(el) => (boxRefs.current[boxIndex] = el)}
            className="box"
          >
            <div className="sparkle-layer">
              {[...Array(50)].map((_, i) => (
                <motion.span
                  key={i}
                  className="sparkle"
                  custom={Math.random()}
                  initial="hidden"
                  animate="visible"
                  variants={sparkleVariants}
                  style={{
                    top: `${Math.random() * 100}px`,
                    left: `${Math.random() * 100}%`,
                  }}
                ></motion.span>
              ))}
            </div>
            {['front', 'back', 'left', 'right', 'top', 'bottom'].map((face, index) => (
              <div
                key={index}
                className={`box-face ${face}`}
                onClick={() => openModal(image)}
              >
                <img src={image} alt={`Box ${boxIndex} ${face}`} />
              </div>
            ))}
          </div>
        ))}
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Image Modal"
        className="modal"
        overlayClassName="overlay"
      >
        {selectedImage && (
          <div className="modal-content" onClick={closeModal}>
            <img src={selectedImage} alt="Full-size" className="full-image" />
          </div>
        )}
      </Modal>
    </div>
    </div>
  );
};

export default ImageGallery;
