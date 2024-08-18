export const updateArtworkUrl = () => {
  window.currentArtUrl =
    Spicetify.Player.data.item.metadata.image_xlarge_url ||
    Spicetify.Player.data.item.metadata.image_large_url ||
    Spicetify.Player.data.item.metadata.image_url ||
    Spicetify.Player.data.item.metadata.image_small_url ||
    '';

  try {
    window.rootStyle.setProperty('--image-url', `url(${window.currentArtUrl})`);
  } catch (error) {
    console.error('Error updating album art:', error);
  }
};
