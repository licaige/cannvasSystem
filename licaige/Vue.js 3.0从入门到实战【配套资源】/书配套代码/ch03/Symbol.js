/*
let sn1 = Symbol();

// 使用typeof操作符检测sn变量是否是Symbol类型
console.log(typeof sn1);  // symbol
console.log(sn1);  // Symbol()

let sn2 = Symbol();
console.log(sn1 === sn2);  // false
*/

/*
let sn1 = Symbol("sn1");
let sn2 = Symbol("sn2");
console.log(sn1);            // Symbol(sn1)
console.log(sn2);            // Symbol(sn2)

let sn3 = Symbol("sn1");
console.log(sn1 === sn3);    // false
*/

/*
let obj = {
    toString(){
        return "sn";
    }
}
console.log(Symbol(obj)); // Symbol(sn)
*/
/*
let sn = Symbol("sn");
"My sn is " + sn;*/

/*
let sn = Symbol("sn");
let str = String(sn);
console.log(str);           // Symbol(sn)
console.log(sn.toString()); // Symbol(sn)
*/

/*
let sn = Symbol("sn");
console.log(Boolean(sn));    // true
console.log(!sn);            // false
if(sn) console.log("true");  // true
*/

/*
let sn = Symbol("sn");

// 第一种方式
let obj = {};
obj[sn] = "1111-11";
console.log(obj);         // { [Symbol(sn)]: '1111-11' }

// 第二种方式
let obj = {
    [sn]: "1111-11"      
};
console.log(obj);         // { [Symbol(sn)]: '1111-11' }

// 第三种方式
let obj = {};
Object.defineProperty(obj, sn, {value: "1111-11"});
console.log(obj[sn]);    // 1111-11
*/
/*
let sn = Symbol("sn");
let obj = {};
obj[sn] = "1111-11";
console.log(obj);                                 //{ [Symbol(sn)]: '1111-11' }
 
for (let prop in obj) {                           //无输出
  console.log(prop);                              
}
 
console.log(Object.keys(obj));                     // []
console.log(Object.getOwnPropertyNames(obj));      // []
console.log(Object.getOwnPropertySymbols(obj));    // [Symbol(sn)]
console.log(Reflect.ownKeys(obj));                 // [Symbol(sn)]
*/

/*
let sn1 = Symbol.for("sn");
let sn2 = Symbol.for("sn");
let sn3 = Symbol("sn");
console.log(sn1);          // Symbol(sn)
console.log(sn1 === sn2);  // true
console.log(sn1 === sn3);  // false
*/

let sn1 = Symbol.for("sn");
console.log(Symbol.keyFor(sn1));  // sn

let sn2 = Symbol("sn");
console.log(Symbol.keyFor(sn2));   // undefined








