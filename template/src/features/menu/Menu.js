import React from 'react';
import { useMachine } from '@xstate/react';
import { fetchMachine } from './fetchMachine';
import styles from './Menu.module.css';

export function Menu() {
  const [state, send] = useMachine(fetchMachine);

  const isLoading = state.value === "loading";
  const isError = state.value === "failure";

  const fetchData = (failure) => send("FETCH", { failure });
  const retryFetchData = () => send("RETRY");

  return (
    <div>
      <p className={styles.heading}>Menu</p>
      {isLoading ? <p>Loading...</p> :
        state?.context.results.map(({ text }, index) => 
          <div key={index} className={styles.row}>
            <p>{index + 1}. {text}</p>
          </div>
        )}
      {isError && <p className={styles.error}>{state.context.message}</p>}
      <div className={styles.row}>
        <button
          disabled={isError}
          className={styles.button}
          onClick={() => fetchData(false)}
          >
          Load ✅
        </button>
        <button
          disabled={isError}
          className={styles.button}
          onClick={() => fetchData(true)}
        >
          Load ❌
        </button>
        <button
          disabled={!isError}
          className={styles.button}
          onClick={retryFetchData}
        >
          Retry 🔁
        </button>
      </div>
    </div>
  );
}
