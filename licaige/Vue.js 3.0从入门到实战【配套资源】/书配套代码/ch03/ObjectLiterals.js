/*function createCar(color, doors){
	return {
		color : color,
		doors : doors
	}
}*/

/*let name = "zhangsan";
let age = 18;

var person = {name: name, age : age};
console.log(person);*/


/*function createCar(color, doors){
	return {
	  // ��ͬ���Ĳ�����ֻд����������
		color,
		doors
	}
}
let car = createCar("red", 4);
console.log(car);

let name = "zhangsan";
let age = 18;
// ��ͬ���ı��ر�����ֻд����������
var person = {name, age};
console.log(person);
*/

/*var car = {
	color: "red",
	doors: 4,
	showColor: function(){
		console.log(this.color);
	}
}*/
/*var car = {
	color: "red",
	doors: 4,
	showColor(){
		console.log(this.color);
	}
}
car.showColor();
console.log(car.showColor.name);*/



/*let suffix = "name";
let person = {};
person["first name"] = "san";      // ���������пո�
person["last " + suffix] = "zhang";  // �������ɱ��ʽ����õ�
person.age = 20;                   // ��������Կ���ֱ��ͨ����ŷ���
console.log(person);               // { 'first name': 'san', 'last name': 'zhang', age: 20 }
*/

/*let suffix = "name";
let person = {
	["first " + suffix] : "san",
	["last " + suffix]: "zhang",
	age: 20
}
console.log(person); // { 'first name': 'san', 'last name': 'zhang', age: 20 }
*/