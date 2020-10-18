import { Machine, assign } from 'xstate';

const fetchMachine = Machine({
  id: 'fetch',
  initial: 'idle',
  context: {
    results: [],
    message: '',
  },
  states: {
    idle: {
      on: {
        FETCH: 'loading'
      }
    },
    loading: {
      invoke: {
        src: 'fetchData',
        onDone: { target: "success" },
        onError: { target: "failure" },
      },
    },
    success: {
      entry: ["setResults"],
      on: {
        FETCH: "loading",
      },
    },
    failure: {
      entry: ["setMessage"],
      on: {
        RETRY: 'loading',
      }
    }
  },
},
{
  services: {
    fetchData: async (ctx, event) => {
      const resp = await request(response, event.failure)
      return resp.data;
    },
  },
  actions: {
    setResults: assign((ctx, event) => ({
      message: '',
      results: event.data
    })),
    setMessage: assign((ctx, event) => ({
      message: event.data,
      results: []
    })),
  },
}
);

const response = {
  data: [
    {
      id: 1,
      text: 'Chocolate 🍫'
    },
    {
      id: 2,
      text: 'Cookie 🍪'
    },
    {
      id: 3,
      text: 'Doughnut 🍩'
    },
  ]
};

const request = (response, failure) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (failure) {
        reject('Cannot load menu, please retry.')
      }
      resolve(response); 
    }, 2000)
  })
}

export { fetchMachine }
