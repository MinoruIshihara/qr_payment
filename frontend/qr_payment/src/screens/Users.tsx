import { getUsers, postUser, User } from "api/user";
import { useEffect, useState } from "react";

export const Users = () => {
  const [users, setUsers] = useState([] as User[]);
  const [newUserName, setNewUserName] = useState("");

  useEffect(() => {
    const fetch = async () => {
      const response = await getUsers();
      if (response) {
        setUsers(response);
      }
    };
    fetch();
  }, []);

  const handleRegister = () => {
    const fetch = async () => {
      const postRes = await postUser(newUserName);
      const getRes = await getUsers();
      if (getRes) {
        setUsers(getRes);
      }
    };
    fetch();
  };

  return (
    <div>
      <h2>ユーザー一覧</h2>
      <ul>
        {users.map((user, index) => (
          <li key={index}>
            {user.Name} : {user.ID}
          </li>
        ))}
      </ul>
      <input
        type="text"
        className="border border-gray-300 rounded px-3 py-2" // Tailwind CSSでスタイルを適用
        value={newUserName}
        onChange={(e) => {
          setNewUserName(e.target.value);
        }}
      />
      <button onClick={handleRegister}>新規作成</button>
    </div>
  );
};
