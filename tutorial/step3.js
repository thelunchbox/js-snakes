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
        if (this.body.length == 1) {
            return this.moveUp();
        }

        const rightDirection = this.turnRight();
        if (this.isValidMove(rightDirection, opponent, dimensions)) {
            return rightDirection;
        }

        const forwardDirection = this.goStraight();
        if (this.isValidMove(forwardDirection, opponent, dimensions)) {
            return forwardDirection;
        }

        return this.moveDown();
    }
      
}