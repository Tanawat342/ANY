import { memo } from "react";
import { motion } from "framer-motion";

const Footer = memo(() => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1, delay: 0.5 }}
    className="text-center py-10"
  >
    <motion.div
      className="text-lg font-semibold text-light-green-800 mb-4"
      animate={{ scale: [1, 1.05, 1] }}
      transition={{ duration: 2, repeat: Infinity }}
    >
      🌿 Happy Anniversary! 🌿
    </motion.div>
    <div className="text-base text-light-green-700 font-medium leading-relaxed mb-3">
      May our love continue to grow stronger each day
    </div>
    <div className="text-sm text-light-green-600 mt-3 mb-4">
      With all my love 💝
    </div>

    {/* Birthday cake emoji */}
    <motion.div
      className="text-4xl mt-6"
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 2, repeat: Infinity }}
    >
      🌿💍💝
    </motion.div>
  </motion.div>
));

export default Footer;
