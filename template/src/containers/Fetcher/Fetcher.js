import React from 'react';
import { useMachine } from '@xstate/react';
import styles from './Fetcher.module.css';
import { fetchMachine } from '../../machines';

export const Fetcher = ({ onResolve, onReject, url }) => {
  const [state, send] = useMachine(fetchMachine, {
    actions: {
      notifySuccess: ctx => onResolve(ctx.data),
      notifyFailure: () => onReject(),
    },
    services: {
      fetchData: (_, e) =>
        fetch(`${e.url}`).then(res => {
          if (res.status !== 200) {
            return Promise.reject({ message: 'Error occured' });
          }
          return res.json();
        }),
    },
  });

  switch (state.value) {
    case 'idle':
      return (
        <button
          className={styles.button}
          onClick={() => send('FETCH', { url })}
        >
          Search
        </button>
      );
    case 'loading':
      return <div>Searching...</div>;
    case 'success':
      return (
        <>
          <button
            className={styles.button}
            onClick={() => send('FETCH', { url })}
          >
            Search
          </button>
          <div className={styles.success}>Success!</div>
        </>
      );
    case 'failure':
      return (
        <>
          <button
            className={styles.button}
            onClick={() => send('RETRY', { url })}
          >
            Retry
          </button>
          <p className={styles.error}>{state.context.error.message}</p>
        </>
      );
    default:
      return null;
  }
};
