import { useEffect, useState } from "react";
import API from "../api/api";

export default function Users() {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const res = await API.get("/users");
      setUsers(res.data);
    } catch (err) {
      alert("Gagal mengambil data");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <h2>Daftar Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user.ID}>
            {user.name} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}
