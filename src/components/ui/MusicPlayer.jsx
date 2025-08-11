import { memo, useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

const MusicPlayer = memo(() => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMuted, setIsMuted] = useState(false);
  const [previousVolume, setPreviousVolume] = useState(0.7);
  const audioRef = useRef(null);
  const videoRef = useRef(null);

  // เพลงที่ใช้
  const songInfo = {
    title: "A ROCKET TO THE MOON",
    artist: "GAVIN.D",
    lyrics: "",
    audioSrc: "/song.mp3", // ไฟล์เพลงจากโฟลเดอร์ public
    albumArt: "/src/assets/images/1.jpg", // รูปอัลบั้ม
  };

  useEffect(() => {
    const audio = audioRef.current;
    const video = videoRef.current;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => {
      setDuration(audio.duration);
      setIsLoading(false);
    };
    const handleEnded = () => {
      setIsPlaying(false);
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
      }
    };
    const handleError = (e) => {
      setError("ไม่สามารถโหลดเพลงได้");
      setIsLoading(false);
      console.error("Audio error:", e);
    };
    const handleCanPlay = () => setIsLoading(false);

    // Video event listeners
    const handleVideoTimeUpdate = () => {
      if (video && audio) {
        // Sync video with audio if they get out of sync
        if (Math.abs(video.currentTime - audio.currentTime) > 0.5) {
          video.currentTime = audio.currentTime;
        }
      }
    };

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("error", handleError);
    audio.addEventListener("canplay", handleCanPlay);

    if (video) {
      video.addEventListener("timeupdate", handleVideoTimeUpdate);
    }

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("error", handleError);
      audio.removeEventListener("canplay", handleCanPlay);

      if (video) {
        video.removeEventListener("timeupdate", handleVideoTimeUpdate);
      }
    };
  }, []);

  const togglePlay = async () => {
    try {
      if (isPlaying) {
        audioRef.current.pause();
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        await audioRef.current.play();
        await videoRef.current.play();
        setIsPlaying(true);
      }
    } catch (err) {
      console.error("Error playing audio/video:", err);
      setError("ไม่สามารถเล่นเพลงได้");
    }
  };

  const handleSeek = (e) => {
    const audio = audioRef.current;
    const video = videoRef.current;
    const seekTime = (e.nativeEvent.offsetX / e.target.offsetWidth) * duration;
    audio.currentTime = seekTime;
    video.currentTime = seekTime;
    setCurrentTime(seekTime);
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    audioRef.current.volume = newVolume;
    if (newVolume > 0) {
      setIsMuted(false);
      setPreviousVolume(newVolume);
    }
  };

  const toggleMute = () => {
    if (isMuted) {
      audioRef.current.volume = previousVolume;
      setVolume(previousVolume);
      setIsMuted(false);
    } else {
      setPreviousVolume(volume);
      audioRef.current.volume = 0;
      setVolume(0);
      setIsMuted(true);
    }
  };

  const formatTime = (time) => {
    if (isNaN(time)) return "00:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  const skipForward = () => {
    const newTime = Math.min(currentTime + 10, duration);
    audioRef.current.currentTime = newTime;
    videoRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const skipBackward = () => {
    const newTime = Math.max(currentTime - 10, 0);
    audioRef.current.currentTime = newTime;
    videoRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md mx-auto mt-12 mb-8"
      >
        <div className="bg-red-50 rounded-2xl shadow-2xl p-8 border-l-4 border-red-400">
          <div className="text-center">
            <motion.div
              className="text-6xl mb-4"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ❌
            </motion.div>
            <h3 className="text-xl font-bold text-red-800 mb-2">
              เกิดข้อผิดพลาด
            </h3>
            <p className="text-red-600 mb-6">{error}</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.reload()}
              className="bg-red-500 text-white px-6 py-3 rounded-xl hover:bg-red-600 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              ลองใหม่
            </motion.button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="w-full max-w-sm mx-auto mt-8 mb-6"
    >
      {/* Hidden Audio Element */}
      <audio ref={audioRef} src={songInfo.audioSrc} preload="metadata" />

      <div className="bg-light-green-50 rounded-2xl shadow-xl p-6 border border-light-green-200 relative overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-light-green-200 to-sage-200 rounded-full opacity-20 -translate-y-10 translate-x-10"></div>
        <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-br from-sage-200 to-light-green-200 rounded-full opacity-20 translate-y-8 -translate-x-8"></div>

        {/* Lyrics/Text Area */}
        <motion.div
          className="text-center mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <p className="text-light-green-800 text-base font-medium leading-relaxed mb-2">
            {songInfo.lyrics}
          </p>
        </motion.div>

        {/* Album Art and Song Title */}
        <motion.div
          className="flex items-center mb-6"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="w-16 h-16 bg-gradient-to-br from-light-green-400 via-light-green-300 to-sage-300 rounded-xl flex items-center justify-center mr-3 shadow-lg overflow-hidden">
            <video
              ref={videoRef}
              className="w-full h-full object-cover rounded-lg"
              muted
              loop
              playsInline
              poster="/1.jpg"
            >
              <source
                src="/GAVIN.D - A ROCKET TO THE MOONOfficial MV.mp4"
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          </div>
          <div className="flex flex-col">
            <span className="text-light-green-800 font-bold text-base mb-1">
              {songInfo.title}
            </span>
            <span className="text-sage-600 text-xs">{songInfo.artist}</span>
          </div>
        </motion.div>

        {/* Progress Bar and Time */}
        <motion.div
          className="mb-6"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex justify-between text-xs text-sage-600 mb-2">
            <span className="font-medium">{formatTime(currentTime)}</span>
            <span className="font-medium">{formatTime(duration)}</span>
          </div>
          <div
            className="w-full bg-light-green-200 rounded-full h-2 cursor-pointer relative group"
            onClick={handleSeek}
          >
            <div
              className="bg-gradient-to-r from-light-green-500 via-light-green-400 to-sage-400 h-2 rounded-full relative transition-all duration-100 shadow-lg"
              style={{
                width: `${duration ? (currentTime / duration) * 100 : 0}%`,
              }}
            >
              <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-white rounded-full border-2 border-light-green-500 shadow-lg hover:scale-125 transition-transform opacity-0 group-hover:opacity-100"></div>
            </div>
          </div>
        </motion.div>

        {/* Volume Control */}
        <motion.div
          className="mb-6"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <div className="flex items-center justify-center space-x-3">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleMute}
              className="text-sage-600 hover:text-light-green-600 transition-colors"
            >
              {isMuted ? (
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM12.293 7.293a1 1 0 011.414 0L15 8.586l1.293-1.293a1 1 0 111.414 1.414L16.414 10l1.293 1.293a1 1 0 01-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L13.586 10l-1.293-1.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM12.293 7.293a1 1 0 011.414 0L15 8.586l1.293-1.293a1 1 0 111.414 1.414L16.414 10l1.293 1.293a1 1 0 01-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L13.586 10l-1.293-1.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </motion.button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={handleVolumeChange}
              className="w-24 h-2 bg-light-green-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <span className="text-sage-600 text-xs font-medium min-w-[2.5rem]">
              {Math.round(volume * 100)}%
            </span>
          </div>
        </motion.div>

        {/* Playback Controls */}
        <motion.div
          className="flex justify-center items-center space-x-6 mb-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={skipBackward}
            className="text-sage-600 hover:text-light-green-600 transition-colors p-1.5 rounded-full hover:bg-light-green-100"
            title="ย้อนหลัง 10 วินาที"
            disabled={isLoading}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12.5 8.5L9 12l3.5 3.5M15.5 8.5L12 12l3.5 3.5"
              />
            </svg>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={togglePlay}
            className="w-16 h-16 bg-gradient-to-r from-light-green-500 via-light-green-400 to-sage-400 rounded-full flex items-center justify-center text-white shadow-xl hover:shadow-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:rotate-3"
            disabled={isLoading}
          >
            {isLoading ? (
              <motion.div
                className="w-6 h-6 border-3 border-white border-t-transparent rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              ></motion.div>
            ) : isPlaying ? (
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={skipForward}
            className="text-sage-600 hover:text-light-green-600 transition-colors p-1.5 rounded-full hover:bg-light-green-100"
            title="ไปข้างหน้า 10 วินาที"
            disabled={isLoading}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11.5 8.5L15 12l-3.5 3.5M8.5 8.5L12 12l-3.5 3.5"
              />
            </svg>
          </motion.button>
        </motion.div>

        {/* Song Status */}
        <motion.div
          className="text-center"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <div className="text-xs text-sage-600 font-medium">
            {isLoading ? (
              <motion.div className="flex items-center justify-center space-x-2">
                <motion.div
                  className="w-3 h-3 border-2 border-light-green-500 border-t-transparent rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                ></motion.div>
                <span>กำลังโหลด...</span>
              </motion.div>
            ) : isPlaying ? (
              <motion.div
                className="flex items-center justify-center space-x-2"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <span>🎵</span>
                <span>กำลังเล่น...</span>
              </motion.div>
            ) : null}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
});

export default MusicPlayer;
