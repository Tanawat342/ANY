import { memo } from "react";
import { motion } from "framer-motion";

const HeroSection = memo(({ content: { title, subtitle, partnerName } }) => (
  <motion.div
    initial={{ opacity: 0, y: -50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1.5 }}
    className="text-center relative"
  >
    {/* Anniversary sparkles */}
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      className="absolute -top-4 -left-4 text-2xl text-light-green-500"
    >
      🌿
    </motion.div>
    <motion.div
      animate={{ rotate: -360 }}
      transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      className="absolute -top-2 -right-4 text-3xl text-light-green-400"
    >
      🌟
    </motion.div>

    <motion.h1
      className="text-4xl font-bold w-[350px] text-wrap font-['Kanit'] text-light-green-800 mb-4"
      animate={{ scale: [1, 1.05, 1] }}
      transition={{ duration: 2, repeat: Infinity }}
    >
      {title}
    </motion.h1>

    <motion.h2
      className="text-2xl font-semibold w-[350px] text-wrap font-['Kanit'] text-center text-light-green-700 mb-3"
      animate={{ y: [0, -5, 0] }}
      transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
    >
      {subtitle}
    </motion.h2>

    <motion.h3
      className="text-xl font-medium text-light-green-600 mb-12"
      animate={{ y: [0, 5, 0] }}
      transition={{ duration: 2, repeat: Infinity, delay: 1 }}
    >
      {partnerName}
    </motion.h3>

    {/* Bottom sparkles */}
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
      className="absolute -bottom-4 -left-2 text-2xl text-light-green-500"
    >
      💍
    </motion.div>
    <motion.div
      animate={{ rotate: -360 }}
      transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
      className="absolute -bottom-2 -right-2 text-3xl text-light-green-400"
    >
      🌿
    </motion.div>
  </motion.div>
));

export default HeroSection;
