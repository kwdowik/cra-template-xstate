import { Machine, assign } from 'xstate';

const context = {
  data: undefined,
  error: undefined,
};

export const fetchMachine = Machine({
  id: 'fetch',
  initial: 'idle',
  context,
  states: {
    idle: {
      on: { FETCH: 'loading' },
    },
    loading: {
      invoke: {
        src: 'fetchData',
        onDone: {
          target: 'success',
          actions: assign({
            data: (_, event) => event.data,
          }),
        },
        onError: {
          target: 'failure',
          actions: assign({
            error: (_, event) => {
              return event.data;
            },
          }),
        },
      },
    },
    success: {
      entry: 'notifySuccess',
      on: {
        FETCH: 'loading',
      },
    },
    failure: {
      entry: 'notifyFailure',
      on: {
        RETRY: 'loading',
      },
    },
  },
});
