import { createResource } from 'solid-js';
import renderPrimitive from '..';
import { waitFor } from 'solid-testing-library';
import nock from 'nock';

const basePath = 'https://jsonplaceholder.typicode.com';
const path = '/todos/1';
const data = {
  userId: 1,
  id: 1,
  title: 'delectus aut asutem',
  completed: false,
};

const testPrimitive = () => {
  const [data] = createResource(() => fetch(`${basePath}${path}`).then((res) => res.json()));

  return {
    data,
  };
};

describe('createResource tests', () => {
  it('should return correct data', async () => {
    const expectation = nock(basePath).get(path).reply(200, data);
    const { result } = renderPrimitive(() => testPrimitive());
    await waitFor(() => {
      expect(result.data()).toEqual(data);
    });
    expectation.done();
  });
});
