//let arr = [1, 2, 3];
//console.log(...arr);

/*function sum(a, b, c){
	return a + b + c;
}

let arr = [1, 2, 3];
sum(...arr);
console.log(sum(...arr));*/

/*let arr1 = [1, 2, 3];
let arr2 = arr1;         //arr2��arr1��ͬһ���������
let arr3  = [...arr1];   //arr3��arr1��������ͬ���������

arr1[0] = 4;
console.log(arr2[0]);    //arr2�е�Ԫ��ͬʱ���ı䣬�����4
console.log(arr3[0]);    //�����1*/

/*let arr1 = ['a'];
let arr2 = ['b', 'c'];
let arr3 = ['d', 'e'];
console.log([...arr1, ...arr2, ...arr3]); //[ 'a', 'b', 'c', 'd', 'e' ]*/

let book = {
	tille: "Vue������",
	price: 98
}
	
let bookDetail = {...book, desc: "a fine book"}
console.log(bookDetail); //{ tille: 'Vue������', price: 98, desc: 'a fine book' }



