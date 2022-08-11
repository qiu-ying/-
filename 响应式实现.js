// 对应的依赖函数
let activeFn = null

class Depend {
    constructor() {
        // set结构中不允许重复出现元素
        // 设置成set数据结构是因为依赖数组中可能会因为某个函数中多次读取了某个值
        // 导致多次触发了set函数，就会导致多次调用depend函数，进而导致重复推入某个函数到数组中
        this.reactiveFns = new Set()
    }

    // addReactiveFn(reactiveFns) {
    //     this.reactiveFns.push(reactiveFns)
    // }

    depend() {
        if(activeFn) {
            this.reactiveFns.add(activeFn)
        }
    }

    notify() {
        this.reactiveFns.forEach(fn => {
            fn()
        })
    }
}

function watchFn(fn) {
    activeFn = fn
    fn()
    activeFn = null
}

// targetMap.set(target, map)
// map.set(key, '对应的依赖函数')
const targetMap = new WeakMap()
function getDepend(target, key) {
    let map = targetMap.get(target)
    if(!map) {
        map = new Map()
        targetMap.set(target, map)
    }

    let depend = map.get(key)
    if(!depend) {
        depend = new Depend()
        map.set(key, depend)
    }

    return depend

}

function reactive(obj) {
    // 监听对象变化：proxy(vue3)/object.defineProperty()(vue2)
    // object.defineProperty()首先被设计出来就不是为了监听对象的变化
    // 其次对于对象的某些复杂的操作无法监听到
    // proxy可以监听对象的任何变化
    return  new Proxy(obj, {
        get: function(target, key, receive) {
            // 根据target、key获取到对应的depend对象
            // 代理对象中某个值被读取时，调用depend方法将(读取这个值的函数)当作依赖收集到依赖数组中
            // 这样在触发set函数才能有依赖函数执行
            const depend = getDepend(target, key)
            depend.depend()
            return Reflect.get(target, key, receive)
        },
        
        // 当代理对象中的某个值被设置后根据对应的target和key获取到对应的depend
        // 直接执行收集到的依赖函数
        set: function(target, key, newValue, receive) {
            Reflect.set(target, key, newValue, receive)
            const depend = getDepend(target, key)
            depend.notify()
        }
    })
}

const objProxy = reactive({
    name: '666',
    age: 18
})


watchFn(function () {
    console.log(objProxy.name);
    console.log(objProxy.name);
    console.log('执行的代码1');
})

watchFn(function () {
    console.log(objProxy.age);
    console.log('执行的代码2');
})

// objProxy.name = '999'
// objProxy.name = '777'
// objProxy.name = '888'
// objProxy.name = '888'
objProxy.age = '888'



