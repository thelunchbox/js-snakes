const COUNTDOWN = 3000;

class Game {

    constructor(options = {}) {
        this.height = options.height || 50;
        this.width = options.width || 50;
        this.time = options.time || 120000;
        this.countdown = COUNTDOWN;

        this.gameOver = options.gameOver || (() => { });

        this.initializeMap();
    }

    initializeMap() {
        this.map = [];

        for (let x = 0; x < this.width; x++) {
            for (let y = 0; y < this.height; y++) {
                this.map.push({ x, y })
            }
        }
    }

    loadSnakes(p1, p2) {
        this.p1 = p1;
        this.p2 = p2;
        this.clock = this.time;
        this.countdown = COUNTDOWN;

        this.score = {
            p1: 0,
            p2: 0,
        };

        this.resetSnakes();
    }

    resetSnakes() {
        this.p1.reset();
        this.p2.reset();

        const x1 = Math.floor(Math.random() * this.width);
        const y1 = Math.floor(Math.random() * this.height);
        let x2 = x1;
        let y2 = y1;

        while (x2 == x1) {
            x2 = Math.floor(Math.random() * this.width);
        }
        while (y2 == y1) {
            y2 = Math.floor(Math.random() * this.height);
        }

        this.p1.add({ x: x1, y: y1 });
        this.p2.add({ x: x2, y: y2 });
    }

    getTime() {
        let time = this.clock;
        let prefix = '';
        if (time < 0) {
            time = -time;
            prefix = '+';
        }
        var min = Math.floor(time / 60000);
        var sec = Math.floor((time % 60000) / 1000);
        if (min > 0 && sec < 10) sec = '0' + sec;
        var tenths = Math.floor((time % 1000) / 100);
        if (min > 0) {
            return prefix + min + ':' + sec;
        } else {
            return prefix + sec + '.' + tenths;
        }
    }

    update(dt) {
        if (this.countdown > 0) {
            this.countdown -= dt;
        } else {
            this.clock -= (dt - this.countdown);
            this.countdown = 0;

            const nextP1Move = this.p1 ? this.p1.update(dt, this.p2.body, {
                w: this.width,
                h: this.height
            }) : true;
            const nextP2Move = this.p2 ? this.p2.update(dt, this.p1.body, {
                w: this.width,
                h: this.height
            }) : true;

            if (nextP1Move && nextP2Move) {

            }

            if (this.clock <= 0 && this.score.p1 != this.score.p2) {
                this.gameOver(this.score);
            }
        }
    }

    draw(canvas, context) {
        context.save();

        context.beginPath();
        context.fillStyle = '#999';
        context.fillRect(0, 0, canvas.width / 2, 5);
        context.fillRect(0, 0, 5, canvas.height);
        context.fillRect(0, canvas.height - 5, canvas.width / 2, 5);
        context.fillRect(canvas.width / 2 - 5, 0, 5, canvas.height);
        context.closePath();

        const width = (canvas.width / 2 - 10) / this.width;
        const height = (canvas.height - 10) / this.height;
        context.beginPath();
        context.strokeStyle = '#333';
        this.map.forEach((cell) => {
            const x = cell.x * width + 5;
            const y = cell.y * height + 5;
            context.strokeRect(x, y, width, height);
        });
        context.closePath();

        this.p1 && this.p1.draw(canvas, context);
        this.p2 && this.p2.draw(canvas, context);

        context.font = '28pt Arial Bold';
        context.textBaseline = 'middle';

        // scoreboard/clock
        if (this.p1) {
            context.beginPath();
            context.textAlign = 'left';
            context.fillStyle = this.p1.color;
            context.fillRect(canvas.width / 2, 0, canvas.width / 6, 80);
            context.fillStyle = this.p1.accent;
            context.fillText(this.p1.name, canvas.width / 2 + 5, 40);
            context.closePath();
        }
        if (this.p2) {
            context.beginPath();
            context.textAlign = 'right';
            context.fillStyle = this.p2.color;
            context.fillRect(canvas.width * 5 / 6, 0, canvas.width / 6, 80);
            context.fillStyle = this.p2.accent;
            context.fillText(this.p2.name, canvas.width - 5, 40);
            context.closePath();
        }



        context.beginPath();
        context.textAlign = 'center';
        context.fillStyle = '#555';
        context.fillRect(canvas.width * 2 / 3, 0, canvas.width / 6, 80);
        context.fillStyle = '#fff';
        context.fillText(this.getTime(), canvas.width * 3 / 4, 40);
        context.closePath();

        context.restore();
    }
}