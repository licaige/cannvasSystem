/*
async function helloAsync(){
    return "Hello";
}


// 等价于
//function helloAsync() {
//   return Promise.resolve("Hello");
//}


console.log(helloAsync())  // Promise { 'Hello' }
 
helloAsync().then(v=>{
   console.log(v);         // Hello
})
*/
/*
function asyncOp(){
   return new Promise(resolve => {
       setTimeout(() => {
          console.log("延时任务");
          resolve();
       }, 1000);
   });
}
 
async function helloAsync(){
   await asyncOp();
   console.log("Hello");
 }
helloAsync();
*/

const resolveAfter2Seconds = function() {
  console.log("starting slow promise");
  return new Promise(resolve => {
    setTimeout(function() {
      resolve("slow");
      console.log("slow promise is done");
    }, 2000);
  });
};

const resolveAfter1Second = function() {
  console.log("starting fast promise");
  return new Promise(resolve => {
    setTimeout(function() {
      resolve("fast");
      console.log("fast promise is done");
    }, 1000);
  });
};

/*
const parallel = async function() {
  console.log("使用await Promise.all并行执行任务");
  // 并行启动两个任务，等待两个任务都完成
  await Promise.all([
      (async()=>console.log(await resolveAfter2Seconds()))(),
      (async()=>console.log(await resolveAfter1Second()))()
  ]);
}

parallel();
*/

/*
function getProcessedData(url) {
  return downloadData(url)              // 返回一个 promise 对象
    .catch(e => {
      return downloadFallbackData(url)  // 返回一个 promise 对象
    })
    .then(v => {
      return processDataInWorker(v);    // 返回一个 promise 对象
    });
}

async function getProcessedData(url) {
  let v;
  try {
    v = await downloadData(url); 
  } catch (e) {
    v = await downloadFallbackData(url);
  }
  return processDataInWorker(v);
}
*/

/*
async function helloAsync() {
  await new Promise(function (resolve, reject) {
    throw new Error("错误");
  });
}

helloAsync().then(v => console.log(v))
            .catch(e => console.log(e.message));  // 错误
*/

async function helloAsync() {
  try {
    await new Promise(function (resolve, reject) {
      throw new Error("错误");
    });
  } catch(e) {
    // 错误处理
  }
  return await('hello');
}


