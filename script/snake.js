const DIRECTION = {
  none: 0,
  left: 1,
  up: 2,
  right: 3,
  down: 4,
};

class Snake {
    static DIRECTION = DIRECTION;

    constructor(options = {}) {
        this.name = options.name;
        this.author = options.author;
        this.color = options.color || '#000';
        this.accent = options.accent || '#fff';
        this.direction = DIRECTION.none;

        this.body = [];
    }

    add(cell) {
        const last = this.head();
        this.body = [...this.body, { ...cell }];
        if (!last) return;
        if (cell.x == last.x) {
          if (cell.y > last.y) {
            this.direction = DIRECTION.down;
          } else {
            this.direction = DIRECTION.up;
          }
        } else {
          if (cell.x > last.x) {
            this.direction = DIRECTION.right;
          } else {
            this.direction = DIRECTION.left;
          }
        }
        console.log(this.direction);
    }

    reset() {
        this.body = [];
    }

    head() {
      return this.body.slice(-1)[0];
    }

    owns(cell) {
      return this.body.some(c => c.x == cell.x && c.y == cell.y);
    }

    currentDirection() {
      return this.direction;
    }

    getValidMoves(opponent, dimensions) {
      const head = this.head();
      const moves = [
        this.moveUp(),
        this.moveDown(),
        this.moveLeft(),
        this.moveRight(),
      ];
      return moves.filter(move => {
        if (move.x < 0 || move.x >= dimensions.width) { // make sure the move isn't out of bounds horizontally
          return false;
        }
        if (move.y < 0 || move.y >= dimensions.height) { // make sure the move isn't out of bounds vertically
          return false;
        }
        if (this.owns(move) || opponent.some(c => c.x == move.x && c.y == move.y)) { // make sure the move isn't blocked by a snake body
          return false;
        }
        return true;
      });
    }

    turnLeft() {
      switch(this.direction) {
        case DIRECTION.up:
          return this.moveLeft();
        case DIRECTION.down:
          return this.moveRight();
        case DIRECTION.left:
          return this.moveDown();
        case DIRECTION.right:
          return this.moveUp();
      }
    }

    turnRight() {
      switch(this.direction) {
        case DIRECTION.up:
          return this.moveRight();
        case DIRECTION.down:
          return this.moveLeft();
        case DIRECTION.left:
          return this.moveUp();
        case DIRECTION.right:
          return this.moveDown();
      }
    }

    goStraight() {
      switch(this.direction) {
        case DIRECTION.up:
          return this.moveUp();
        case DIRECTION.down:
          return this.moveDown();
        case DIRECTION.left:
          return this.moveLeft();
        case DIRECTION.right:
          return this.moveRight();
      }
    }

    moveUp() {
        const head = this.head();
        return { x: head.x, y: head.y - 1 };
    }

    moveDown() {
        const head = this.head();
        return { x: head.x, y: head.y + 1 };
    }

    moveLeft() {
        const head = this.head();
        return { x: head.x - 1, y: head.y };
    }

    moveRight() {
        const head = this.head();
        return { x: head.x + 1, y: head.y };
    }

    update(dt, opponent, dimensions) {
        // default snake behavior - fall down
        return this.moveDown();
    }

    draw(canvas, context, boxDimensions) {
        context.save();
        context.beginPath();
        context.strokeStyle = this.accent;
        context.lineWidth = 3;
        context.fillStyle = this.color;
        this.body.forEach((cell, index) => {
            let { x, y } = cell;
            x = x * boxDimensions.width + 5;
            y = y * boxDimensions.height + 5;

            if (index == 0) {
                context.moveTo(x + boxDimensions.width / 2, y + boxDimensions.height / 2);
            } else {
              context.lineTo(x + boxDimensions.width / 2, y + boxDimensions.height / 2);
            }
            context.fillRect(x, y, boxDimensions.width, boxDimensions.height);
            if (index == this.body.length - 1) {
              context.stroke();
              context.beginPath();
              context.arc(x + boxDimensions.width / 2, y + boxDimensions.height / 2, 5, 0, Math.PI * 2);
              context.fillStyle = this.accent;
              context.fill();
              context.closePath();
            }
        });
        context.closePath();
        context.restore();
    }
}
