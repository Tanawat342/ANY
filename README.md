# Surprise Birthday Basic

A beautiful birthday surprise website with premium features like music player, photo carousel, gift opening, and floating animations.

## Features

### 🎵 Music Player

- Background music with controls
- Play/pause functionality
- Volume control

### 📸 Photo Gallery

- Interactive photo carousel
- **NEW: Full-screen image modal** - Click on any image to view it in full-screen popup
- Smooth animations and transitions
- Responsive grid layout

### 🎁 Gift Opening

- Interactive gift opening animation
- Surprise content reveal

### ✨ Floating Assets

- Beautiful floating animations
- Background effects

### 🔒 Password Lock

- Secure access control
- Custom unlock mechanism

## Image Modal Feature

The new Image Modal feature allows users to:

- **Click on any image** to open it in a full-screen popup
- **View images at full resolution** without scrolling to the bottom
- **Close the modal** by clicking anywhere or the close button
- **Smooth animations** with framer-motion
- **Responsive design** that works on all screen sizes

### How to Use

1. Navigate to any photo gallery section
2. Click on any image thumbnail
3. The image will open in a full-screen modal
4. Click anywhere or the ✕ button to close

## Installation

```bash
npm install
npm start
```

## Dependencies

- React 18
- Framer Motion (for animations)
- Tailwind CSS (for styling)
- React Device Detect

## Development

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm test         # Run tests
```

## Project Structure

```
src/
├── components/
│   ├── ui/
│   │   ├── ImageModal.jsx      # NEW: Full-screen image modal
│   │   ├── ImageGallery.jsx    # Photo gallery component
│   │   └── ...                 # Other UI components
│   └── ...
├── hooks/
│   └── useModal.jsx            # Modal state management
└── ...
```

## Customization

The Image Modal can be customized by:

- Modifying the background opacity in `ImageModal.jsx`
- Changing animation durations in the motion components
- Adjusting the close button position and style
- Customizing the hint text at the bottom

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## License

This project is for personal use only.
