import { useState, useRef, useEffect, useCallback } from "react";

const ICPhotoCarouselNew = ({ openModal }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const containerRef = useRef(null);

  // รูปภาพจากโฟลเดอร์ IC - ใช้ absolute path จาก public folder
  const icImages = [
    "/assets/images/IC/1.jpg",
    "/assets/images/IC/2.jpg",
    "/assets/images/IC/3.jpg",
    "/assets/images/IC/4.jpg",
    "/assets/images/IC/5.jpg",
    "/assets/images/IC/6.jpg",
    "/assets/images/IC/7.jpg",
    "/assets/images/IC/8.jpg",
    "/assets/images/IC/9.jpg",
    "/assets/images/IC/10.jpg",
    "/assets/images/IC/11.jpg",
    "/assets/images/IC/12.jpg",
    "/assets/images/IC/13.jpg",
    "/assets/images/IC/14.jpg",
    "/assets/images/IC/15.jpg",
    "/assets/images/IC/16.jpg",
    "/assets/images/IC/17.jpg",
    "/assets/images/IC/18.jpg",
    "/assets/images/IC/19.jpg",
    "/assets/images/IC/20.jpg",
    "/assets/images/IC/21.jpg",
    "/assets/images/IC/22.jpg",
    "/assets/images/IC/23.jpg",
  ];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % icImages.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + icImages.length) % icImages.length
    );
  };

  // Touch events สำหรับการปัด - ปรับปรุงให้ง่ายขึ้น
  const handleTouchStart = useCallback((e) => {
    e.preventDefault(); // ป้องกันการ scroll ของหน้าเว็บ
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
    setCurrentX(e.touches[0].clientX);
  }, []);

  const handleTouchMove = useCallback((e) => {
    if (isDragging) {
      e.preventDefault(); // ป้องกันการ scroll ของหน้าเว็บ
      setCurrentX(e.touches[0].clientX);
    }
  }, [isDragging]);

  const handleTouchEnd = useCallback((e) => {
    if (isDragging) {
      e.preventDefault(); // ป้องกันการ scroll ของหน้าเว็บ
      const diffX = startX - currentX;
      const threshold = 30; // ลดระยะทางขั้นต่ำในการปัด (จาก 50 เป็น 30)

      if (Math.abs(diffX) > threshold) {
        if (diffX > 0) {
          // ปัดไปทางซ้าย = รูปถัดไป
          nextSlide();
        } else {
          // ปัดไปทางขวา = รูปก่อนหน้า
          prevSlide();
        }
      }

      setIsDragging(false);
      setStartX(0);
      setCurrentX(0);
    }
  }, [isDragging, startX, currentX]);

  // Mouse events สำหรับการลาก - ปรับปรุงให้ง่ายขึ้น
  const handleMouseDown = useCallback((e) => {
    setIsDragging(true);
    setStartX(e.clientX);
    setCurrentX(e.clientX);
  }, []);

  const handleMouseMove = useCallback((e) => {
    if (isDragging) {
      setCurrentX(e.clientX);
    }
  }, [isDragging]);

  const handleMouseUp = useCallback(() => {
    if (isDragging) {
      const diffX = startX - currentX;
      const threshold = 30; // ลดระยะทางขั้นต่ำในการลาก (จาก 50 เป็น 30)

      if (Math.abs(diffX) > threshold) {
        if (diffX > 0) {
          // ลากไปทางซ้าย = รูปถัดไป
          nextSlide();
        } else {
          // ลากไปทางขวา = รูปก่อนหน้า
          prevSlide();
        }
      }

      setIsDragging(false);
      setStartX(0);
      setCurrentX(0);
    }
  }, [isDragging, startX, currentX]);

  // เพิ่ม event listeners เมื่อ component mount
  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      // Touch events - ใช้ passive: false เพื่อให้สามารถเรียก preventDefault() ได้
      container.addEventListener("touchstart", handleTouchStart, {
        passive: false,
      });
      container.addEventListener("touchmove", handleTouchMove, {
        passive: false,
      });
      container.addEventListener("touchend", handleTouchEnd, {
        passive: false,
      });

      // Mouse events
      container.addEventListener("mousedown", handleMouseDown);
      container.addEventListener("mousemove", handleMouseMove);
      container.addEventListener("mouseup", handleMouseUp);
      container.addEventListener("mouseleave", handleMouseUp);

      return () => {
        // Cleanup event listeners
        container.removeEventListener("touchstart", handleTouchStart);
        container.removeEventListener("touchmove", handleTouchMove);
        container.removeEventListener("touchend", handleTouchEnd);
        container.removeEventListener("mousedown", handleMouseDown);
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("mouseup", handleMouseUp);
        container.removeEventListener("mouseleave", handleMouseUp);
      };
    }
  }, [
    isDragging,
    startX,
    currentX,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
  ]);

  const getVisibleImages = () => {
    const prevIndex = (currentIndex - 1 + icImages.length) % icImages.length;
    const nextIndex = (currentIndex + 1) % icImages.length;

    return [
      {
        index: prevIndex,
        src: icImages[prevIndex],
        zIndex: 10,
        scale: 0.75,
        opacity: 0.6,
        x: -60,
        y: 15,
        rotate: -8,
      },
      {
        index: currentIndex,
        src: icImages[currentIndex],
        zIndex: 20,
        scale: 1,
        opacity: 1,
        x: 0,
        y: 0,
        rotate: 0,
      },
      {
        index: nextIndex,
        src: icImages[nextIndex],
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
    <div className="w-full max-w-md mx-auto">
      <h3 className="text-lg font-semibold text-light-green-800 mb-6 text-center">
        📸 Our Special Moments 📸
      </h3>
      <div
        ref={containerRef}
        className="relative h-[320px] flex items-center justify-center cursor-grab active:cursor-grabbing"
        style={{
          userSelect: "none",
          touchAction: "none", // ป้องกันการ scroll บนมือถือ
          overscrollBehavior: "none", // ป้องกันการ bounce effect
        }}
      >
        {/* Swipe hint */}
        <div className="absolute top-2 left-1/2 transform -translate-x-1/2 text-xs text-light-green-600 opacity-60 z-20">
          ← ปัดซ้าย-ขวา →
        </div>
        {/* Photos */}
        {getVisibleImages().map((image, idx) => (
          <div
            key={`${image.index}-${currentIndex}`}
            className="absolute transition-all duration-500 ease-in-out cursor-pointer"
            style={{
              zIndex: image.zIndex,
              transform: `translate(${image.x}px, ${image.y}px) scale(${image.scale}) rotate(${image.rotate}deg)`,
              opacity: image.opacity,
            }}
            onClick={() => openModal(image.src)}
          >
            <img
              src={image.src}
              alt={`IC ${image.index + 1}`}
              className="w-[240px] h-[320px] rounded-2xl shadow-2xl object-cover border-4 border-white hover:scale-105 transition-transform duration-200"
            />
          </div>
        ))}

        {/* Navigation Dots */}
        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-30">
          {icImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "bg-light-green-500 scale-125"
                  : "bg-light-green-300 hover:bg-light-green-400"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ICPhotoCarouselNew;
