import { createResource } from 'solid-js';
import renderPrimitive from '..';
import nock from 'nock';
import { waitFor } from 'solid-testing-library';

const useTodo = () => {
  const [data] = createResource(() =>
    fetch('https://jsonplaceholder.typicode.com/todos/1').then((res) => res.json()),
  );

  return {
    data,
  };
};

describe('createResource tests', () => {
  test('resource', async () => {
    const expectation = nock('https://jsonplaceholder.typicode.com').get('/todos/1').reply(200, {
      userId: 1,
      id: 1,
      title: 'delectus aut autem',
      completed: false,
    });

    const { result } = renderPrimitive(() => useTodo());

    await waitFor(() => {
      expect(result.data()).toMatchObject({
        userId: 1,
        id: 1,
        title: 'delectus aut autem',
        completed: false,
      });
    });

    expectation.done();
  });
});
