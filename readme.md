# JavaScript Interview Solutions

A collection of common JavaScript interview coding challenges and their implementations. This repository includes solutions for various JavaScript concepts, utilities, and design patterns.

## 🚀 Features

### Promise Implementations
- Custom Promise.all, Promise.race, Promise.any, Promise.allSettled
- Promise sequencing and parallel execution
- Cancelable promises
- Promise retry mechanism

### Functional Programming
- Chain calculator
- Pipe and compose functions
- Currying implementation
- Array polyfills

### Performance Utilities
- Debouncing (basic and advanced with leading/trailing options)
- Throttling
- LRU Cache for typeahead search
- MapLimit functionality

### Event Handling
- Custom Event Emitter
- Observable Array implementation
- DOM element finder

### Data Structure Operations
- Array flattening
- Deep object cloning
- Document comparison
- Custom sorting algorithms (QuickSort, MergeSort)

### Object-Oriented Programming
- Prototype inheritance examples
- Custom implementations of call, apply, and bind

## 🔧 Usage

### Calculator Example
javascript
const calc = new Calculator(10);
console.log(calc.add(5).multiply(2).subtract(8).get()); // 22
javascript
const calc = new Calculator(10);
console.log(calc.add(5).multiply(2).subtract(8).get()); // 22javascript
const calc = new Calculator(10);
console.log(calc.add(5).multiply(2).subtract(8).get()); // 22

### Debouncing Example
```javascript
const debouncedFn = debounce(() => console.log('Executed'), 1000);
debouncedFn(); // Will execute after 1 second of inactivity
```

## 📚 Documentation

The codebase includes detailed comments explaining each implementation. Additionally, there's a comprehensive explanation of the React DOM rendering process at the bottom of the main.js file.

## 🧪 Testing

To test the implementations:

1. Clone the repository
2. Open the code in your preferred JavaScript environment
3. Run the test cases provided in the comments
4. Use the browser console or Node.js REPL to experiment with the functions

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.
