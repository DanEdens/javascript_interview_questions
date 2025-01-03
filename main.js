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

// LRU Cache for Typeahead Search
class LRUCache
{
    constructor(capacity)
    {
        this.capacity = capacity;
        this.cache = new Map();
    }

    get(key)
    {
        if (!this.cache.has(key)) return null;
        const value = this.cache.get(key);
        this.cache.delete(key);
        this.cache.set(key, value);
        return value;
    }

    put(key, value)
    {
        if (this.cache.has(key))
        {
            this.cache.delete(key);
        } else if (this.cache.size >= this.capacity)
        {
            this.cache.delete(this.cache.keys().next().value);
        }
        this.cache.set(key, value);
    }
}

// Document Difference Comparison
const compareDocuments = (doc1, doc2) =>
{
    if (typeof doc1 !== typeof doc2) return false;
    if (typeof doc1 !== 'object') return doc1 === doc2;

    const keys1 = Object.keys(doc1);
    const keys2 = Object.keys(doc2);

    if (keys1.length !== keys2.length) return false;

    return keys1.every(key =>
        keys2.includes(key) && compareDocuments(doc1[key], doc2[key])
    );
};

// Currying Implementation
const curry = (fn) =>
{
    return function curried(...args)
    {
        if (args.length >= fn.length)
        {
            return fn.apply(this, args);
        }
        return function (...moreArgs)
        {
            return curried.apply(this, args.concat(moreArgs));
        };
    };
};

// Parallel Task Execution
const executeParallel = async (tasks, maxParallel = Infinity) =>
{
    const results = [];
    const executing = new Set();

    for (const [index, task] of tasks.entries())
    {
        const promise = Promise.resolve().then(() => task());
        results[index] = promise;

        if (maxParallel < Infinity)
        {
            executing.add(promise);
            promise.finally(() => executing.delete(promise));

            if (executing.size >= maxParallel)
            {
                await Promise.race(executing);
            }
        }
    }

    return Promise.all(results);
};

// DOM Element Finder
const findElement = (selector, root = document) =>
{
    try
    {
        return root.querySelector(selector);
    } catch (e)
    {
        console.error('Invalid selector:', selector);
        return null;
    }
};

// Array Sorting (with multiple algorithms)
const sortingAlgorithms = {
    quickSort: (arr) =>
    {
        if (arr.length <= 1) return arr;
        const pivot = arr[0];
        const left = arr.slice(1).filter(x => x <= pivot);
        const right = arr.slice(1).filter(x => x > pivot);
        return [...sortingAlgorithms.quickSort(left), pivot, ...sortingAlgorithms.quickSort(right)];
    },

    mergeSort: (arr) =>
    {
        if (arr.length <= 1) return arr;
        const mid = Math.floor(arr.length / 2);
        const left = sortingAlgorithms.mergeSort(arr.slice(0, mid));
        const right = sortingAlgorithms.mergeSort(arr.slice(mid));
        return merge(left, right);
    }
};

// Helper function for mergeSort
const merge = (left, right) =>
{
    const result = [];
    let i = 0, j = 0;
    while (i < left.length && j < right.length)
    {
        result.push(left[i] <= right[j] ? left[i++] : right[j++]);
    }
    return [...result, ...left.slice(i), ...right.slice(j)];
};

// Observable Array
class ObservableArray extends Array
{
    push(...items)
    {
        const result = super.push(...items);
        this.dispatchEvent(new CustomEvent('itemsAdded', {
            detail: { items }
        }));
        return result;
    }

    dispatchEvent(event)
    {
        window.dispatchEvent(event);
    }
}

// Promise.race Implementation
Promise.myRace = function (promises)
{
    return new Promise((resolve, reject) =>
    {
        promises.forEach(promise =>
        {
            Promise.resolve(promise).then(resolve).catch(reject);
        });
    });
};

// Promise.any Implementation
Promise.myAny = function (promises)
{
    return new Promise((resolve, reject) =>
    {
        let rejectedCount = 0;
        const errors = new Array(promises.length);

        promises.forEach((promise, index) =>
        {
            Promise.resolve(promise)
                .then(resolve)
                .catch(error =>
                {
                    errors[index] = error;
                    rejectedCount++;
                    if (rejectedCount === promises.length)
                    {
                        reject(new AggregateError(errors, 'All promises rejected'));
                    }
                });
        });
    });
};

// Promise.allSettled Implementation
Promise.myAllSettled = function (promises)
{
    return Promise.all(
        promises.map(promise =>
            Promise.resolve(promise)
                .then(value => ({ status: 'fulfilled', value }))
                .catch(reason => ({ status: 'rejected', reason }))
        )
    );
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

// Test currying
const add = (a, b, c) => a + b + c;
const curriedAdd = curry(add);
console.log(curriedAdd(1)(2)(3)); // 6

// Test parallel execution
const tasks = [
    () => Promise.resolve(1),
    () => Promise.resolve(2),
    () => Promise.resolve(3)
];
executeParallel(tasks).then(console.log); // [1, 2, 3]

// Test sorting
const arr = [5, 3, 8, 1, 2];
console.log(sortingAlgorithms.quickSort([...arr])); // [1, 2, 3, 5, 8]
console.log(sortingAlgorithms.mergeSort([...arr])); // [1, 2, 3, 5, 8]

// Test Observable Array
const obsArr = new ObservableArray();
window.addEventListener('itemsAdded', (e) => console.log('Added:', e.detail.items));
obsArr.push(1, 2, 3); // Logs: Added: [1, 2, 3]
