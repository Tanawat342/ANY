import { useState, useCallback, useEffect, useRef } from "react";

export function useModal() {
  const [isModalVisible, setModalVisible] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const timeoutRef = useRef(null);

  // Emergency cleanup function - ย้ายขึ้นมาก่อน
  const forceClose = useCallback(() => {
    console.warn("🚨 Force closing modal due to error");
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setModalVisible(false);
    setCurrentImage(null);
    setIsLoading(false);
    document.body.style.overflow = "unset";
    document.body.style.paddingRight = "0px";
    console.log("✅ Modal force closed");
  }, []);

  const openModal = useCallback(
    (imageSrc) => {
      console.log("🚀 Opening modal with image:", imageSrc);

      // Validate image source
      if (!imageSrc || typeof imageSrc !== "string") {
        console.error("❌ Invalid image source:", imageSrc);
        return;
      }

      try {
        console.log("✅ Image source is valid, setting up modal...");

        // Clear any existing timeout
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
          timeoutRef.current = null;
        }

        setIsLoading(true);
        setCurrentImage(imageSrc);
        setModalVisible(true);

        // Prevent body scroll when modal is open
        document.body.style.overflow = "hidden";
        document.body.style.paddingRight = "0px";

        // Set a timeout to prevent infinite loading - ลดลงเหลือ 5 วินาที
        timeoutRef.current = setTimeout(() => {
          console.log("⏰ Loading timeout reached, stopping loading state");
          setIsLoading(false);

          // Auto-close modal if still loading after timeout
          setTimeout(() => {
            if (isModalVisible && isLoading) {
              console.log("🚨 Auto-closing modal due to timeout");
              forceClose();
            }
          }, 2000);
        }, 5000); // 5 seconds timeout

        console.log("✅ Modal opened successfully");
      } catch (error) {
        console.error("❌ Error opening modal:", error);
        setIsLoading(false);
        setModalVisible(false);
        setCurrentImage(null);
      }
    },
    [isModalVisible, isLoading, forceClose]
  );

  const closeModal = useCallback(() => {
    console.log("🔒 Closing modal...");
    try {
      // Clear timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }

      setModalVisible(false);
      setCurrentImage(null);
      setIsLoading(false);

      // Restore body scroll when modal is closed
      document.body.style.overflow = "unset";
      document.body.style.paddingRight = "0px";

      console.log("✅ Modal closed successfully");
    } catch (error) {
      console.error("❌ Error closing modal:", error);
      // Force cleanup
      setModalVisible(false);
      setCurrentImage(null);
      setIsLoading(false);
      document.body.style.overflow = "unset";
      document.body.style.paddingRight = "0px";
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        console.log("🧹 Cleanup: timeout cleared");
      }
      document.body.style.overflow = "unset";
      document.body.style.paddingRight = "0px";
      console.log("🧹 Cleanup: body scroll restored");
    };
  }, []);

  // Debug current state
  useEffect(() => {
    console.log("📊 Modal state changed:", {
      isModalVisible,
      currentImage,
      isLoading,
      hasTimeout: !!timeoutRef.current,
    });
  }, [isModalVisible, currentImage, isLoading]);

  return {
    isModalVisible,
    currentImage,
    isLoading,
    openModal,
    closeModal,
    forceClose,
  };
}
