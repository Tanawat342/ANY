import React, { memo } from "react";

const AnniversarySection = memo(({ data }) => {
  // ตรวจสอบว่าข้อมูลมีอยู่หรือไม่
  if (!data || !Array.isArray(data) || data.length === 0) {
    return (
      <div className="bg-light-green-50 rounded-lg shadow-lg p-6 border-l-4 border-light-green-300 light-green-shadow">
        <p className="text-light-green-600 text-center">ไม่มีข้อความแสดง</p>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="flex flex-col gap-6">
        {/* Anniversary Memories Gallery */}
        <div className="bg-light-green-50 rounded-lg shadow-lg p-6 border-l-4 border-light-green-300 light-green-shadow">
          <p className="font-bold text-light-green-800 text-lg text-center mb-6">
            🌿 Our Anniversary Memories 🌿
          </p>
          <div className="grid grid-cols-1 gap-6">
            {data.map((memory) => (
              <div
                key={memory.id}
                className="bg-white rounded-lg p-4 shadow-md border border-light-green-200"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-[200px] h-[250px] rounded-lg shadow-lg mb-3">
                    <img
                      src={memory.image}
                      alt={memory.alt}
                      loading="lazy"
                      className="border-none bg-light-green-200 rounded-lg cursor-pointer object-cover w-full h-full"
                    />
                  </div>
                  <div className="text-light-green-700 font-medium text-sm mb-1">
                    {memory.date}
                  </div>
                  <div className="text-light-green-800 text-base leading-relaxed">
                    {memory.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main anniversary photo */}
        <div className="bg-light-green-50 rounded-lg shadow-lg p-6 border-l-4 border-light-green-300 light-green-shadow">
          <p className="font-bold text-light-green-800 text-lg text-center mb-4">
            🌿 Our Special Moment 🌿
          </p>
          <div className="w-[280px] h-[350px] rounded-lg shadow-lg mx-auto">
            <img
              src="/src/assets/images/1.jpg"
              alt="Our anniversary memory"
              loading="lazy"
              className="border-none bg-light-green-200 rounded-lg cursor-pointer object-cover w-full h-full"
            />
          </div>
        </div>

        {/* Gift section */}
        <div className="bg-light-green-50 rounded-lg shadow-lg p-6 border-l-4 border-light-green-300 light-green-shadow">
          <p className="font-bold text-light-green-800 text-lg text-center mb-4">
            🎁 A Special Gift For You 🎁
          </p>
          <div className="w-[250px] h-[300px] rounded-lg shadow-lg mx-auto">
            <img
              src="/1.jpg"
              alt="Special anniversary gift"
              loading="lazy"
              className="border-none bg-light-green-200 rounded-lg cursor-pointer object-cover w-full h-full"
            />
          </div>
          <p className="text-light-green-700 font-medium text-base text-center">
            With all my love 🌿
          </p>
        </div>
      </div>
    </div>
  );
});

export default AnniversarySection;
