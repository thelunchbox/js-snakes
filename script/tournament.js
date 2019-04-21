class Tournament {
  constructor(rounds, dimensions) {
    this.rounds = [];
    this.champ = null;

    this.dimensions = dimensions;
    for (let i = 0; i < rounds; i++) {
      this.rounds[i] = [];
    }
  }

  addWinner(winner, round) {
    if (round == this.rounds.length) this.champ = winner;
    else this.rounds[round].push(winner);
  }

  draw(canvas, context, round, game) {
    const { x, y, width, height } = this.dimensions;

    const columns = this.rounds.length * 2 + 1;
    const colWidth = width / columns;
    // const rows = Math.pow(2, this.rounds.length - 1);
    const rowHeight = 30;
    const rowPadding = 30;

    if (this.champ) {
      context.beginPath();
      context.fillStyle = this.champ.color;
      context.fillRect(x + width / 2 - 100, y + 50, 200, rowHeight);
      context.font = '12pt Sans bold';
      context.textBaseline = 'top';
      context.textAlign = 'center'
      context.fillStyle = this.champ.accent;
      context.fillText(this.champ.name, x + width / 2, y + 60);
      context.closePath();
    }

    this.rounds.forEach((teams, round) => {
      const expectedTeams = Math.pow(2, this.rounds.length - round);
      const threshold = expectedTeams / 2;
      const dx = round * colWidth;
      teams.forEach((team, t) => {
        let m = Math.pow(2, round);
        let mlast = Math.pow(2, round - 1);
        let padding = t * (rowPadding * m + rowHeight * m) + m * rowHeight;
        let lx = x + dx;
        let lineX = lx;
        if (t >= threshold) {
          padding = (t - threshold) * (rowPadding * m + rowHeight * m) + m * rowHeight;
          lx = (x + width) - ((round + 1) * colWidth);
          lineX = lx + colWidth;
        }
        let ly = y + padding + 100;

        if (round > 0) {
          const extend = mlast * rowHeight;
          context.beginPath();
          context.strokeStyle = team.color;
          context.lineWidth = 4;
          context.moveTo(lineX, ly - extend);
          context.lineTo(lineX, ly + rowHeight + extend);
          context.stroke();
          context.closePath();
        }

        context.beginPath();
        context.fillStyle = team.color;
        context.fillRect(lx, ly, colWidth, rowHeight);
        context.font = '12pt Sans bold';
        context.textBaseline = 'bottom';
        context.textAlign = t >= threshold ? 'left' : 'right';
        let textX = t >= threshold ? lx + 2 : lx + colWidth - 2;
        context.fillStyle = team.accent;
        context.fillText(team.name, textX, ly + rowHeight - 2);
        context.closePath();
      });
    });
  }
}