import { Component, createContext, useContext } from 'solid-js';
import { test, expect } from 'vitest';
import renderPrimitive from '../src';
import { createStore } from 'solid-js/store';

const CounterContext = createContext<
  [
    { count: number },
    {
      increment?: () => void;
      decrement?: () => void;
    },
  ]
>([{ count: 0 }, {}]);

const CounterProvider: Component<{ count?: number }> = (props) => {
  const [state, setState] = createStore({ count: props.count || 0 });
  const store = [
    state,
    {
      increment() {
        setState('count', (c) => c + 1);
      },
      decrement() {
        setState('count', (c) => c - 1);
      },
    },
  ];

  // @ts-ignore
  return <CounterContext.Provider value={store}>{props.children}</CounterContext.Provider>;
};

test('context', () => {
  const { result } = renderPrimitive(() => useContext(CounterContext), {
    wrapper: CounterProvider,
  });

  const [state, { increment, decrement }] = result;

  expect(state.count).toEqual(0);
  increment();
  increment();
  expect(state.count).toEqual(2);
  decrement();
  expect(state.count).toEqual(1);
});
