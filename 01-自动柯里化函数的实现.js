function foo(x, y, z) {
  return x + y + z
}

function qyCurrying(fn) {
    function curred(...args) {
      // 将需要柯里化的函数所需的参数与传入的参数进行比较，如果参数个数一样直接调用函数
      if(args.length >= fn.length) {
        return fn.apply(this, args)
      } else {
        // 传入的参数小于需要柯里化函数的参数返回一个函数继续调用
        function curred2(...args2) {
          // 递归调用直到传入的参数与所需柯里化函数的参数个数相同
          return curred.apply(this, [...args, ...args2])
        }

        return curred2
      }
    }

    return curred
}

var curryAdd = qyCurrying(foo)
console.log(qyCurrying(foo)(10,20,30));
console.log(curryAdd(10)(20)(30));
console.log(curryAdd(10,20)(30));
console.log(curryAdd(10,20,30));

