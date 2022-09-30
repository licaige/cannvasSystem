<template>
    <div class="container">

        <div :style="{width: width + 'px'}" class="canvas-container">
            <!--            <canvas style="border-radius: 6px;" :width="width" :height="height" ref="canvas"></canvas>-->
            <v-stage ref="stage" :config="configKonva">
                <v-layer>
                    <v-rect :config="backgroundRect"></v-rect>

                    <template v-for="row in cells">
                        <v-rect v-for="cell in row" :config="cell" :key="cell.vueId"></v-rect>
                        <v-text v-for="cell in row" v-if="cell.textConfig" :config="cell.textConfig"
                                :key="cell.vueId+ 'text'"></v-text>
                    </template>

                </v-layer>
            </v-stage>
        </div>
    </div>
</template>

<script>


export default {
    name   : "game2048",
    data() {
        return {
            canvasCtx: {},

            //颜色
            textColor       : '#776E65',
            tileColor       : '#eee4da',
            defaultTileColor: '',
            bgColor         : '#bbada0',

            //规格
            width     : 500,
            height    : 500,
            cellWidth : 107,
            cellRadius: 3,
            cellMargin: 15,

            //大小（常数不可改）
            size      : 4,
            startCells: 2,

            cells: [],

            configKonva   : {
                width : 500,
                height: 500,
            },
            backgroundRect: {
                x           : 0,
                y           : 0,
                width       : 500,
                height      : 500,
                fill        : '#bbada0',
                stroke      : '#bbada0',
                cornerRadius: 6,
            },
            textConfig    : {
                x            : 15,
                y            : 15,
                width        : 107,
                height       : 107,
                align        : 'center',
                verticalAlign: 'middle',
                text         : '8',
                fontSize     : 55,
                fontStyle    : 'bold',
                fontFamily   : '"Clear Sans", "Helvetica Neue", Arial, sans-serif',
                fill         : '#f9f6f2'
            },
            stage         : undefined,

        }
    },
    created() {
        this.defaultTileColor = this.hexToRgba(this.tileColor, '.35');
        for (let i = 0; i < 4; i++) {
            let row = this.cells[i] = [];
            for (let j = 0; j < 4; j++) {
                row.push(this.createDefaultCell(i, j));
            }
        }
        this.addStartCells();
    },
    mounted() {
        // let canvas = this.$refs.canvas;
        // this.canvasCtx = canvas.getContext('2d');
        // console.log("canvas加载完成");
        // this.initStage();
        // this.stage = this.$refs.stage.getNode();
        // let self = this;
        // let layer = new Konva.Layer();
        // let backgroundRect = new Konva.Rect({
        //     x     : 0,
        //     y     : 0,
        //     width : self.width,
        //     height: self.height,
        //     fill  : self.bgColor,
        // });
        // layer.add(backgroundRect);
        // this.stage.add(layer);
    },
    methods: {
        hexToRgba(hex, opacity) {
            return hex && hex.replace(/\s+/g, '').length === 7 ? 'rgba(' + parseInt('0x' + hex.slice(1, 3)) + ',' +
                parseInt('0x' + hex.slice(3, 5)) + ',' +
                parseInt('0x' + hex.slice(5, 7)) + ',' + opacity + ')' : ''
        },
        initStage() {
            this.canvasCtx.fillStyle = this.bgColor;
            this.canvasCtx.fillRect(0, 0, this.width, this.height);

            this.addStartCells();

            this.drawGrid();
        },
        addStartCells() {
            for (let i = 0; i < this.startCells; i++) {
                this.addRandomCell();
            }
        },
        addRandomCell() {
            if (this.cellsAvailable()) {
                let value = Math.random() < 0.9 ? 2 : 4;
                let position = this.randomAvailableCell();
                if (position) {
                    this.updateCell(position.row, position.column, value);
                }
            }
        },
        updateCell(row, column, value) {
            let color = this.getColor(value);
            this.cells[row][column].value = value;
            this.cells[row][column].fill = color.bgColor;
            this.cells[row][column].textConfig = this.createText(column, row, value);
        },
        randomAvailableCell() {
            let cells = this.availableCells();
            if (cells.length) {
                return cells[Math.floor(Math.random() * cells.length)];
            }
        },
        cellsAvailable() {
            return !!this.availableCells().length;
        },
        availableCells() {
            let cells = [];
            this.eachCell(function (i, j, cell) {
                if (cell.value === 0) {
                    cells.push({row: i, column: j})
                }
            });
            return cells;
        },
        eachCell(callback) {
            for (let i = 0; i < this.size; i++) {
                for (let j = 0; j < this.size; j++) {
                    callback(i, j, this.cells[i][j]);
                }
            }
        },
        createDefaultCell(row, column) {
            let cell = {
                vueId       : String(row) + '_' + String(column),
                x           : this.cellMargin * (column + 1) + this.cellWidth * column,
                y           : this.cellMargin * (row + 1) + this.cellWidth * row,
                width       : this.cellWidth,
                height      : this.cellWidth,
                cornerRadius: this.cellRadius,
                fill        : this.defaultTileColor,
                column      : column,
                row         : row,
                value       : 0,
            }
            return cell;
        },
        createText(column, row, value) {
            let color = this.getColor(value);
            let fontSize = 55;
            if (value > 100 && value < 1000) {
                fontSize = 45;
            } else if (value > 1000 && value <= 2048) {
                fontSize = 35;
            } else if (value > 2048) {
                fontSize = 30;
            }
            return {
                x            : this.cellMargin * (column + 1) + this.cellWidth * column,
                y            : this.cellMargin * (row + 1) + this.cellWidth * row,
                width        : this.cellWidth,
                height       : this.cellWidth,
                align        : 'center',
                verticalAlign: 'middle',
                text         : value,
                fontSize     : fontSize,
                fontStyle    : 'bold',
                fontFamily   : '"Clear Sans", "Helvetica Neue", Arial, sans-serif',
                fill         : color.color
            }
        },
        getColor(value) {

            let cellColor = {};
            if (value === 0) {
                cellColor.bgColor = this.defaultTileColor;
                cellColor.color = '';
            } else if (value === 2) {
                cellColor.bgColor = '#eee4da';
                cellColor.color = '#776e65';
            } else if (value === 4) {
                cellColor.bgColor = '#ede0c8';
                cellColor.color = '#776e65';
            } else if (value === 8) {
                cellColor.bgColor = '#f2b179';
                cellColor.color = '#f9f6f2';
            } else if (value === 16) {
                cellColor.bgColor = '#f59563';
                cellColor.color = '#f9f6f2';
            } else if (value === 32) {
                cellColor.bgColor = '#f67c5f';
                cellColor.color = '#f9f6f2';
            } else if (value === 64) {
                cellColor.bgColor = '#f65e3b';
                cellColor.color = '#f9f6f2';
            } else if (value === 128) {
                cellColor.bgColor = '#edcf72';
                cellColor.color = '#f9f6f2';
            } else if (value === 256) {
                cellColor.bgColor = '#edcc61';
                cellColor.color = '#f9f6f2';
            } else if (value === 512) {
                cellColor.bgColor = '#edc850';
                cellColor.color = '#f9f6f2';
            } else if (value === 1024) {
                cellColor.bgColor = '#edc53f';
                cellColor.color = '#f9f6f2';
            } else if (value === 2048) {
                cellColor.bgColor = '#edc22e';
                cellColor.color = '#f9f6f2';
            } else if (value >= 4096) {
                cellColor.bgColor = '#3c3a32';
                cellColor.color = '#f9f6f2';
            }

            return cellColor;
        },
    },

}
</script>

<style lang="less" scoped>

.container {
    background: #faf8ef;
    color: #776e65;
    width: 100%;
    height: 100%;
}

.canvas-container {
    margin: 0 auto;
}
</style>
