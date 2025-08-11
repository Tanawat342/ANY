import { forwardRef } from "react";
import { motion } from "framer-motion";

const ImageGallery = forwardRef(({ isInView, images, onImageClick }, ref) => (
  <motion.div
    ref={ref}
    initial={{ opacity: 0, y: 20, scale: 0.8 }}
    animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
    transition={{ duration: 0.2 }}
    className="flex flex-col gap-6"
  >
    <div className="text-4xl font-extrabold text-[#16a34a] text-center mb-6">
      💚 Our Photo Gallery 💚
    </div>

    <div className="grid grid-cols-2 gap-4 max-w-[320px]">
      {images.map((image, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className="relative group cursor-pointer"
          onClick={() => onImageClick(image.src)}
        >
          <img
            src={image.src}
            alt={image.alt}
            loading="lazy"
            className="w-full h-32 object-cover rounded-lg border-2 border-[#bbf7d0] hover:border-[#4ade80] transition-all duration-300 hover:scale-105 shadow-md"
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 rounded-lg flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-sm font-bold bg-black bg-opacity-50 px-3 py-1 rounded-full">
              👁️ Click to view
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  </motion.div>
));

export default ImageGallery;
