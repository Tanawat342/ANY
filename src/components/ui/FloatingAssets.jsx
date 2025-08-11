import { memo } from "react";
import { motion } from "framer-motion";

const FloatingAssets = memo(() => {
  const floatingElements = [
    { emoji: "🌿", delay: 0, duration: 3 },
    { emoji: "✨", delay: 0.5, duration: 2.5 },
    { emoji: "🎁", delay: 1, duration: 3.5 },
    { emoji: "🎊", delay: 1.5, duration: 2.8 },
    { emoji: "🎉", delay: 2, duration: 3.2 },
    { emoji: "🌟", delay: 2.5, duration: 2.9 },
  ];

  return (
    <>
      {floatingElements.map((element, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 100 }}
          animate={{
            opacity: [0, 1, 0],
            y: [100, -100, -200],
            x: [0, Math.random() * 100 - 50, Math.random() * 100 - 50],
          }}
          transition={{
            duration: element.duration,
            delay: element.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="fixed pointer-events-none z-10 text-3xl"
          style={{
            left: `${20 + index * 15}%`,
            top: "100vh",
          }}
        >
          {element.emoji}
        </motion.div>
      ))}

      {/* Heart Rain Effect */}
      {Array.from({ length: 8 }).map((_, index) => (
        <motion.div
          key={`heart-${index}`}
          initial={{ opacity: 0, y: -50 }}
          animate={{
            opacity: [0, 1, 0],
            y: [-50, window.innerHeight + 50],
            x: [0, Math.random() * 200 - 100],
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            delay: index * 0.3,
            repeat: Infinity,
            ease: "linear",
          }}
          className="fixed pointer-events-none z-10 text-2xl text-light-green-400"
          style={{
            left: `${10 + index * 10}%`,
            top: "-50px",
          }}
        >
          💚
        </motion.div>
      ))}
    </>
  );
});

export default FloatingAssets;
