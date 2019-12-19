
/**
 *
 *
 * @class PreLoader
 */
class PreLoader {

  /**
   *Creates an instance of PreLoader.
   * @memberof PreLoader
   */
  constructor() {
    this.totalImages = GAME_IMAGES.length;
    this.loadedImages = 0;
  }

  /**
   *
   *
   * @param {*} callback
   * @memberof PreLoader
   */
  load(callback) {
    GAME_IMAGES.map(image => {
      var img = new Image();
      img.src = image;
      img.onload = () => {
        this.loadedImages++;
        if (this.loadedImages >= this.totalImages) callback();
      }
    });
  }
}
