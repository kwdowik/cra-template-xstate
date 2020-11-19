import React, { useState } from 'react';
import styles from './Users.module.css';
import { Fetcher } from '../Fetcher';
import { UsersList } from '../../components';

const API_URL = 'https://jsonplaceholder.typicode.com/users';
const INVALID_URL = '';

export function Users() {
  const [data, setData] = useState([]);
  const [url, setUrl] = useState(API_URL);

  const handleChange = event => {
    if (event.target.checked) {
      setUrl(INVALID_URL);
    } else {
      setUrl(API_URL);
    }
  };

  return (
    <div className={styles.wrapper}>
      <p className={styles.heading}>Users</p>
      <input
        className={styles.checkbox}
        onChange={handleChange}
        type="checkbox"
      />
      Invalid request
      <Fetcher
        onReject={() => setData([])}
        onResolve={data => setData(data)}
        url={url}
      />
      <UsersList users={data} />
    </div>
  );
}
