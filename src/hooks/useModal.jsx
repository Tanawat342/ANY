import { useState, useCallback } from "react";

export function useModal() {
  const [isModalVisible, setModalVisible] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);

  const openModal = useCallback((imageSrc) => {
    setCurrentImage(imageSrc);
    setModalVisible(true);
    // Prevent body scroll when modal is open
    document.body.style.overflow = "hidden";
  }, []);

  const closeModal = useCallback(() => {
    setModalVisible(false);
    setCurrentImage(null);
    // Restore body scroll when modal is closed
    document.body.style.overflow = "unset";
  }, []);

  return {
    isModalVisible,
    currentImage,
    openModal,
    closeModal,
  };
}
