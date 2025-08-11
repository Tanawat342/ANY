import { memo } from "react";
import { motion } from "framer-motion";

const YouTubeEmbed = memo(() => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="w-full max-w-md mx-auto"
    >
      <div className="bg-gradient-to-r from-green-100 to-emerald-100 p-6 rounded-lg border-2 border-green-200">
        <h3 className="text-2xl font-bold text-center text-green-600 mb-4">
          🎵 Special Song for You 🎵
        </h3>

        <div className="relative w-full h-48 bg-gray-200 rounded-lg overflow-hidden shadow-lg">
          {/* YouTube Embed Placeholder */}
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-green-400 to-emerald-500">
            <div className="text-center text-white">
              <div className="text-6xl mb-2">🎬</div>
              <p className="text-lg font-medium">YouTube Video</p>
              <p className="text-sm opacity-80">Your special song here</p>
            </div>
          </div>

          {/* Play Button Overlay */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/40 transition-colors"
          >
            <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center">
              <svg
                className="w-8 h-8 text-green-500 ml-1"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </motion.button>
        </div>

        <p className="text-center text-gray-600 mt-4 text-sm">
          Click to play our special anniversary song! 💕
        </p>

        {/* Note: In production, replace the placeholder with actual YouTube embed */}
        <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-xs text-blue-700 text-center">
            💡 To add your YouTube video, replace this component with an iframe
            embed
          </p>
        </div>
      </div>
    </motion.div>
  );
});

export default YouTubeEmbed;
