 /*
  * STRATEGY
  * If this is the first move, go up or down.
  * Otherwise, try turning.
  * If the move isn't valid, try the next direction (right, forward, then left)
  * If no moves work, give up
 */
class SpiralOut extends Snake {

    constructor() {
      super({
        color: '#372375',
        accent: '#B28CFC',
        name: 'Spiral Out',
        author: 'HERO Hackathon',
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
