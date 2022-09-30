<template>
    <div :style="{width: width + 'px'}" class="container">
        <canvas :width="width" :height="height" ref="canvas"></canvas>
        <div>
            <button @click="initGame">重新开始</button>
        </div>
        <div>
            <span>分数：</span>
            <span>{{ score }}</span>
        </div>
        <div>
            <label>
                fps
                <input v-model="fps">
            </label>
        </div>
    </div>
</template>

<script>
import nj from '@/assets/js/numjs.min'

export default {
        name   : "Snake",
        data() {
            return {
                canvasCtx: {},

                //绘制速度
                fps  : 10,
                pause: false,

                //方向
                up        : 0,
                down      : 1,
                left      : 2,
                right     : 3,
                directions: [
                    [0, -1],
                    [0, 1],
                    [-1, 0],
                    [1, 0]
                ],

                //区域
                width  : 721,
                height : 541,
                bgColor: '#e8e8e8',
                maxX   : 80,
                maxY   : 60,

                //方块长度
                cubeWidth: 10,
                //方块间隙长度
                gap      : 1,

                //蛇
                snakeHeadColor    : '#f05454',
                snakeBodyColor    : '#30475e',
                //蛇长度
                initialSnakeLength: 4,
                //初始位置
                initialX          : 40,
                initialY          : 30,
                snake             : [],
                //蛇移动方向
                xSpeed            : 1,
                ySpeed            : 0,
                //蛇头坐标
                snakeX            : 0,
                snakeY            : 0,

                //食物
                foodColor: '#222831',
                food     : {},

                //分数
                score: 0,

            }
        },
        mounted() {
            this.initCanvas();
            this.initStage();
        },
        created() {
        },
        methods: {
            initCanvas() {

                this.width = this.maxX * this.cubeWidth + (this.maxX + 1) * this.gap;
                this.height = this.maxY * this.cubeWidth + (this.maxY + 1) * this.gap;

                let canvas = this.$refs.canvas;
                this.canvasCtx = canvas.getContext('2d');
                console.log("canvas加载完成");

                let self = this;
                document.onkeyup = function (e) {
                    self.keyup(e);
                }
            },
            initStage() {
                console.log("初始化舞台");
                this.startGame();
            },
            startGame() {
                this.initGame();
                this.update();
                this.display();
            },
            initGame() {
                this.score = 0;
                this.initSnake();
                this.createFood();
            },
            initSnake() {
                this.snake = [];
                this.xSpeed = 1;
                this.ySpeed = 0;
                this.snakeX = this.initialX;
                this.snakeY = this.initialY;
                this.snake.push(this.createCube(this.initialX, this.initialY, true, false));

                for (let i = 0; i < this.initialSnakeLength; i++) {
                    this.snake.push(this.createCube(this.initialX - i - 1, this.initialY, false, false))
                }
            },
            createFood() {
                let duplicate = true;
                let foodMatrixX = 0;
                let foodMatrixY = 0;

                while (duplicate) {
                    foodMatrixX = Math.round(Math.random() * 79);
                    foodMatrixY = Math.round(Math.random() * 59);

                    let flag = false;
                    for (let i = 0; i < this.snake.length; i++) {
                        if (foodMatrixX === this.snake[i].matrixX && foodMatrixY === this.snake[i].matrixY) {
                            flag = true;
                            break;
                        }
                    }

                    duplicate = flag;
                }

                this.food = this.createCube(foodMatrixX, foodMatrixY, false, true);
            },
            displaySnake() {
                for (let i = 0; i < this.snake.length; i++) {
                    this.displayCube(this.snake[i]);
                }
            },
            update() {
                this.turnTo();

                this.snakeX += this.xSpeed;
                this.snakeY += this.ySpeed;

                if (this.snakeX === this.food.matrixX && this.snakeY === this.food.matrixY) {
                    this.score++;
                    //将旧蛇头设置为身体
                    this.snake[0].head = false;

                    //并添加到数组第一位作为蛇头
                    this.snake.unshift(this.createCube(this.snakeX, this.snakeY, true, false));
                    this.createFood();
                } else {
                    //从蛇尾遍历，将当前蛇身的新坐标为前一个蛇身的坐标
                    for (let i = this.snake.length - 1; i >= 0; i--) {
                        let node = this.snake[i];

                        if (node !== undefined) {
                            if (i !== 0) {
                                node.matrixX = this.snake[i - 1].matrixX;
                                node.matrixY = this.snake[i - 1].matrixY;

                                //如果蛇身坐标与蛇头坐标冲突
                                if (node.matrixX === this.snakeX && node.matrixY === this.snakeY) {
                                    this.initGame();
                                }

                            } else {
                                node.matrixX = this.snakeX;
                                node.matrixY = this.snakeY;
                            }
                        }

                    }
                }

                if (this.IsSnakeDead()) {
                    this.initGame();
                }

                if (this.pause) {
                    return;
                }

                let self = this;
                setTimeout(function () {
                    self.update();
                }, 1000 / self.fps);
            },
            display() {
                this.canvasCtx.clearRect(0, 0, this.width, this.height);
                this.canvasCtx.fillStyle = this.bgColor;
                this.canvasCtx.fillRect(0, 0, this.width, this.height);
                this.displaySnake();
                this.displayCube(this.food);

                if (this.pause) {
                    return;
                }

                let self = this;
                requestAnimationFrame(function () {
                    self.display();
                });
            },
            createCube(matrixX, matrixY, head, food) {
                let cube = {};
                //矩阵坐标
                cube.matrixX = matrixX;
                cube.matrixY = matrixY;
                //是否是蛇头
                cube.head = head;

                //是否是食物
                cube.food = food;

                return cube;
            },
            displayCube(cube) {
                if (cube.head) {
                    this.canvasCtx.fillStyle = this.snakeHeadColor;
                } else if (cube.food) {
                    this.canvasCtx.fillStyle = this.foodColor;
                } else {
                    this.canvasCtx.fillStyle = this.snakeBodyColor;
                }
                this.canvasCtx.fillRect(this.calcCoordinates(cube.matrixX), this.calcCoordinates(cube.matrixY), this.cubeWidth, this.cubeWidth);
            },
            calcCoordinates(matrix) {
                return matrix * this.cubeWidth + (matrix + 1) * this.gap
            },
            IsSnakeDead() {
                let head = this.snake[0];
                //是否撞墙了
                if (head.matrixX >= this.maxX || head.matrixY >= this.maxY || head.matrixX < 0 || head.matrixY < 0) {
                    return true;
                }

                return false;
            },
            keyup(e) {
                let head = this.snake[0];

                let nextX = head.matrixX;
                let nextY = head.matrixY;

                if (nextX >= this.maxX || nextY >= this.maxY || nextX < 0 || nextY < 0) {
                    return;
                }

                if (e.keyCode === 32) {
                    this.pause = !this.pause;
                    if (this.pause) {
                        this.pauseGame();
                    } else {
                        this.resumeGame();
                    }

                    console.log("蛇坐标：", this.snakeX, this.snakeY);
                    console.log("食物坐标：", this.food.matrixX, this.food.matrixY);
                    console.log("夹角：", this.calcAngle(this.snakeX, this.snakeY, this.food.matrixX, this.food.matrixY));
                    return;
                }

                let direction;
                if (e.keyCode === 37 && this.ySpeed !== 0) {
                    direction = this.directions[this.left];
                } else if (e.keyCode === 38 && this.xSpeed !== 0) {
                    direction = this.directions[this.up];
                } else if (e.keyCode === 39 && this.ySpeed !== 0) {
                    direction = this.directions[this.right];
                } else if (e.keyCode === 40 && this.xSpeed !== 0) {
                    direction = this.directions[this.down];
                } else {
                    return;
                }
                this.xSpeed = direction[0];
                this.ySpeed = direction[1];
            },
            pauseGame() {
                this.pause = true;
            },
            resumeGame() {
                this.pause = false;
                this.update();
                this.display();
            },
            turnTo() {
                let angle = this.angle();

                let currentDirectionVector = this.snakeCurrentDirectionVector();
                let leftDirection = nj.array([currentDirectionVector.get(1), -currentDirectionVector.get(0)])
                let rightDirection = nj.array([-currentDirectionVector.get(1), currentDirectionVector.get(0)])

                //转向 -1 左, 1 右, 0 前进
                let turnDirection = 0;

                let nextDirection = currentDirectionVector;
                if (angle > 0) {
                    nextDirection = rightDirection;
                    turnDirection = 1;
                } else if (angle < 0) {
                    nextDirection = leftDirection;
                    turnDirection = -1;
                }

                let blockedDirections = this.blockedDirection();
                let isFrontBlocked = blockedDirections[0];
                let isLeftBlocked = blockedDirections[1];
                let isRightBlocked = blockedDirections[2];

                let direction = this.right;

                if (turnDirection === -1) {
                    if (isLeftBlocked === 1) {
                        if (isFrontBlocked === 1 && isRightBlocked === 0) {
                            direction = this.directionVector(1);
                        } else if (isFrontBlocked === 0 && isRightBlocked === 1) {
                            direction = this.directionVector(0);
                        } else if (isFrontBlocked === 0 && isRightBlocked === 0) {
                            direction = this.directionVector(1);
                        }
                    } else {
                        direction = this.directionVector(turnDirection);
                    }
                } else if (turnDirection === 0) {
                    if (isFrontBlocked === 1) {
                        if (isLeftBlocked === 1 && isRightBlocked === 0) {
                            direction = this.directionVector(1);
                        } else if (isLeftBlocked === 0 && isRightBlocked === 1) {
                            direction = this.directionVector(-1);
                        } else if (isLeftBlocked === 0 && isRightBlocked === 0) {
                            direction = this.directionVector(1);
                        }
                    } else {
                        direction = this.directionVector(turnDirection);
                    }
                } else {
                    if (isRightBlocked === 1) {
                        if (isLeftBlocked === 1 && isFrontBlocked === 0) {
                            direction = this.directionVector(0);
                        } else if (isLeftBlocked === 0 && isFrontBlocked === 1) {
                            direction = this.directionVector(-1);
                        } else if (isLeftBlocked === 0 && isFrontBlocked === 0) {
                            direction = this.directionVector(-1);
                        }
                    } else {
                        direction = this.directionVector(turnDirection);
                    }
                }


                this.xSpeed = this.directions[direction][0];
                this.ySpeed = this.directions[direction][1];
            },
            snakeCurrentDirectionVector() {
                return nj.array([this.snake[0].matrixX, this.snake[0].matrixY]).subtract(nj.array([this.snake[1].matrixX, this.snake[1].matrixY]));
            },
            angle() {
                let snakeVector = this.snakeCurrentDirectionVector();
                let foodVector = nj.array([this.food.matrixX, this.food.matrixY]).subtract(nj.array([this.snake[0].matrixX, this.snake[0].matrixY]));

                let nsv = Math.sqrt(snakeVector.pow(2).sum());
                let nfv = Math.sqrt(foodVector.pow(2).sum());

                if (nsv === 0) {
                    nsv = 10;
                }

                if (nfv === 0) {
                    nfv = 10;
                }

                let fvn = foodVector.divide(nfv);
                let svn = snakeVector.divide(nsv);

                return Math.atan2(fvn.get(1) * svn.get(0) - fvn.get(0) * svn.get(1), fvn.get(1) * svn.get(1) + fvn.get(0) * svn.get(0)) / Math.PI;
            },
            blockedDirection() {
                //判断前进一步是否有碰撞，三个方向

                let currentDirection = this.snakeCurrentDirectionVector();
                let leftDirection = nj.array([currentDirection.get(1), -currentDirection.get(0)])
                let rightDirection = nj.array([-currentDirection.get(1), currentDirection.get(0)])

                let isFrontBlocked = this.isDirectionBlocked(currentDirection);
                let isLeftBlocked = this.isDirectionBlocked(leftDirection);
                let isRightBlocked = this.isDirectionBlocked(rightDirection);

                return [isFrontBlocked, isLeftBlocked, isRightBlocked];
            },
            isDirectionBlocked(currentDirectionVector) {
                let nextStep = [this.snake[0].matrixX + currentDirectionVector.get(0), this.snake[0].matrixY + currentDirectionVector.get(1)];

                //判断是否碰墙
                if (nextStep[0] >= this.maxX || nextStep[1] >= this.maxY || nextStep[0] < 0 || nextStep[1] < 0) {
                    return 1;
                }

                for (let i = 1; i < this.snake.length; i++) {
                    if (nextStep[0] === this.snake[i].matrixX && nextStep[1] === this.snake[i].matrixY) {
                        return 1;
                    }
                }

                return 0;
            },
            directionVector(turnDirection) {
                let currentDirection = this.snakeCurrentDirectionVector();
                let leftDirection = nj.array([currentDirection.get(1), -currentDirection.get(0)])
                let rightDirection = nj.array([-currentDirection.get(1), currentDirection.get(0)])

                let nextDirection = currentDirection;

                if (turnDirection === -1) {
                    nextDirection = leftDirection;
                } else if (turnDirection === 1) {
                    nextDirection = rightDirection;
                }
                return this.getDirection(nextDirection);
            },
            getDirection(directionVector) {
                if (directionVector.get(0) === 1 && directionVector.get(1) === 0) {
                    return this.right;
                } else if (directionVector.get(0) === 0 && directionVector.get(1) === 1) {
                    return this.down;
                } else if (directionVector.get(0) === -1 && directionVector.get(1) === 0) {
                    return this.left;
                } else if (directionVector.get(0) === 0 && directionVector.get(1) === -1) {
                    return this.up;
                }

                return this.right;
            }
        }
    }
</script>

<style lang="less" scoped>
    .container {
        margin: 0 auto;
    }
</style>
