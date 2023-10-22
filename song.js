export class Song {
  title;
  image;
  source;

  constructor(id, title, image, source) {
    this.id = id;
    this.title = title;
    this.image = image;
    this.source = source;
  }

  playSong() {
    this.audio.play();
  }

  pauseSong() {
    this.audio.pause();
  }

  stopSong() {
    this.audio.pause();
    this.audio.currentTime = 0;
  }

  setVolume(percentage) {
    this.audio.volume = percentage;
  }

  setLoop() {
    this.audio.loop = true;
  }

  getDuration() {
    return this.audio.duration;
  }

}
