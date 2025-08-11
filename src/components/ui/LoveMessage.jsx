import { forwardRef } from "react";
import { motion } from "framer-motion";

const LoveMessage = forwardRef(({ isInView, data }, ref) => {
  // ตรวจสอบข้อมูล
  console.log("LoveMessage data:", data);

  if (!data || !Array.isArray(data) || data.length === 0) {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20, scale: 0.8 }}
        animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{ duration: 0.8 }}
        className="bg-light-green-50 shadow-lg rounded-lg p-8 border-l-4 border-light-green-300 mt-8 light-green-shadow"
      >
        <motion.h3
          className="text-lg font-semibold text-light-green-800 mb-6 text-center"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          🌿 Anniversary Wishes 🌿
        </motion.h3>
        <div className="text-light-green-600 text-center">
          ไม่มีข้อความแสดง: {JSON.stringify(data)}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20, scale: 0.8 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.8 }}
      className="bg-light-green-50 shadow-lg rounded-lg p-8 border-l-4 border-light-green-300 mt-8 light-green-shadow"
    >
      <motion.h3
        className="text-lg font-semibold text-light-green-800 mb-6 text-center"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        🌿 Anniversary Wishes 🌿
      </motion.h3>
      <div className="space-y-6">
        {data.map((message, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="text-base leading-relaxed text-light-green-800 text-start mb-6 last:mb-0"
          >
            {message}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
});

export default LoveMessage;
