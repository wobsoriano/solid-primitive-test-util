import { createSignal } from 'solid-js';
import { test, expect, describe } from 'vitest';
import renderPrimitive from '../src';

const useCounter = () => {
  const [count, setCount] = createSignal(0);
  return {
    count,
    setCount,
  };
};

describe('createSignal tests', () => {
  test('should use signal value', () => {
    const { result } = renderPrimitive(() => useCounter());
    expect(result.count()).toBe(0);
  });

  test('should update signal value when using setter', () => {
    const { result } = renderPrimitive(() => useCounter());
    result.setCount(1);
    expect(result.count()).toBe(1);
  });
});
