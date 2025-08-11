import { memo, useState, useRef } from "react";
import { motion } from "framer-motion";
import { _anniversaryImage, _allImages } from "../../assets/mock/mock";

const StackedPhotoCarousel = memo(({ openModal }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dragDirection, setDragDirection] = useState(0);
  const containerRef = useRef(null);

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

  const handleDragEnd = (event, info) => {
    const threshold = 50; // ระยะทางขั้นต่ำในการปัด

    if (Math.abs(info.offset.x) > threshold) {
      if (info.offset.x > 0) {
        // ปัดไปทางขวา = รูปก่อนหน้า
        prevSlide();
      } else {
        // ปัดไปทางซ้าย = รูปถัดไป
        nextSlide();
      }
    }
    setDragDirection(0);
  };

  const handleDrag = (event, info) => {
    setDragDirection(info.offset.x);
  };

  // แสดงรูป 3 รูปพร้อมกัน (รูปปัจจุบัน, รูปก่อนหน้า, รูปถัดไป)
  const getVisibleImages = () => {
    const prevIndex = (currentIndex - 1 + allImages.length) % allImages.length;
    const nextIndex = (currentIndex + 1) % allImages.length;

    return [
      {
        index: prevIndex,
        src: allImages[prevIndex],
        zIndex: 10,
        scale: 0.75,
        opacity: 0.6,
        x: -60,
        y: 15,
        rotate: -8,
      },
      {
        index: currentIndex,
        src: allImages[currentIndex],
        zIndex: 20,
        scale: 1,
        opacity: 1,
        x: 0,
        y: 0,
        rotate: 0,
      },
      {
        index: nextIndex,
        src: allImages[nextIndex],
        zIndex: 10,
        scale: 0.75,
        opacity: 0.6,
        x: 60,
        y: 15,
        rotate: 8,
      },
    ];
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="w-full max-w-md mx-auto mb-8"
    >
      <div className="relative h-[320px] flex items-center justify-center">
        {/* รูปที่ซ้อนกัน */}
        {getVisibleImages().map((image, idx) => (
          <motion.div
            key={`${image.index}-${currentIndex}`}
            ref={idx === 1 ? containerRef : null}
            drag={idx === 1 ? "x" : false}
            dragConstraints={{ left: -100, right: 100 }}
            onDragEnd={handleDragEnd}
            onDrag={handleDrag}
            dragElastic={0.2}
            className="absolute cursor-grab active:cursor-grabbing"
            style={{
              zIndex: image.zIndex,
            }}
            animate={{
              x: image.x + (idx === 1 ? dragDirection * 0.1 : 0),
              scale: image.scale,
              opacity: image.opacity,
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
          >
            <div className="w-[240px] h-[320px] rounded-2xl shadow-2xl overflow-hidden border-4 border-white">
              <img
                src={image.src}
                alt={`Slide ${image.index + 1}`}
                onClick={() => openModal(image.src)}
                loading="lazy"
                className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform duration-200"
                draggable={false}
              />
            </div>
          </motion.div>
        ))}

        {/* ปุ่มนำทาง */}
        <button
          onClick={prevSlide}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-light-green-50/90 hover:bg-light-green-100 rounded-full p-2 shadow-lg z-30 border border-light-green-200"
        >
          <svg
            className="w-5 h-5 text-light-green-700"
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
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-light-green-50/90 hover:bg-light-green-100 rounded-full p-2 shadow-lg z-30 border border-light-green-200"
        >
          <svg
            className="w-5 h-5 text-light-green-700"
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

        {/* คำแนะนำการปัด */}
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-xs text-light-green-600 bg-light-green-50/90 px-2 py-1 rounded-full z-30 border border-light-green-200"></div>
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center mt-8 space-x-3">
        {allImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentIndex
                ? "bg-light-green-500"
                : "bg-light-green-200"
            }`}
          />
        ))}
      </div>

      {/* Image Counter */}
      <div className="text-center mt-4 text-sm text-light-green-600">
        {currentIndex + 1} / {allImages.length}
      </div>
    </motion.div>
  );
});

export default StackedPhotoCarousel;
