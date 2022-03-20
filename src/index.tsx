import type { Component, JSXElement } from 'solid-js';
import { render } from 'solid-testing-library';
import { Suspense } from 'solid-js';

const PrimitiveComponent: Component<{
  primitive: () => any;
  updatePrimitive: (payload: any) => void;
  render?: ({ hook }: { hook: any }) => JSXElement;
}> = (props) => {
  const current = props.primitive();
  props.updatePrimitive(current);
  return props.render ? props.render({ hook: current }) : null;
};

const FallbackComponent: Component = () => null;

interface RenderOption<T> {
  render?: ({ hook }: { hook: T }) => JSXElement;
  wrapper?: Component;
}

export function renderPrimitive<T>(primitive: () => T, option: RenderOption<T> = {}) {
  let currentPrimitive: T;

  const updatePrimitive = function (val: T) {
    currentPrimitive = val;
  };

  const getComponent = (componentOption: RenderOption<T>) => {
    const PlaceholderComponent: Component = (props) => <>{props.children}</>;
    const WrapperComponent = componentOption.wrapper
      ? componentOption.wrapper
      : PlaceholderComponent;

    function Component() {
      return (
        <WrapperComponent>
          <Suspense fallback={<FallbackComponent />}>
            <PrimitiveComponent
              primitive={primitive}
              updatePrimitive={updatePrimitive}
              render={componentOption.render}
            />
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

export default renderPrimitive;
