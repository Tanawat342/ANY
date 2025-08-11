import { forwardRef } from "react";
import { motion } from "framer-motion";
import { AnniversarySection } from "../features";

const MemoryGallery = forwardRef(({ isInView, data }, ref) => {
  // ตรวจสอบข้อมูล
  console.log("MemoryGallery data:", data);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20, scale: 0.8 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.8 }}
      className="flex flex-col gap-10 mb-8"
    >
      <motion.div
        className="text-xl font-semibold text-light-green-800 text-center mb-6"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        🌿 Anniversary Memories 🌿
      </motion.div>

      <AnniversarySection data={data} />
    </motion.div>
  );
});

export default MemoryGallery;
