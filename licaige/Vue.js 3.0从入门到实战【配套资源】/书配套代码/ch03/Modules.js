// ��������
export var color = "red";
export let name = "module";
export const sizeOfPage = 10;

// ��������
export function sum(a, b){
	return a + b;
}

// ����ģ��ĩβ���е���
function subtract(a, b){
	return a - b;
}

// ����ģ��ĩβ���е���
function multiply(a, b){
	return a * b;
}

// ����ģ��ĩβ���е���
function divide(a ,b){
	if(b !== 0)
		return a / b;
}
// ������
export class Car {
	constructor(sColor, iDoors){
		this.color = sColor;
		this.doors = iDoors;
	}
	showColor(){
		console.log(this.color);
	}
}
// ģ��˽�еı���
var count = 0;
// ģ��˽�еĺ���
function changeCount(){
	count++;
}
/*
// ����multiply����
export {multiply};
// subtract�Ǳ������ƣ�sub�ǵ���ʱʹ�õ�����
export {subtract as sub}
// ����ģ��Ĭ��ֵ
export default divide;*/
export {multiply, subtract as sub, divide as default};


/*
// �ڶ����﷨��ʽ
// ʹ��default�ؼ��ֵ���һ��������Ϊģ���Ĭ��ֵ��
// ��Ϊ�����ĺ�����ģ������������������Ҫһ������
export default function(a ,b){
	if(b !== 0)
		return a / b;
}
// ----------------------- //
function divide(a ,b){
	if(b !== 0)
		return a / b;
}
// �������﷨��ʽ
export {divide as default}
*/

