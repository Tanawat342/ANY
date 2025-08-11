import { memo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { _anniversaryImage, _allImages } from "../../assets/mock/mock";

const FirstImageCarousel = memo(({ openModal }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // รวมรูปแรกกับรูปอื่นๆ
  const allImages = [_anniversaryImage, ..._allImages.map((img) => img.src)];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % allImages.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + allImages.length) % allImages.length
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="w-full max-w-md mx-auto"
    >
      <div className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="w-[245px] h-[320px] rounded-lg shadow-lg mx-auto">
              <img
                src={allImages[currentIndex]}
                alt={`Slide ${currentIndex + 1}`}
                onClick={() => openModal(allImages[currentIndex])}
                loading="lazy"
                className="w-full h-full object-cover rounded-lg cursor-pointer border-none bg-[#bbf7d0]"
              />
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg z-10"
        >
          <svg
            className="w-5 h-5 text-gray-800"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg z-10"
        >
          <svg
            className="w-5 h-5 text-gray-800"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-4 space-x-2">
          {allImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2.5 h-2.5 rounded-full transition-colors ${
                index === currentIndex ? "bg-green-500" : "bg-gray-300"
              }`}
            />
          ))}
        </div>

        {/* Image Counter */}
        <div className="text-center mt-2 text-sm text-gray-600">
          {currentIndex + 1} / {allImages.length}
        </div>
      </div>
    </motion.div>
  );
});

export default FirstImageCarousel;
