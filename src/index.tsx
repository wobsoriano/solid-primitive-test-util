import type { Component } from 'solid-js';
import { render } from 'solid-testing-library';
import { Suspense } from 'solid-js';

const HookComponent: Component<{
  hook: () => any;
  updatePrimitive: (payload: any) => void;
}> = (props) => {
  const current = props.hook();
  props.updatePrimitive(current);
  return null;
};

const FallbackComponent: Component = () => null;

interface RenderOption {
  wrapper?: Component;
}

export default function renderPrimitive<T>(hook: () => T, option: RenderOption = {}) {
  let currentPrimitive: T;

  const updatePrimitive = function (val: T) {
    currentPrimitive = val;
  };

  const getComponent = (componentOption: RenderOption) => {
    const PlaceholderComponent: Component = (props) => <>{props.children}</>;
    const WrapperComponent = componentOption.wrapper
      ? componentOption.wrapper
      : PlaceholderComponent;

    function Component() {
      return (
        <WrapperComponent>
          <Suspense fallback={<FallbackComponent />}>
            <HookComponent hook={hook} updatePrimitive={updatePrimitive} />
          </Suspense>
        </WrapperComponent>
      );
    }
    return <Component />;
  };

  const renderResult = render(() => getComponent(option));

  return {
    ...renderResult,
    // @ts-ignore
    result: currentPrimitive,
  };
}
