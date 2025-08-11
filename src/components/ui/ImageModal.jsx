import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const ImageModal = ({ isVisible, imageSrc, onClose }) => {
  if (!isVisible || !imageSrc) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="relative max-w-[95vw] max-h-[95vh]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute -top-12 right-0 text-white text-2xl hover:text-gray-300 transition-colors duration-200 z-10"
            aria-label="Close modal"
          >
            ✕
          </button>

          {/* Image */}
          <img
            src={imageSrc}
            alt="Full size preview"
            className="w-full h-auto max-h-[95vh] object-contain rounded-lg shadow-2xl"
          />

          {/* Click hint */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm opacity-70">
            คลิกที่ไหนก็ได้เพื่อปิด
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ImageModal;
