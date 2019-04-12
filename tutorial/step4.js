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
        const upPosition = this.moveUp();
        if (this.isValidMove(upPosition, opponent, dimensions)) {
            return upPosition;
        }
        else {
            return this.moveDown();
        }
        }

        const rightDirection = this.turnRight();
        if (this.isValidMove(rightDirection, opponent, dimensions)) {
        return rightDirection;
        }

        const forwardDirection = this.goStraight();
        if (this.isValidMove(forwardDirection, opponent, dimensions)) {
        return forwardDirection;
        }

        const leftDirection = this.turnLeft();
        if (this.isValidMove(leftDirection, opponent, dimensions)) {
        return leftDirection;
        }

        return this.moveDown();
    }
}