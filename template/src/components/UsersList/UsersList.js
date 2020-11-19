import React from 'react';

export const UsersList = ({ users }) => {
  if (!users) {
    return null;
  }
  return users.map((user, index) => (
    <div key={user.id}>
      <p>
        {index + 1}. {user.name}
      </p>
    </div>
  ));
};
