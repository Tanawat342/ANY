import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ImageModal = ({
  isVisible,
  imageSrc,
  onClose,
  onError,
  isLoading: externalLoading,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Reset states when modal opens/closes
  useEffect(() => {
    if (isVisible && imageSrc) {
      console.log("🔄 ImageModal: Resetting states for new image:", imageSrc);
      setImageLoaded(false);
      setImageError(false);
    }
  }, [isVisible, imageSrc]);

  // Handle image load
  const handleImageLoad = () => {
    console.log("✅ Image loaded successfully:", imageSrc);
    setImageLoaded(true);
    setImageError(false);
  };

  // Handle image error
  const handleImageError = () => {
    console.error("❌ Image failed to load:", imageSrc);
    setImageError(true);
    setImageLoaded(false);
    // Call onError if provided
    if (onError) {
      console.log("🔄 Calling onError callback");
      onError();
    }
  };

  // Handle close with cleanup
  const handleClose = () => {
    console.log("🔒 ImageModal: Closing modal");
    setImageLoaded(false);
    setImageError(false);
    onClose();
  };

  // Force close on external loading timeout
  useEffect(() => {
    if (externalLoading === false && isVisible && !imageLoaded && !imageError) {
      console.log("⏰ External loading timeout, forcing close");
      // External loading timeout occurred, force close
      setTimeout(() => {
        if (onError) {
          onError();
        }
      }, 1000);
    }
  }, [externalLoading, isVisible, imageLoaded, imageError, onError]);

  // Add safety timeout to prevent infinite loading
  useEffect(() => {
    if (isVisible && imageSrc && !imageLoaded && !imageError) {
      const safetyTimeout = setTimeout(() => {
        console.log("🚨 Safety timeout reached, forcing error state");
        setImageError(true);
        if (onError) {
          onError();
        }
      }, 8000); // 8 seconds safety timeout

      return () => clearTimeout(safetyTimeout);
    }
  }, [isVisible, imageSrc, imageLoaded, imageError, onError]);

  // Debug current state
  useEffect(() => {
    console.log("📊 ImageModal state:", {
      isVisible,
      imageSrc,
      imageLoaded,
      imageError,
      externalLoading,
    });
  }, [isVisible, imageSrc, imageLoaded, imageError, externalLoading]);

  // Early return if not visible or no image
  if (!isVisible || !imageSrc) {
    console.log("🚫 ImageModal: Not visible or no image source");
    return null;
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-95 modal-overlay"
        onClick={handleClose}
      >
        <motion.div
          key="modal-content"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="relative w-full h-full flex items-center justify-center p-4 modal-content"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-white text-3xl hover:text-gray-300 transition-colors duration-200 z-10 bg-black bg-opacity-50 rounded-full w-12 h-12 flex items-center justify-center hover:bg-opacity-70 border border-white border-opacity-30"
            aria-label="Close modal"
          >
            ✕
          </button>

          {/* Loading state */}
          {!imageLoaded && !imageError && (
            <div className="flex flex-col items-center justify-center text-white">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mb-4"></div>
              <div>กำลังโหลดรูปภาพ...</div>
              <div className="text-sm opacity-70 mt-2">
                หากใช้เวลานานเกินไป กรุณาลองใหม่อีกครั้ง
              </div>
            </div>
          )}

          {/* Error state */}
          {imageError && (
            <div className="flex flex-col items-center justify-center text-white text-center">
              <div className="text-6xl mb-4">❌</div>
              <div className="text-xl mb-2">ไม่สามารถโหลดรูปภาพได้</div>
              <div className="text-sm opacity-70">กรุณาลองใหม่อีกครั้ง</div>
              <button
                onClick={handleClose}
                className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors duration-200"
              >
                ปิด
              </button>
            </div>
          )}

          {/* Image */}
          {!imageError && (
            <img
              src={imageSrc}
              alt="Full size preview"
              className={`max-w-full max-h-full w-auto h-auto object-contain rounded-lg shadow-2xl transition-opacity duration-300 ${
                imageLoaded ? "opacity-100" : "opacity-0"
              }`}
              style={{
                maxWidth: "100vw",
                maxHeight: "100vh",
              }}
              onLoad={handleImageLoad}
              onError={handleImageError}
              loading="eager"
            />
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ImageModal;
