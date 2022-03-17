import { createSignal } from 'solid-js';
import renderPrimitive from '..';

const testPrimitive = () => {
  const [count, setCount] = createSignal(0);
  return {
    count,
    setCount,
  };
};

describe('createSignal tests', () => {
  it('should use signal value', () => {
    const { result } = renderPrimitive(() => testPrimitive());
    expect(result.count()).toBe(0);
  });

  it('should update signal value when using setter', () => {
    const { result } = renderPrimitive(() => testPrimitive());
    result.setCount(1);
    expect(result.count()).toBe(1);
  });
});
