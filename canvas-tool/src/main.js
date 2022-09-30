import BaseTool from './BaseTool';

var base = BaseTool.init(document.getElementById('app'));

document.querySelector('#grid').onclick = function() {
  base.drawGrid('#333', 10, 10);
};

document.querySelector('#clear').onclick = function() {
  base.clear();
};

document.querySelector('#axis').onclick = function() {
  base.drawAxis(10.5);
};

document.querySelector('#pencil').onclick = function() {
  base.turnOnBrush();
};

document.querySelector('#rect').onclick = function() {
  base.rectSelect();
};

document.querySelector('#repeal').onclick = function() {
  base.repeal();
};
