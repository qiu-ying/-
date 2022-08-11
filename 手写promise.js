const PROMISE_STATUS_PENDING = 'pending'
const PROMISE_STATUS_FULFILLED = 'fulfilled'
const PROMISE_STATUS_REJECTED = 'rejected'

class Qypromise {
    constructor(executor) {
        this.status = PROMISE_STATUS_PENDING

        const resolve = (value) => {
            if(this.status === PROMISE_STATUS_PENDING) {
                this.status = PROMISE_STATUS_FULFILLED
                queueMicrotask(() => {
                    this.onfulfilled(value)
                })
            }
        }

        const reject = (reason) => {
            if(this.status === PROMISE_STATUS_PENDING) {
                this.status = PROMISE_STATUS_REJECTED
                queueMicrotask(() => {
                    this.onrejected(reason)
                })
            }
        }

        executor(resolve, reject)
    }

    then(onfulfilled, onrejected) {
        this.onfulfilled = onfulfilled
        this.onrejected = onrejected
    }
}

const qyPromise = new Qypromise((resolve, reject) => {
    reject(666)
    resolve(111)
})

qyPromise.then(res => {
    console.log(res);
}, err => {
    console.log(err);
})

// const promise = new Promise((resolve, reject) => {

// })

// promise.then(res => {

// }, err => {

// })

