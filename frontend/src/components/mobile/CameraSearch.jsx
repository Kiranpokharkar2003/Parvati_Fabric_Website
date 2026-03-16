import React, { useState, useRef } from 'react';
import { FaCamera, FaUpload, FaTimes } from 'react-icons/fa';
import './CameraSearch.css';

const CameraSearch = ({ onImageSearch }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      processImage(file);
    }
  };

  const processImage = async (file) => {
    setIsProcessing(true);
    const imageUrl = URL.createObjectURL(file);
    setSelectedImage(imageUrl);

    // Simulate image processing and search
    setTimeout(() => {
      const mockResults = [
        { id: 1, name: "Similar Red Silk Saree", similarity: 95 },
        { id: 101, name: "Matching Lehenga Design", similarity: 87 },
        { id: 201, name: "Similar Pattern Kurti", similarity: 82 }
      ];
      
      onImageSearch(mockResults);
      setIsProcessing(false);
      setIsOpen(false);
      setSelectedImage(null);
    }, 2000);
  };

  const openCamera = () => {
    cameraInputRef.current?.click();
  };

  const openGallery = () => {
    fileInputRef.current?.click();
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedImage(null);
    setIsProcessing(false);
  };

  return (
    <>
      <button
        className="camera-search-btn"
        onClick={() => setIsOpen(true)}
        title="Search by image"
      >
        <FaCamera />
      </button>

      {isOpen && (
        <div className="camera-modal-overlay" onClick={closeModal}>
          <div className="camera-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Search by Image</h3>
              <button className="close-btn" onClick={closeModal}>
                <FaTimes />
              </button>
            </div>

            <div className="modal-content">
              {!selectedImage && !isProcessing && (
                <div className="upload-options">
                  <button className="upload-btn camera-btn" onClick={openCamera}>
                    <FaCamera />
                    <span>Take Photo</span>
                  </button>
                  
                  <button className="upload-btn gallery-btn" onClick={openGallery}>
                    <FaUpload />
                    <span>Upload Image</span>
                  </button>
                  
                  <p className="upload-hint">
                    Upload a photo to find similar sarees, lehengas, or kurtis
                  </p>
                </div>
              )}

              {selectedImage && (
                <div className="image-preview">
                  <img src={selectedImage} alt="Selected" />
                  {isProcessing && (
                    <div className="processing-overlay">
                      <div className="spinner"></div>
                      <p>Searching for similar products...</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              style={{ display: 'none' }}
            />
            
            <input
              ref={cameraInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleImageUpload}
              style={{ display: 'none' }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default CameraSearch;