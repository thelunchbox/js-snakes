class Snake {
    constructor(options = {}) {
        this.name = options.name;
        this.author = options.author;
        this.color = options.color || '#000';
        this.accent = options.accent || '#fff';

        this.body = [];
    }

    add(cell) {
        this.body = [...this.body, { ...cell }];
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
