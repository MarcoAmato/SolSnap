// Purpose: To store constants that are used throughout the application.

export const IMAGE_FOLDER = "../img/"
export const MOCK_IMAGES = [
    "vincentium_broken.jpg",
    "mock_image_1.jpg",
    "mock_image_2.jpg",
    "mock_image_3.jpg",
].map(image => `${IMAGE_FOLDER}${image}`); // Add the img folder path to each image