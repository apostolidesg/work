// playwright/pageObjects/lib/world.js
class World {
  constructor() {
    this.lang = 'el'; // Default language
  }

  setLang(lang) {
    this.lang = lang.toLowerCase();
  }

  getLang() {
    return this.lang;
  }
}

const world = new World();
module.exports = world;
