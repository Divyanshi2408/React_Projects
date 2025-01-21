import React, { useState, useEffect, useRef } from 'react';
import Modal from 'react-modal';
import { im1, im12, im2, im3, im4, im5, im6 } from "../Assets/images";
import './ImageGallery.css';

const images = [
  im1, im12, im2, im3, im4, im5, im6
];


const ImageGallery = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const boxRef = useRef(null);

  const openModal = (image) => {
    setSelectedImage(image);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedImage(null);
  };

  const handleMouseMove = (e) => {
    const box = boxRef.current;
    const rect = box.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotateX = (y / rect.height) * 30;
    const rotateY = -(x / rect.width) * 30;

    box.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const handleTouchMove = (e) => {
    const touch = e.touches[0];
    handleMouseMove({ clientX: touch.clientX, clientY: touch.clientY });
  };

  useEffect(() => {
    const box = boxRef.current;
    box.addEventListener('mousemove', handleMouseMove);
    box.addEventListener('touchmove', handleTouchMove);

    return () => {
      box.removeEventListener('mousemove', handleMouseMove);
      box.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  return (
    <div className="room-container">
      {/* 3D Box with interactive movement */}
      <div className="box-container">
        <div ref={boxRef} className="box">
          {images.map((image, index) => (
            <div
              key={index}
              className={`box-face ${['front', 'back', 'left', 'right', 'top', 'bottom'][index]}`}
              onClick={() => openModal(image)}
            >
              <img src={image} alt={`Box ${index}`} />
            </div>
          ))}
        </div>
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
          <div className="modal-content">
            <img src={selectedImage} alt="Full-size" className="full-image" />
          </div>
        )}
        <button onClick={closeModal} className="close-button">
          Close
        </button>
      </Modal>
    </div>
  );
};

export default ImageGallery;