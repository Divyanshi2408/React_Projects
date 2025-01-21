// import React, { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import './ImageGallery.css';
// import { im1, im12, im2, im3, im4, im5, im6 } from "../Assets/images";

// const images = [
//   im1, im12, im2, im3, im4, im5, im6
// ];


// const ImageGallery = () => {
//   const [selectedImage, setSelectedImage] = useState(null);

//   const handleImageClick = (image) => {
//     setSelectedImage(image);
//   };

//   const closeImage = () => {
//     setSelectedImage(null);
//   };

//   return (
//     <div className="room-container">
//       <div className="wall front-wall">
//         {images.slice(0, 2).map((image, index) => (
//           <motion.div
//             key={index}
//             className="gallery-item"
//             onClick={() => handleImageClick(image)}
//             whileHover={{ scale: 1.05 }}
//           >
//             <img src={image} alt={`Gallery ${index}`} />
//           </motion.div>
//         ))}
//       </div>
//       <div className="wall back-wall">
//         {images.slice(2, 4).map((image, index) => (
//           <motion.div
//             key={index}
//             className="gallery-item"
//             onClick={() => handleImageClick(image)}
//             whileHover={{ scale: 1.05 }}
//           >
//             <img src={image} alt={`Gallery ${index}`} />
//           </motion.div>
//         ))}
//       </div>
//       <div className="wall left-wall">
//         {images.slice(4, 5).map((image, index) => (
//           <motion.div
//             key={index}
//             className="gallery-item"
//             onClick={() => handleImageClick(image)}
//             whileHover={{ scale: 1.05 }}
//           >
//             <img src={image} alt={`Gallery ${index}`} />
//           </motion.div>
//         ))}
//       </div>
//       <div className="wall right-wall">
//         {images.slice(5).map((image, index) => (
//           <motion.div
//             key={index}
//             className="gallery-item"
//             onClick={() => handleImageClick(image)}
//             whileHover={{ scale: 1.05 }}
//           >
//             <img src={image} alt={`Gallery ${index}`} />
//           </motion.div>
//         ))}
//       </div>

//       {/* Adding 3D boxes */}
//       <div className="box-container">
//         <div className="box">
//           <div className="box-face front">
//             <img src={im5} alt="Box Front" />
//           </div>
//           <div className="box-face back">
//             <img src={im2} alt="Box Back" />
//           </div>
//           <div className="box-face left">
//             <img src={im4}alt="Box Left" />
//           </div>
//           <div className="box-face right">
//             <img src={im3}alt="Box Right" />
//           </div>
//           <div className="box-face top">
//             <img src={im1}alt="Box Top" />
//           </div>
//           <div className="box-face bottom">
//             <img src={im6} alt="Box Bottom" />
//           </div>
//         </div>
//       </div>

//       <AnimatePresence>
//         {selectedImage && (
//           <motion.div
//             className="fullscreen-overlay"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             onClick={closeImage}
//           >
//             <motion.img
//               src={selectedImage}
//               alt="Fullscreen"
//               className="fullscreen-image"
//               initial={{ scale: 0.8 }}
//               animate={{ scale: 1 }}
//               exit={{ scale: 0.8 }}
//               transition={{ duration: 0.3 }}
//             />
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };


// export default ImageGallery;

import React, { useState, useEffect, useRef } from 'react';
import { im1, im12, im2, im3, im4, im5, im6 } from "../Assets/images";
import './ImageGallery.css';

const images = [
  im1, im12, im2, im3, im4, im5, im6
];

const ImageGallery = () => {
  const boxRef = useRef(null);

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
      <div className="wall front-wall">
        {images.slice(0, 2).map((image, index) => (
          <div key={index} className="gallery-item">
            <img src={image} alt={`Gallery ${index}`} />
          </div>
        ))}
      </div>
      <div className="wall back-wall">
        {images.slice(2, 4).map((image, index) => (
          <div key={index} className="gallery-item">
            <img src={image} alt={`Gallery ${index}`} />
          </div>
        ))}
      </div>
      <div className="wall left-wall">
        {images.slice(4, 5).map((image, index) => (
          <div key={index} className="gallery-item">
            <img src={image} alt={`Gallery ${index}`} />
          </div>
        ))}
      </div>
      <div className="wall right-wall">
        {images.slice(5).map((image, index) => (
          <div key={index} className="gallery-item">
            <img src={image} alt={`Gallery ${index}`} />
          </div>
        ))}
      </div>

      {/* 3D Box with interactive movement */}
      <div className="box-container">
        <div ref={boxRef} className="box">
          <div className="box-face front">
            <img src={im6} alt="Box Front" />
          </div>
          <div className="box-face back">
            <img src={im6} alt="Box Back" />
          </div>
          <div className="box-face left">
            <img src={im6} alt="Box Left" />
          </div>
          <div className="box-face right">
            <img src={im6} alt="Box Right" />
          </div>
          <div className="box-face top">
            <img src={im6} alt="Box Top" />
          </div>
          <div className="box-face bottom">
            <img src={im6} alt="Box Bottom" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageGallery;
