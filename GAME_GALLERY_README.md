# Game Gallery Setup Instructions

## Overview

The Game Gallery component displays a grid of game icons that, when clicked, open a popup with screenshots from each game. **The system now automatically detects and loads ALL image files from each game folder** - simply add images to your folders and they'll appear in the gallery automatically!

## Current Structure

```
src/
├── images/
│   ├── AssettoCorsa/
│   ├── Cyberpunk/
│   ├── Minecraft/
│   └── FFXV/
└── components/
    ├── GameGallery.js
    └── GameGallery.css
```

## How to Add Images (Automatic Detection)

**The system now automatically detects all image files!** Simply:

1. **Add your game screenshots** directly to the appropriate folders in `src/images/`:

   ```
   src/images/
   ├── AssettoCorsa/
   │   ├── screenshot1.jpg
   │   ├── screenshot2.png
   │   ├── gameplay1.webp
   │   └── ...
   ├── Cyberpunk/
   │   ├── screenshot1.jpg
   │   └── ...
   ├── Minecraft/
   │   ├── screenshot1.png
   │   └── ...
   └── FFXV/
       ├── screenshot1.jpg
       └── ...
   ```

2. **Supported formats**: `.jpg`, `.jpeg`, `.png`, `.gif`, `.webp`

3. **That's it!** The gallery will automatically:
   - Detect all image files in each folder
   - Load them when you click on a game
   - Display them in the popup gallery
   - Show thumbnails for navigation

### How It Works

The system uses `require.context()` to automatically discover all image files at build time. When you add new images to any folder, they'll be automatically included in the gallery without any code changes needed!

## Adding New Games

To add a new game:

1. **Create a new folder** in `src/images/` with your game name
2. **Add the game configuration** to the `games` array in `GameGallery.js`:
   ```javascript
   {
     id: "NewGame",
     name: "New Game Name",
     icon: "https://your-game-icon-url.png",
     folder: "NewGame"
   }
   ```
3. **Add your screenshots** to the new folder - they'll be automatically detected!

## Features

- **Automatic image detection** - no manual configuration needed
- Responsive grid layout
- Smooth hover animations
- Full-screen image popup with navigation
- Thumbnail navigation
- Keyboard support (ESC to close, arrow keys for navigation)
- Mobile-friendly design
- Error handling for missing images
- Preloaded images for better performance

## Customization

- Modify colors and styling in `GameGallery.css`
- Adjust grid layout by changing CSS Grid properties
- Add more games by updating the games array
- Customize popup behavior by modifying the component logic

## Troubleshooting

- **No images showing?** Make sure your images are in the correct folder structure: `src/images/[GameName]/`
- **Images not loading?** Check the browser console for error messages
- **Wrong images?** Verify the folder names match exactly (case-sensitive)
- **Performance issues?** The system preloads all images for better performance
