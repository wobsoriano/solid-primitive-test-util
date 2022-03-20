import { createResource } from 'solid-js';
import renderPrimitive from '..';
import { waitFor } from 'solid-testing-library';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

const testPrimitive = () => {
  const [data] = createResource(() => fetch('http://example.com/todos').then((res) => res.json()));

  return {
    data,
  };
};

const testData = [
  {
    id: 1,
    title: 'buy milk',
    completed: false,
  },
  {
    id: 2,
    title: 'clean desk',
    completed: true,
  },
];

const server = setupServer(
  rest.get('http://example.com/todos', (req, res, ctx) => {
    return res(
      ctx.json({
        data: testData,
      }),
    );
  }),
);

describe('createResource tests', () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('should return correct data', async () => {
    const { result } = renderPrimitive(() => testPrimitive());
    await waitFor(() => {
      expect(result.data()).toEqual({
        data: testData,
      });
    });
  });
});
