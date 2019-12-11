(async () => {
  let arr = [1,2,3,4,5]
  let ret = await arr.map(async (item) => {
    console.log(item+'执行')
    // map并发执行
    await new Promise(resolve=>{
        setTimeout(()=>{
          console.log(item+'结束');
          resolve();
        },2000)
    }).then(() => {
      item= 10
      return item
    })
  })
  console.log(ret)
})()

//   
// 
// (async () => {
//   arr = [1,2,3,4,5]
//   let arr1 = []
//   for(item of arr) {
//     await new Promise(resolve=>{
//         setTimeout(()=>{
//           console.log(item+'结束');
//           resolve();
//         },2000)
//     })
//     item = 10
//     arr1.push(item)
//   }
//   console.log(arr1)
// })()






// Array.prototype.mymap = async function (fun) {
//   let ret = []
//   for(let item of this) {
//     // 遍历
//     // 等待传入的异步执行完成再push
//     item = await fun(item)
//     ret.push(item)
//   }
//   // 全部完成
//   return ret
// };

// (async () => {
//   let arr1 = [1,2,3,4,5]
//   let mapArr = await arr1.mymap(async (item)=>{
//     // 异步操作
//     await new Promise(resolve=>{
//         setTimeout(() => {
//           console.log(item + '内结束');
//           resolve();
//         }, 2000)
//     })
//     item = 10
//     return item
//   })

//   console.log(mapArr)
// })()