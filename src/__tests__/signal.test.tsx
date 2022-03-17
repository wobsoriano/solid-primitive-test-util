import { createSignal } from 'solid-js';
import renderPrimitive from '..';

const useCounter = () => {
  const [count, setCount] = createSignal(0);
  return {
    count,
    setCount,
  };
};

describe('createSignal tests', () => {
  it('should use signal value', () => {
    const { result } = renderPrimitive(() => useCounter());
    expect(result.count()).toBe(0);
  });

  it('should update signal value when using setter', () => {
    const { result } = renderPrimitive(() => useCounter());
    result.setCount(1);
    expect(result.count()).toBe(1);
  });
});
