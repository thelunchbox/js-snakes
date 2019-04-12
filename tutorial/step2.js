class SpiralOut extends Snake {

    constructor() {
        super({
          color: 'white',
          accent: 'black',
          name: 'Spiral Out',
          author: 'You!',
        });
      }

    update(dt, opponent, dimensions) {
        return this.moveDown();
    }

}