import { memo, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PasswordLock = memo(({ onUnlock }) => {
  const [password, setPassword] = useState(["", "", "", "", "", ""]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showError, setShowError] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const correctPassword = "120468";

  useEffect(() => {
    const enteredPassword = password.join("");
    if (enteredPassword.length === 6 && !isProcessing) {
      setIsProcessing(true);

      if (enteredPassword === correctPassword) {
        setIsUnlocked(true);
        setTimeout(() => {
          try {
            onUnlock();
          } catch (error) {
            setIsUnlocked(false);
            setIsProcessing(false);
          }
        }, 800);
      } else {
        setShowError(true);
        setTimeout(() => {
          setPassword(["", "", "", "", "", ""]);
          setCurrentIndex(0);
          setShowError(false);
          setIsProcessing(false);
        }, 2000);
      }
    }
  }, [password, onUnlock, isProcessing]);

  const handleKeyPress = useCallback(
    (e) => {
      if (isProcessing) return;

      if (e.key >= "0" && e.key <= "9" && currentIndex < 6) {
        const newPassword = [...password];
        newPassword[currentIndex] = e.key;
        setPassword(newPassword);
        setCurrentIndex(currentIndex + 1);
      } else if (e.key === "Backspace" && currentIndex > 0) {
        const newPassword = [...password];
        newPassword[currentIndex - 1] = "";
        setPassword(newPassword);
        setCurrentIndex(currentIndex - 1);
      }
    },
    [currentIndex, password, isProcessing]
  );

  const handleNumberClick = useCallback(
    (number) => {
      if (isProcessing || currentIndex >= 6) return;

      const newPassword = [...password];
      newPassword[currentIndex] = number.toString();
      setPassword(newPassword);
      setCurrentIndex(currentIndex + 1);
    },
    [currentIndex, password, isProcessing]
  );

  const handleBackspace = useCallback(() => {
    if (isProcessing || currentIndex <= 0) return;

    const newPassword = [...password];
    newPassword[currentIndex - 1] = "";
    setPassword(newPassword);
    setCurrentIndex(currentIndex - 1);
  }, [currentIndex, password, isProcessing]);

  const handleClear = useCallback(() => {
    if (isProcessing) return;

    setPassword(["", "", "", "", "", ""]);
    setCurrentIndex(0);
  }, [isProcessing]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [handleKeyPress]);

  if (isUnlocked) {
    return (
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="fixed inset-0 bg-gradient-to-br from-light-green-300 to-light-green-500 flex items-center justify-center z-50"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <motion.div
            initial={{ scale: 0, rotate: 0 }}
            animate={{ scale: [0, 1.2, 1], rotate: [0, 360] }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute text-8xl md:text-9xl text-light-green-400"
          >
            🌿
          </motion.div>

          <motion.div
            initial={{ scale: 0, rotate: 0 }}
            animate={{ scale: [0, 1.5, 1], rotate: [0, -360] }}
            transition={{ duration: 1.8, delay: 0.2, ease: "easeOut" }}
            className="absolute text-6xl md:text-7xl text-light-green-300"
          >
            💚
          </motion.div>

          <motion.div
            initial={{ scale: 0, rotate: 0 }}
            animate={{ scale: [0, 1.3, 1], rotate: [0, 180] }}
            transition={{ duration: 1.6, delay: 0.4, ease: "easeOut" }}
            className="absolute text-7xl md:text-8xl text-light-green-200"
          >
            🌱
          </motion.div>

          <motion.div
            initial={{ scale: 0, rotate: 0 }}
            animate={{ scale: [0, 1.4, 1], rotate: [0, 90] }}
            transition={{ duration: 1.7, delay: 0.6, ease: "easeOut" }}
            className="absolute text-5xl md:text-6xl text-light-green-100"
          >
            💝
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2, duration: 0.8 }}
          className="text-4xl md:text-6xl text-white z-10"
        >
          🔓
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5, duration: 0.8 }}
          className="absolute bottom-16 md:bottom-20 text-white text-xl md:text-2xl font-bold text-center px-4 z-10"
        >
          Welcome! 🌿
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-gradient-to-br from-light-green-300 to-light-green-500 flex items-center justify-center z-50 p-4 overflow-y-auto"
    >
      <div className="text-center w-full max-w-sm">
        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-2xl md:text-4xl font-bold text-white mb-2"
        >
          Anniversary Zone 🌿
        </motion.h1>

        <motion.p
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-white text-base md:text-lg mb-6 md:mb-8"
        >
          ใช้ข้อมูลส่วนตัว
        </motion.p>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex justify-center space-x-2 md:space-x-3 mb-6 md:mb-8"
        >
          {password.map((digit, index) => (
            <div
              key={index}
              className={`w-10 h-10 md:w-12 md:h-12 rounded-full border-2 flex items-center justify-center text-lg md:text-xl font-bold transition-all ${
                index < currentIndex
                  ? "bg-white text-light-green-600 border-white"
                  : index === currentIndex
                  ? "bg-white/20 text-white border-white"
                  : "bg-white/10 text-white border-white/30"
              }`}
            >
              {digit}
            </div>
          ))}
        </motion.div>

        {/* Virtual Numeric Keypad */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-6 md:mb-8"
        >
          <div className="grid grid-cols-3 gap-3 md:gap-4 max-w-xs mx-auto">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((number) => (
              <button
                key={number}
                onClick={() => handleNumberClick(number)}
                disabled={isProcessing || currentIndex >= 6}
                className="w-16 h-16 md:w-20 md:h-20 bg-white/20 hover:bg-white/30 active:bg-white/40 text-white text-2xl md:text-3xl font-bold rounded-full border-2 border-white/50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation"
              >
                {number}
              </button>
            ))}

            {/* Clear button */}
            <button
              onClick={handleClear}
              disabled={isProcessing}
              className="w-16 h-16 md:w-20 md:h-20 bg-red-500/80 hover:bg-red-500/90 active:bg-red-500 text-white text-lg md:text-xl font-bold rounded-full border-2 border-red-400 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation"
            >
              C
            </button>

            {/* Zero button */}
            <button
              onClick={() => handleNumberClick(0)}
              disabled={isProcessing || currentIndex >= 6}
              className="w-16 h-16 md:w-20 md:h-20 bg-white/20 hover:bg-white/30 active:bg-white/40 text-white text-2xl md:text-3xl font-bold rounded-full border-2 border-white/50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation"
            >
              0
            </button>

            {/* Backspace button */}
            <button
              onClick={handleBackspace}
              disabled={isProcessing || currentIndex <= 0}
              className="w-16 h-16 md:w-20 md:h-20 bg-blue-500/80 hover:bg-blue-500/90 active:bg-blue-500 text-white text-lg md:text-xl font-bold rounded-full border-2 border-blue-400 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation"
            >
              ←
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-white text-base md:text-lg"
        >
          love u 3000 na 🌿
        </motion.div>

        <AnimatePresence>
          {showError && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="mt-4 md:mt-6 p-3 md:p-4 bg-red-500 text-white rounded-lg text-sm md:text-base"
            >
              รหัสไม่ถูกต้อง ลองใหม่อีกครั้ง
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="mt-6 md:mt-8 text-white/80 text-xs md:text-sm text-center px-4"
        >
          จะทายรหัสถูกมั๊ยน้าา~~
        </motion.div>

        {/* Mobile Instructions */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-4 md:mt-6 text-white/60 text-xs text-center px-4"
        >
          💡 ใช้ปุ่มด้านล่างเพื่อกรอกรหัสผ่าน
        </motion.div>
      </div>
    </motion.div>
  );
});

export default PasswordLock;
