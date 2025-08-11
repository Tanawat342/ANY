import { memo, useState, forwardRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const GiftOpening = memo(
  forwardRef((props, ref) => {
    const [isOpened, setIsOpened] = useState(false);
    const [showContent, setShowContent] = useState(false);

    const handleGiftClick = () => {
      if (!isOpened) {
        setIsOpened(true);
        setTimeout(() => setShowContent(true), 500);
      }
    };

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md mx-auto text-center mb-8"
      >
        <div className="relative">
          {/* Gift Box */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleGiftClick}
            className="cursor-pointer"
          >
            <motion.div
              animate={isOpened ? { rotateY: 180 } : { rotateY: 0 }}
              transition={{ duration: 0.5 }}
              className="w-48 h-48 mx-auto relative"
            >
              {/* Gift Box Front */}
              <div className="absolute inset-0 bg-gradient-to-br from-light-green-400 to-light-green-600 rounded-lg shadow-xl border-4 border-white">
                <div className="absolute top-4 left-4 right-4 h-1 bg-white rounded-full" />
                <div className="absolute top-8 left-4 right-4 h-1 bg-white rounded-full" />
                <div className="absolute top-12 left-4 right-4 h-1 bg-white rounded-full" />
                <div className="absolute top-16 left-4 right-4 h-1 bg-white rounded-full" />

                {/* Bow */}
                <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-light-green-700 rounded-full" />
                <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-12 h-2 bg-light-green-700 rounded-full" />

                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white font-bold text-lg">
                  Click Me! 🎁
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Gift Content */}
          <AnimatePresence>
            {showContent && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mt-12"
              >
                <div className="bg-light-green-50 p-8 rounded-lg shadow-lg border-l-4 border-light-green-300 light-green-shadow">
                  <motion.div
                    initial={{ rotate: -10 }}
                    animate={{ rotate: 10 }}
                    transition={{
                      duration: 0.5,
                      repeat: Infinity,
                      repeatType: "reverse",
                    }}
                    className="text-4xl mb-6"
                  >
                    🎉
                  </motion.div>
                  <h3 className="text-lg font-semibold text-light-green-800 mb-4">
                    Happy Anniversary! 🌿
                  </h3>
                  <p className="text-sm text-light-green-700 leading-relaxed mb-6">
                    สุขสันต์วันครบรอบ 4 เดือนนะอ้วน
                    ขอบคุณที่เข้ามาเป็นความสุขในทุกๆ
                    วันของเค้าทุกข้อความที่ทำให้ยิ้มได้
                    เสียงหัวเราะของอ้วนทำให้วันที่เหนื่อยเป็นเป็นวันที่หายเหนื่อยได้
                    ตลอด 4 เดือนที่ผ่านมา เราสร้างความทรงจำเล็กๆ น้อยๆ
                    ร่วมกันมาก เหมือนว่าแต่ละวันเราค่อยๆ เติมเต็มกันและกัน
                    ขอบคุณที่เป็นทั้งเพื่อน เป็นคนรัก
                    และเป็นกำลังใจในวันที่ดีและวันที่ไม่ค่อยดี
                    เค้าหวังว่าเราจะได้เรียนรู้และเติบโตไปด้วยกัน มีเรื่องสนุกๆ
                    ให้เล่า อยากให้อ้วนรู้ไว้ว่ารักอ้วนมากขึ้นทุกวัน
                    และตั้งใจจะมีกันและกันไปอีกนานๆนะ
                  </p>
                  <div className="mt-6 flex justify-center space-x-3">
                    <span className="text-2xl">🎁</span>
                    <span className="text-2xl">✨</span>
                    <span className="text-2xl">🌿</span>
                    <span className="text-2xl">🎊</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    );
  })
);

export default GiftOpening;
