// Chain Calculator
class Calculator
{
    constructor(value = 0)
    {
        this.value = value;
    }

    add(n)
    {
        this.value += n;
        return this;
    }

    subtract(n)
    {
        this.value -= n;
        return this;
    }

    multiply(n)
    {
        this.value *= n;
        return this;
    }

    divide(n)
    {
        if (n === 0) throw new Error('Division by zero');
        this.value /= n;
        return this;
    }

    get()
    {
        return this.value;
    }
}

// Execute Promises in Sequence
const executeSequentially = async (promiseFns) =>
{
    const results = [];
    for (const fn of promiseFns)
    {
        results.push(await fn());
    }
    return results;
};

// Pipe and Compose
const pipe = (...fns) => (x) => fns.reduce((v, fn) => fn(v), x);
const compose = (...fns) => (x) => fns.reduceRight((v, fn) => fn(v), x);

// Array Polyfills
Array.prototype.myMap = function (callback)
{
    const result = [];
    for (let i = 0; i < this.length; i++)
    {
        result.push(callback(this[i], i, this));
    }
    return result;
};

// Prototype Inheritance Example
function Animal(name)
{
    this.name = name;
}

Animal.prototype.speak = function ()
{
    return `${this.name} makes a sound.`;
};

function Dog(name)
{
    Animal.call(this, name);
}

Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;

// Custom Call, Apply, and Bind
Function.prototype.myCall = function (context, ...args)
{
    context = context || window;
    const uniqueId = Symbol();
    context[uniqueId] = this;
    const result = context[uniqueId](...args);
    delete context[uniqueId];
    return result;
};

// Array Flattening
const flattenArray = (arr) =>
{
    return arr.reduce((flat, item) =>
    {
        return flat.concat(Array.isArray(item) ? flattenArray(item) : item);
    }, []);
};

// Debouncing
const debounce = (fn, delay) =>
{
    let timeoutId;
    return function (...args)
    {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn.apply(this, args), delay);
    };
};

// Throttling
const throttle = (fn, limit) =>
{
    let inThrottle;
    return function (...args)
    {
        if (!inThrottle)
        {
            fn.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
};

// Event Emitter
class EventEmitter
{
    constructor()
    {
        this.events = {};
    }

    on(event, callback)
    {
        if (!this.events[event])
        {
            this.events[event] = [];
        }
        this.events[event].push(callback);
        return this;
    }

    emit(event, data)
    {
        if (this.events[event])
        {
            this.events[event].forEach(callback => callback(data));
        }
        return this;
    }

    off(event, callback)
    {
        if (this.events[event])
        {
            this.events[event] = this.events[event].filter(cb => cb !== callback);
        }
        return this;
    }
}

// Advanced Debouncing with Leading/Trailing
const advancedDebounce = (fn, delay, { leading = false, trailing = true } = {}) =>
{
    let timeoutId;
    let lastRan;

    return function (...args)
    {
        if (!timeoutId && leading)
        {
            fn.apply(this, args);
        }

        clearTimeout(timeoutId);

        timeoutId = setTimeout(() =>
        {
            if (trailing)
            {
                fn.apply(this, args);
            }
            timeoutId = null;
        }, delay);
    };
};

// MapLimit
const mapLimit = async (items, limit, fn) =>
{
    const results = [];
    const executing = new Set();

    for (const [index, item] of items.entries())
    {
        const promise = Promise.resolve().then(() => fn(item, index));
        results[index] = promise;
        executing.add(promise);

        const clean = () => executing.delete(promise);
        promise.then(clean).catch(clean);

        if (executing.size >= limit)
        {
            await Promise.race(executing);
        }
    }

    return Promise.all(results);
};

// Cancelable Promise
const createCancelablePromise = (promise) =>
{
    let isCanceled = false;

    const wrappedPromise = new Promise((resolve, reject) =>
    {
        promise.then(
            value => isCanceled ? reject({ isCanceled: true }) : resolve(value),
            error => isCanceled ? reject({ isCanceled: true }) : reject(error)
        );
    });

    return {
        promise: wrappedPromise,
        cancel: () => { isCanceled = true; }
    };
};

// Deep Clone
const deepClone = (obj) =>
{
    if (obj === null || typeof obj !== 'object') return obj;

    if (Array.isArray(obj))
    {
        return obj.map(item => deepClone(item));
    }

    return Object.fromEntries(
        Object.entries(obj).map(([key, value]) => [key, deepClone(value)])
    );
};

// Promise Retry
const retryPromise = (promiseFn, retries, delay = 1000) =>
{
    return new Promise((resolve, reject) =>
    {
        const attempt = async () =>
        {
            try
            {
                const result = await promiseFn();
                resolve(result);
            } catch (error)
            {
                if (retries === 0)
                {
                    reject(error);
                } else
                {
                    retries--;
                    setTimeout(attempt, delay);
                }
            }
        };
        attempt();
    });
};

// Custom Promise.all
Promise.myAll = function (promises)
{
    return new Promise((resolve, reject) =>
    {
        const results = [];
        let completed = 0;

        if (promises.length === 0)
        {
            resolve(results);
            return;
        }

        promises.forEach((promise, index) =>
        {
            Promise.resolve(promise)
                .then(result =>
                {
                    results[index] = result;
                    completed++;
                    if (completed === promises.length)
                    {
                        resolve(results);
                    }
                })
                .catch(reject);
        });
    });
};

// Test the calculator
const calc = new Calculator(10);
console.log(calc.add(5).multiply(2).subtract(8).get()); // 22

// Test the event emitter
const emitter = new EventEmitter();
emitter.on('test', data => console.log(data));
emitter.emit('test', 'Hello World');

// Test array flattening
console.log(flattenArray([1, [2, 3], [4, [5, 6]]])); // [1, 2, 3, 4, 5, 6]
