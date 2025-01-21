import React, { useState, useEffect, useRef } from 'react';
import Modal from 'react-modal';
import { im1, im7, im2, im3, im4, im5, im6, im, im8 } from '../Assets/images';
import './ImageGallery.css';

// Array of images for each box
const images = [im1, im7, im2, im3, im4, im5, im6, im, im8];

const ImageGallery = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [blurBackground, setBlurBackground] = useState(false); // Added for background blur effect
  const boxRefs = useRef([]);

  const openModal = (image) => {
    setSelectedImage(image);
    setModalIsOpen(true);
    setBlurBackground(true); // Apply blur when modal is open
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedImage(null);
    setBlurBackground(false); // Remove blur when modal is closed
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

  return (
    <div className={`room-container ${blurBackground ? 'blurred' : ''}`}>
      {/* Create multiple 3D Boxes */}
      <div className="room">
        {images.map((image, boxIndex) => (
          <div
            key={boxIndex}
            ref={(el) => (boxRefs.current[boxIndex] = el)}
            className="box"
          >
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

      {/* Modal for full image view */}
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
  );
};

export default ImageGallery;
