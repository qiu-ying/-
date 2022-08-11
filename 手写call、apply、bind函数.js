// 自定义call函数
Function.prototype.qyCall = function(thisArg, ...args) {
    // 获取调用函数(qyCall隐式调用，函数内的this为调用函数)
    const fn = this
    
    // 通过对象隐式调用函数的方式让调用函数内部的this指向对象
    thisArg = (thisArg !== null && thisArg !== undefined) ? Object(thisArg) : window

    thisArg.fn = fn
    const result = thisArg.fn(...args)
    delete thisArg.fn

    return result
}

function sum(sum1, sum2, sum3, sum4) {
    console.log(sum1, sum2, sum3, sum4);
    return 20
}

const result = sum.qyCall('aaa', 10, 20, 30, 40)
console.log(result);

// 自定义apply函数
Function.prototype.qyApply = function(thisArg, ...args) {
    // 获取调用函数(qyCall隐式调用，函数内的this为调用函数)
    const fn = this
    
    // 通过对象隐式调用函数的方式让调用函数内部的this指向对象
    thisArg = (thisArg !== null && thisArg !== undefined) ? Object(thisArg) : window

    thisArg.fn = fn
    const result = thisArg.fn(...args)
    delete thisArg.fn

    return result
}

function bar(num1, num2) {
    console.log(this);
    console.log(num1, num2);

    return num1 + num2
}

const barResult = bar.qyApply(111, [10, 20])
console.log(barResult);

// 自定义bind函数
Function.prototype.qyBind = function(thisArg, ...args) {
    // 获取调用函数(qyCall隐式调用，函数内的this为调用函数)
    const fn = this

    // 通过对象隐式调用函数的方式让调用函数内部的this指向对象
    thisArg = (thisArg !== null && thisArg !== undefined) ? Object(thisArg) : window
    function handle(...arg1) {
        // 将参数合并到一个数组
        const finallyAry = [...args, ...arg1]

        thisArg.fn = fn
        const result = thisArg.fn(...finallyAry)
        delete thisArg.fn
        return result
    }

    return handle
}

function foo(a, b, c, d) {
    console.log(this);
    console.log(a, b, c, d);

    return a + b + c + d
}

const foo1 = foo.qyBind(111, 10, 20)
console.log(foo1(30, 40));
