// Utility function to automatically load all images from game folders
// This uses require.context to dynamically import all images at build time

export const loadGameImagesFromFolder = async (gameFolder) => {
  try {
    // Use require.context to get all images from the specific game folder
    const imageContext = require.context(
      "../images",
      true,
      /\.(png|jpe?g|gif|webp)$/i
    );

    // Filter images that belong to the specific game folder
    const gameImages = imageContext
      .keys()
      .filter((key) => key.includes(`/${gameFolder}/`))
      .map((key, index) => ({
        id: index,
        src: imageContext(key),
        alt: `${gameFolder} screenshot ${index + 1}`,
        filename: key.split("/").pop(), // Store filename for debugging
      }));

    console.log(
      `Found ${gameImages.length} images for ${gameFolder}:`,
      gameImages.map((img) => img.filename)
    );

    // If no images found, return placeholder images
    if (gameImages.length === 0) {
      console.warn(
        `No images found in ${gameFolder} folder. Using placeholder images.`
      );
      return generatePlaceholderImages(gameFolder);
    }

    return gameImages;
  } catch (error) {
    console.error(`Error loading images for ${gameFolder}:`, error);
    return generatePlaceholderImages(gameFolder);
  }
};

// Fallback function to generate placeholder images when no real images are found
const generatePlaceholderImages = (gameFolder) => {
  const images = [];
  for (let i = 1; i <= 6; i++) {
    images.push({
      id: i,
      src: `https://picsum.photos/800/600?random=${gameFolder}${i}`,
      alt: `${gameFolder} screenshot ${i}`,
      filename: `placeholder-${i}.jpg`,
    });
  }
  return images;
};

// Preload all game images for better performance
export const preloadAllGameImages = () => {
  const imageContext = require.context(
    "../images",
    true,
    /\.(png|jpe?g|gif|webp)$/i
  );
  const games = ["AssettoCorsa", "Cyberpunk", "Minecraft", "FFXV"];
  const gameImages = {};

  games.forEach((game) => {
    gameImages[game] = imageContext
      .keys()
      .filter((key) => key.includes(`/${game}/`))
      .map((key, index) => ({
        id: index,
        src: imageContext(key),
        alt: `${game} screenshot ${index + 1}`,
        filename: key.split("/").pop(),
      }));

    console.log(`Preloaded ${gameImages[game].length} images for ${game}`);
  });

  return gameImages;
};

// Get all available game folders dynamically
export const getAvailableGameFolders = () => {
  try {
    const imageContext = require.context(
      "../images",
      true,
      /\.(png|jpe?g|gif|webp)$/i
    );
    const folders = new Set();

    imageContext.keys().forEach((key) => {
      const parts = key.split("/");
      if (parts.length >= 3) {
        folders.add(parts[2]); // Get the folder name
      }
    });

    return Array.from(folders);
  } catch (error) {
    console.error("Error getting available game folders:", error);
    return [];
  }
};
