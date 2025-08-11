import { _anniversaryMemories } from "./assets/mock/mock";

import { useRef, useState, useEffect, useCallback } from "react";
import { useInView } from "framer-motion";
import { useModal } from "./hooks/useModal";
import {
  HeroSection,
  MemoryGallery,
  Footer,
  MusicPlayer,
  StackedPhotoCarousel,
  GiftOpening,
  FloatingAssets,
  PasswordLock,
  ICPhotoCarouselNew,
  ImageModal,
} from "./components/ui";

function App() {
  const { isModalVisible, currentImage, openModal, closeModal } = useModal();
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const memoryGalleryRef = useRef(null);
  const giftRef = useRef(null);

  // ตรวจสอบข้อมูล
  useEffect(() => {
    console.log("=== DEBUG INFO ===");
    console.log("Checking data:", { _anniversaryMemories });
    console.log("_anniversaryMemories type:", typeof _anniversaryMemories);
    console.log(
      "_anniversaryMemories isArray:",
      Array.isArray(_anniversaryMemories)
    );
    console.log("_anniversaryMemories length:", _anniversaryMemories?.length);

    if (
      _anniversaryMemories &&
      Array.isArray(_anniversaryMemories) &&
      _anniversaryMemories.length > 0
    ) {
      setIsDataLoaded(true);
      console.log("✅ Data loaded successfully");
    } else {
      console.error("❌ Data not loaded properly:", {
        _anniversaryMemories,
      });
    }
  }, []);

  const handleUnlock = useCallback(() => {
    setIsUnlocked(true);
  }, []);

  const isInViewMemoryGalleryRef = useInView(memoryGalleryRef, {
    once: true,
    amount: 0.2,
  });
  const isInViewGiftRef = useInView(giftRef, {
    once: true,
    amount: 0.2,
  });

  if (!isUnlocked) {
    return <PasswordLock onUnlock={handleUnlock} />;
  }

  // ตรวจสอบข้อมูลก่อนแสดงผล
  if (!isDataLoaded) {
    console.log("⏳ Still loading data...");
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-light-green-200 to-light-green-400 flex items-center justify-center z-50">
        <div className="text-center text-light-green-800">
          <div className="text-4xl mb-4">🌿</div>
          <div className="text-xl font-medium">กำลังโหลดข้อมูล...</div>
        </div>
      </div>
    );
  }

  console.log("🎉 Rendering main app with data loaded!");
  console.log("Components to render:", {
    HeroSection: true,
    AnniversaryMemories: !!_anniversaryMemories,
    MemoryGallery: !!_anniversaryMemories,
    GiftOpening: true,
  });

  return (
    <div className="relative min-h-screen light-green-bg">
      <div className="aura" />
      <FloatingAssets />

      <div className="relative z-10 flex justify-center min-h-screen overflow-y-auto">
        <div className="flex flex-col items-center max-w-[350px] py-12 gap-12 relative component-container">
          <HeroSection
            content={{
              title: "Happy Anniversary! 💕",
              subtitle: "Our Love Story",
              partnerName: "My Love 💍",
            }}
          />

          <StackedPhotoCarousel openModal={openModal} />

          <div className="decorative-separator"></div>

          <MusicPlayer />

          <div className="component-divider"></div>

          {/* Our Anniversary Memories - Text Only */}
          <div className="bg-light-green-50 shadow-lg rounded-lg p-8 border-l-4 border-light-green-300 light-green-shadow">
            <h3 className="text-lg font-semibold text-light-green-800 mb-6 text-center">
              🌿 Our Anniversary Memories 🌿
            </h3>
            <div className="space-y-6">
              {_anniversaryMemories.map((memory, index) => (
                <div
                  key={memory.id}
                  className="text-base leading-relaxed text-light-green-800 text-start mb-6 last:mb-0"
                >
                  <div className="font-medium text-light-green-700 mb-2">
                    {memory.date}
                  </div>
                  <div>{memory.description}</div>
                </div>
              ))}
            </div>
          </div>

          {/* IC Photo Carousel - New Component */}
          <ICPhotoCarouselNew openModal={openModal} />

          <div className="component-divider"></div>

          <GiftOpening ref={giftRef} isInView={isInViewGiftRef} />

          <Footer />

          <ImageModal
            isVisible={isModalVisible}
            imageSrc={currentImage}
            onClose={closeModal}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
