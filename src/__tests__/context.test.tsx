import { createContext, useContext } from 'solid-js';
import renderPrimitive from '..';

const ThemeContext = createContext({ color: 'red' });

const testPrimitive = () => {
  const value = useContext(ThemeContext);
  return value;
};

describe('context test', () => {
  it('should get context value', () => {
    const { result } = renderPrimitive(() => testPrimitive());
    expect(result).toEqual({ color: 'red' });
  });

  it('should get current context value when provider overrides value', () => {
    const newTheme = { color: 'blue' };
    const { result } = renderPrimitive(() => testPrimitive(), {
      wrapper: (props) => {
        return (
          <ThemeContext.Provider value={{ color: 'blue' }}>{props.children}</ThemeContext.Provider>
        );
      },
    });
    expect(result).toEqual(newTheme);
  });
});
