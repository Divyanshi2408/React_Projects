import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Modal from 'react-modal';
import { im1, im7, im2, im3, im4, im5, im6, im, im8 } from '../Assets/images';
import './ImageGallery.css';

const images = ['https://media.craiyon.com/2023-07-11/0082c70c5e9b49c5b9f0d8d98e085bf0.webp', 'https://www.renderhub.com/squir/pikachu-pokemon/pikachu-pokemon-01.jpg', 'https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/90af2477095215.5c7dad740f730.jpg', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSw3BDKosvHIXxfFSIV0BeZVq1UtUP_ru7W4w&s', 'https://www.zbrushcentral.com/uploads/default/original/4X/6/c/0/6c063046bc0973554c96d6bf04ff0521c948dc5e.jpeg', 'https://dl2.myminifactory.com/object-assets/5f7c6ef230f1d/images/720X720-2021-03-13-09h00m01.jpg','https://img.freepik.com/premium-photo/cute-round-blue-cat-character-with-big-eyes-happy-smile_1151-153227.jpg','https://img.freepik.com/premium-photo/adorable-3d-illustration-cute-pink-blue-pokemon-character-with-big-eyes_1151-152797.jpg','https://thangs.com/_next/image?url=https%3A%2F%2Fstorage.googleapis.com%2Fproduction-thangs-public%2Fuploads%2Fattachments%2Ff4985fd7-64bc-4feb-a00f-b53248b0b828%2Funtitled.184.png&w=3840&q=75','https://preview.free3d.com/img/2018/01/2158635337679636417/2lfrktxr.jpg', 'https://mir-s3-cdn-cf.behance.net/projects/404/88c776175433921.Y3JvcCwxMDMxLDgwNiw0NDksMjE0.png', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTF7tRGhUbfDX8zTIThnak91Ocq65n3kqqHB0aOlYlpf_e5q_xYOqLFVco2AKTbkLmcdmA&usqp=CAU',];

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
