class mySnake extends Snake {

    constructor() {
      super({
        color: '#00f',
        accent: '#0d0',
        name: 'BLUEGREEN',
        author: 'Alex',
      });
    }

  update(dt, opponent, dimensions) {
    // dt = time since last update
    // opponent = array of boxes owned by my opponent
    // dimensions = height and width of the arena
    // this.body = array of boxes owned by me

    return this.moveDown();
  }
}
