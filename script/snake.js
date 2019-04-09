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

    moveUp() {
        const head = this.body.slice(-1);
        return { x: head.x, y: head.y - 1 };
    }

    moveDown() {
        const head = this.body.slice(-1);
        return { x: head.x, y: head.y + 1 };
    }

    moveLeft() {
        const head = this.body.slice(-1);
        return { x: head.x - 1, y: head.y };
    }

    moveRight() {
        const head = this.body.slice(-1);
        return { x: head.x + 1, y: head.y };
    }

    update(dt, opponent, dimensions) {
        return this.moveUp();
    }

    draw(canvas, context) {
        context.save();
        context.strokeStyle = this.accent;
        context.fillStyle = this.color;
        this.body.forEach((cell, index) => {
            if (index == 0) {
                context.moveTo(cell.x, cell.y)
            }
        });
        context.restore();
    }
}