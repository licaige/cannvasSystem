/*function Car(sColor,iDoors) 
{ 
	this.color= sColor; 
	this.doors= iDoors;
}
Car.prototype.showColor=function(){
	console.log(this.color);
};

let oCar=new Car("red",4);
oCar.showColor();*/

/*class Car{
	// �ȼ���Car���캯��
	constructor(sColor,iDoors){
		this.color= sColor; 
		this.doors= iDoors;
	}
	// �ȼ���Car.prototype.showColor
	showColor(){
		console.log(this.color);
	}
}

let oCar = new Car("red",4);
oCar.showColor();*/

/*let Car = class {
	// �ȼ���Car���캯��
	constructor(sColor,iDoors){
		this.color= sColor; 
		this.doors= iDoors;
	}
	// �ȼ���Car.prototype.showColor
	showColor(){
		console.log(this.color);
	}
}

let oCar = new Car("red",4);
oCar.showColor();*/

/*let car = new class {
	// �ȼ���Car���캯��
	constructor(sColor,iDoors){
		this.color= sColor; 
		this.doors= iDoors;
	}
	// �ȼ���Car.prototype.showColor
	showColor(){
		console.log(this.color);
	}
}("red", 4);

car.showColor();*/

/*class Car{
	constructor(sName, iDoors){
		this._name= sName; 
		this.doors= iDoors;
	}
	// ֻ������
	get desc(){
		return `${this.name} is worth having.`;
	}
	
	get name(){
		return this._name;
	}
	
	set name(value){
		this._name = value; 
	}
}

let car = new Car("Benz", 4);
console.log(car.name);  // Benz
console.log(car.desc);  // Benz is worth having.
car.name = "Ferrari";
console.log(car.name);  // Ferrari
car.prototype.desc = "very good"; //TypeError: Cannot set property 'desc' of undefined
*/

/*class Car{
	constructor(sName, iDoors){
		this.name= sName; 
		this.doors= iDoors;
	}
	
	showName(){
		console.log(this.name);
	}
	
	static createDefault(){
		return new Car("Audi", 4);
	}
}


let car = Car.createDefault();
car.showName();        // Audi
car.createDefault();   // TypeError: car.createDefault is not a function
*/

/*
class Person{
	constructor(name){
		this.name = name;
	}
	
	work(){
		console.log("working...");
	}
}

class Student extends Person{
	constructor(name, no){
		super(name); //���ø����constructor(name)
		this.no = no;
	}
}

let stu = new Student("zhangsan", 1);
stu.work();  // woking...
*/

/*class Person{
	constructor(name){
		this.name = name;
	}
	
	work(){
		console.log("working...");
	}
}

class Teacher extends Person{
	//û�й��캯��
}*/
//�ȼ���
/*class Teacher extends Person{
	constructor(...args){
		super(...args);
	}
}*/

/*
let teacher = new Teacher("lisi");
teacher.work();  //working...
*/

class Person{
	constructor(name){
		this.name = name;
	}
	
	work(){
		console.log("working...");
	}
}

class Student extends Person{
	constructor(name, no){
		super(name); //���ø����constructor(name)
		this.no = no;
	}
	
	// ����Person.prototype.work()����
	work(){
		super.work();
		console.log("studying...");
	}
}

let stu = new Student("zhangsan", 1);
stu.work();  // working...
             // studying...