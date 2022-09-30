const CELL_WIDTH = 107;
const CELL_RADIUS = 3;
const CELL_MARGIN = 15;

function Cell(position, value) {
    this.column = position.column;
    this.row = position.row;
    this.value = value;


}

Cell.prototype.serialize = function () {
    let color = this.getColor();
    return {
        x           : CELL_MARGIN * (this.column + 1) + CELL_WIDTH * this.column,
        y           : CELL_MARGIN * (this.row + 1) + CELL_WIDTH * this.row,
        width       : CELL_WIDTH,
        height      : CELL_WIDTH,
        cornerRadius: CELL_RADIUS,
        fill        : color.bgColor,
        column      : this.column,
        row         : this.row,
        value       : this.value
    };
}

Cell.prototype.rectConfig = function () {
    let color = this.getColor();
    return {
        x           : CELL_MARGIN * (this.column + 1) + CELL_WIDTH * this.column,
        y           : CELL_MARGIN * (this.row + 1) + CELL_WIDTH * this.row,
        width       : CELL_WIDTH,
        height      : CELL_WIDTH,
        cornerRadius: CELL_RADIUS,
        fill        : color.bgColor,
    };
}

Cell.prototype.getColor = function () {
    let cellColor = {};
    if (this.value === 0) {
        cellColor.bgColor = 'rgba(238, 228, 218, 0.35)';
        cellColor.color = '';
    } else if (this.value === 2) {
        cellColor.bgColor = '#eee4da';
        cellColor.color = '#776e65';
    } else if (this.value === 4) {
        cellColor.bgColor = '#ede0c8';
        cellColor.color = '#776e65';
    } else if (this.value === 8) {
        cellColor.bgColor = '#f2b179';
        cellColor.color = '#f9f6f2';
    } else if (this.value === 16) {
        cellColor.bgColor = '#f59563';
        cellColor.color = '#f9f6f2';
    } else if (this.value === 32) {
        cellColor.bgColor = '#f67c5f';
        cellColor.color = '#f9f6f2';
    } else if (this.value === 64) {
        cellColor.bgColor = '#f65e3b';
        cellColor.color = '#f9f6f2';
    } else if (this.value === 128) {
        cellColor.bgColor = '#edcf72';
        cellColor.color = '#f9f6f2';
    } else if (this.value === 256) {
        cellColor.bgColor = '#edcc61';
        cellColor.color = '#f9f6f2';
    } else if (this.value === 512) {
        cellColor.bgColor = '#edc850';
        cellColor.color = '#f9f6f2';
    } else if (this.value === 1024) {
        cellColor.bgColor = '#edc53f';
        cellColor.color = '#f9f6f2';
    } else if (this.value === 2048) {
        cellColor.bgColor = '#edc22e';
        cellColor.color = '#f9f6f2';
    } else if (this.value >= 4096) {
        cellColor.bgColor = '#3c3a32';
        cellColor.color = '#f9f6f2';
    }

    return cellColor;
}

export default Cell
