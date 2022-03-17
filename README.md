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
  const inc = () => setCount((prev) => prev + 1);
  return { count, inc };
};
```

You can test it by wrapping with `renderPrimitive` helper. The return value of `renderPrimitive` includes result property that is the result of the primitive function:

```tsx
import { renderPrimitive } from 'solid-primitive-test-util';
import { createCounter } from './counter';

test('should increment count', () => {
  const { result } = renderPrimitive(() => createCounter());

  expect(result.count()).toBe(0);
  result.inc();
  expect(result.count()).toBe(1);
});
```
