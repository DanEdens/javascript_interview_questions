// Basic test suite
const assert = require('assert').strict;

describe('JavaScript Implementations Tests', () =>
{
    // Calculator Tests
    describe('Calculator', () =>
    {
        it('should perform chained calculations correctly', () =>
        {
            const calc = new Calculator(10);
            assert.equal(calc.add(5).multiply(2).subtract(8).get(), 22);
        });

        it('should throw error on division by zero', () =>
        {
            const calc = new Calculator(10);
            assert.throws(() => calc.divide(0), Error);
        });
    });

    // Promise Tests
    describe('Promise Implementations', () =>
    {
        it('should execute promises in sequence', async () =>
        {
            const promiseFns = [
                () => Promise.resolve(1),
                () => Promise.resolve(2),
                () => Promise.resolve(3)
            ];
            const results = await executeSequentially(promiseFns);
            assert.deepEqual(results, [1, 2, 3]);
        });

        it('should implement Promise.myAll correctly', async () =>
        {
            const promises = [Promise.resolve(1), Promise.resolve(2)];
            const results = await Promise.myAll(promises);
            assert.deepEqual(results, [1, 2]);
        });
    });

    // Array Operations Tests
    describe('Array Operations', () =>
    {
        it('should flatten nested arrays', () =>
        {
            const nested = [1, [2, 3], [4, [5, 6]]];
            assert.deepEqual(flattenArray(nested), [1, 2, 3, 4, 5, 6]);
        });

        it('should implement custom array map', () =>
        {
            const arr = [1, 2, 3];
            const result = arr.myMap(x => x * 2);
            assert.deepEqual(result, [2, 4, 6]);
        });
    });

    // Event Emitter Tests
    describe('EventEmitter', () =>
    {
        it('should handle events correctly', () =>
        {
            const emitter = new EventEmitter();
            let called = false;
            emitter.on('test', () => called = true);
            emitter.emit('test');
            assert.equal(called, true);
        });
    });

    // Debounce Tests
    describe('Debounce', () =>
    {
        it('should debounce function calls', (done) =>
        {
            let counter = 0;
            const debouncedFn = debounce(() => counter++, 100);

            debouncedFn();
            debouncedFn();
            debouncedFn();

            setTimeout(() =>
            {
                assert.equal(counter, 1);
                done();
            }, 200);
        });
    });

    // Deep Clone Tests
    describe('Deep Clone', () =>
    {
        it('should create a deep copy of objects', () =>
        {
            const original = { a: 1, b: { c: 2 }, d: [1, 2, 3] };
            const cloned = deepClone(original);
            assert.deepEqual(cloned, original);
            assert.notEqual(cloned.b, original.b);
        });
    });

    // Sorting Tests
    describe('Sorting Algorithms', () =>
    {
        it('should sort arrays correctly', () =>
        {
            const arr = [5, 3, 8, 1, 2];
            assert.deepEqual(sortingAlgorithms.quickSort([...arr]), [1, 2, 3, 5, 8]);
            assert.deepEqual(sortingAlgorithms.mergeSort([...arr]), [1, 2, 3, 5, 8]);
        });
    });

    // LRU Cache Tests
    describe('LRU Cache', () =>
    {
        it('should maintain cache size and order', () =>
        {
            const cache = new LRUCache(2);
            cache.put('a', 1);
            cache.put('b', 2);
            cache.put('c', 3);
            assert.equal(cache.get('a'), null);
            assert.equal(cache.get('b'), 2);
            assert.equal(cache.get('c'), 3);
        });
    });
});
