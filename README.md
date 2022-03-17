# solid-primitive-test-util

Simple Solid primitive unit test utility.

## Install

```bash
pnpm add solid-primitive-test-util -D
```

## Example

### Basic Usage

Let's say we have the following primitive to be tested:

```tsx
import { createSignal } from 'solid-js';

export const createCounter = () => {
  const [count, setCount] = createSignal(0);
  const increment = () => setCount((prev) => prev + 1);
  return { count, increment };
};
```

You can test it by wrapping with `renderPrimitive` helper. The return value of `renderPrimitive` includes result property that is the result of the primitive function:

```tsx
import { renderPrimitive } from 'solid-primitive-test-util';
import { createCounter } from './counter';

test('should increment count', () => {
  const { result } = renderPrimitive(() => createCounter());

  expect(result.count()).toBe(0);
  result.increment();
  expect(result.count()).toBe(1);
});
```

### Wrapped Components

Sometimes, primitives may need access to values or functionality outside of itself that are provided by a context provider or some other HOC.

```tsx
import { createSignal, createContext, useContext } from 'solid-js';

const CounterStepContext = createContext(1);

export const CounterStepProvider = (props) => (
  <CounterStepContext.Provider value={props.step}>{props.children}</CounterStepContext.Provider>
);

export const createCounter = (initialValue = 0) => {
  const [count, setCount] = createSignal(initialValue);
  const step = useContext(CounterStepContext);
  const increment = () => setCount((prev) => prev + step);
  return { count, increment };
};
```

In our test, we simply use CounterStepProvider as the wrapper when rendering the primitive:

```tsx
import { renderPrimitive } from 'solid-primitive-test-util';
import { CounterStepProvider, creatCounter } from './counter';

test('should use custom step when incrementing', () => {
  const wrapper = (props) => <CounterStepProvider step={2}>{props.children}</CounterStepProvider>;
  const { result } = renderHook(() => creatCounter(), { wrapper });
  result.increment();
  expect(result.count()).toBe(2);
});
```

## License

MIT
