import React from "react";

export default function UsersList({ users, onSelectUser, currentUserId }) {
  return (
    <aside className="users">
      <h3>Online ({users.length})</h3>
      <ul>
        {users.map((u) => (
          <li key={u.id} className={u.id === currentUserId ? "me" : ""}>
            <button onClick={() => onSelectUser(u)}>{u.username}</button>
          </li>
        ))}
      </ul>
    </aside>
  );
}
