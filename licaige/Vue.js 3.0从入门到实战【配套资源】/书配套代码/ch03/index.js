// ����ģ��Ĭ��ֵ
import divide from "./Modules.js";
// ��������
import {color, name, sizeOfPage} from "./Modules.js";
// ���뵥����
import {multiply} from "./Modules.js";
// ��Modulesģ���е���subtract����ʱʹ��������sub�����ﵼ��ҲҪ�ø�����
import {sub} from "./Modules.js";
// ����ʱ����������ĺ���
import {sum as add} from "./Modules.js";
// ������
import {Car} from "./Modules.js";
// ��������ģ��
import * as example from "./Modules.js";

console.log(color);           //red
console.log(name);            //module
console.log(sizeOfPage);      //10
// ֻ����add��������sum��
console.log(add(6, 2));       //8
console.log(sub(6, 2));       //4
console.log(multiply(6, 2));  //12
console.log(divide(6, 2));    //3
let car = new Car("black", 4);
car.showColor();              //black
console.log(example.name);    //module
// ע��������sum��������add
console.log(example.sum(6, 2)); // 8
// count��Modulesģ����˽�еı��������ⲿ���ܷ���
console.log(example.count);   //undefined
// changeCount()������Modulesģ����˽�еĺ��������ⲿ���ܷ���
console.log(example.changeCount());   //TypeError: example.changeCount is not a function