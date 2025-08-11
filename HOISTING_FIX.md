# 🔧 Hoisting Fix - แก้ไขปัญหา "Cannot access 'forceClose' before initialization"

## ปัญหาที่พบ:

```
ERROR
Cannot access 'forceClose' before initialization
ReferenceError: Cannot access 'forceClose' before initialization
    at useModal (http://localhost:3000/main.aa7c83455152c044094f.hot-update.js:72:34)
```

## สาเหตุของปัญหา:

**JavaScript Hoisting Issue** - เราใช้ `forceClose` ใน `openModal` ก่อนที่จะประกาศ `forceClose` function

```javascript
// ❌ ผิด - ใช้ forceClose ก่อนประกาศ
const openModal = useCallback(
  (imageSrc) => {
    // ... code ...
    setTimeout(() => {
      if (isModalVisible && isLoading) {
        forceClose(); // ❌ ยังไม่ได้ประกาศ!
      }
    }, 2000);
  },
  [isModalVisible, isLoading, forceClose]
);

// ประกาศ forceClose หลังจากใช้
const forceClose = useCallback(() => {
  // ... code ...
}, []);
```

## การแก้ไข:

### 1. **ย้าย forceClose ขึ้นมาก่อน**

```javascript
// ✅ ถูกต้อง - ประกาศ forceClose ก่อน
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

// ใช้ forceClose หลังจากประกาศแล้ว
const openModal = useCallback(
  (imageSrc) => {
    // ... code ...
    setTimeout(() => {
      if (isModalVisible && isLoading) {
        forceClose(); // ✅ ประกาศแล้ว!
      }
    }, 2000);
  },
  [isModalVisible, isLoading, forceClose]
);
```

### 2. **ลำดับการประกาศที่ถูกต้อง:**

```javascript
export function useModal() {
  // 1. State declarations
  const [isModalVisible, setModalVisible] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const timeoutRef = useRef(null);

  // 2. Helper functions (ประกาศก่อน)
  const forceClose = useCallback(() => {
    // ... implementation
  }, []);

  // 3. Main functions (ใช้ helper functions)
  const openModal = useCallback(
    (imageSrc) => {
      // ... implementation using forceClose
    },
    [isModalVisible, isLoading, forceClose]
  );

  const closeModal = useCallback(() => {
    // ... implementation
  }, []);

  // 4. Effects
  useEffect(() => {
    // ... implementation
  }, [isModalVisible, closeModal]);

  // 5. Return
  return {
    isModalVisible,
    currentImage,
    isLoading,
    openModal,
    closeModal,
    forceClose,
  };
}
```

## หลักการสำคัญ:

### **JavaScript Function Hoisting:**

- **Function declarations** จะถูก hoist ขึ้นไปด้านบน
- **Function expressions** (เช่น `const func = () => {}`) จะไม่ถูก hoist
- **const/let** จะไม่ถูก hoist

### **React Hooks Rules:**

- Hooks ต้องถูกเรียกในลำดับเดียวกันเสมอ
- ไม่สามารถเรียก hooks ในเงื่อนไขหรือลูป
- ต้องประกาศ dependencies ที่ถูกต้อง

## การป้องกันในอนาคต:

### 1. **ใช้ ESLint Rules:**

```json
{
  "rules": {
    "react-hooks/exhaustive-deps": "error",
    "no-use-before-define": "error"
  }
}
```

### 2. **ลำดับการเขียนโค้ด:**

1. State declarations
2. Helper functions
3. Main functions
4. Effects
5. Return statement

### 3. **ตรวจสอบ Dependencies:**

```javascript
// ✅ ถูกต้อง - dependencies ครบถ้วน
const openModal = useCallback(
  (imageSrc) => {
    // ... implementation
  },
  [isModalVisible, isLoading, forceClose]
);

// ❌ ผิด - ขาด dependencies
const openModal = useCallback((imageSrc) => {
  // ... implementation
}, []); // ขาด dependencies!
```

## ผลลัพธ์:

หลังจากแก้ไขแล้ว:

- ✅ Build สำเร็จ
- ✅ ไม่มี runtime errors
- ✅ Modal ทำงานได้ปกติ
- ✅ Emergency close button ทำงานได้

## ไฟล์ที่แก้ไข:

- `src/hooks/useModal.jsx` - ย้าย forceClose ขึ้นมาก่อน openModal

## การทดสอบ:

1. รัน `npm run build` - ควรสำเร็จ
2. รัน `npm start` - ควรไม่มี errors
3. ทดสอบการทำงานของ modal
4. ตรวจสอบ console logs
