/*
//�����ڲ�
function changeState(flag){
	if(flag){
		var color = "red";
	}
	else{
		console.log(color);  //�˴����Է��ʱ���color����ֵΪ��undefined
		return null;
	}
}
changeState(false);

//����
{
  var a = 1;
}
console.log("a = " + a);  //�˴����Է��ʱ���a�������a = 1

//forѭ����
for(var i = 0; i < 10; i++){
}
console.log("i = " + i); //�˴����Է��ʱ���i�������i = 10*/

/*
//�����ڲ�
function changeState(flag){
	if(flag){
		let color = "red";
	}
	else{
		console.log(color);  //�˴����ܷ���color������color is not defined
		return null;
	}
}
changeState(false);

//����
{
  let a = 1;
}
console.log("a = " + a);  //�˴����ܷ��ʱ���a������a is not defined

//forѭ����
for(let i = 0; i < 10; i++){
}
console.log("i = " + i); //�˴����ܷ��ʱ���i������i is not defined
*/

/*var index = 0;
var index = 10;  //OK
let index = 100; //����Identifier 'index' has already been declared */

/*var index = 0;
{
	let index = 10;  //OK
}*/

/*const sizeOfPage = 10;  //��ȷ

const maxItems;          //����
maxItems = 200;*/

/*const person = {
	name: "zhangsan"
};

person.name = "lisi";  //OK
person.age = 20;       //OK

//���󣬱���Assignment to constant variable.
person = {
	name: "wangwu"
};*/





