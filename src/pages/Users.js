import { useEffect, useState } from "react";
import API from "../api/api";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", password: "" });

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

  const handleDelete = async (id) => {
    try {
      await API.delete(`/users/${id}`);
      fetchUsers();
    } catch (err) {
      alert("Gagal hapus user");
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user.id); // gunakan "id", bukan "ID"
    setForm({ name: user.name, email: user.email, password: "" });
  };

  const handleUpdate = async () => {
    console.log("Updating user:", editingUser, form);
    try {
      await API.put(`/users/${editingUser}`, form);
      setEditingUser(null);
      setForm({ name: "", email: "", password: "" });
      fetchUsers();
    } catch (err) {
      alert("Gagal update user");
    }
  };

  const handleCreate = async () => {
    try {
      await API.post("/users", form);
      setForm({ name: "", email: "", password: "" });
      fetchUsers();
    } catch (err) {
      alert("Gagal tambah user");
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Daftar Users</h2>

      <ul className="mb-4 space-y-2">
        {users.map((user) => (
          <li
            key={user.id}
            className="flex justify-between items-center p-2 border rounded"
          >
            <span>
              {user.name} - {user.email}
            </span>
            <div className="space-x-2">
              <button
                className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded"
                onClick={() => handleEdit(user)}
              >
                Edit
              </button>
              <button
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                onClick={() => handleDelete(user.id)}
              >
                Hapus
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className="space-y-2">
        <input
          className="border w-full px-3 py-2 rounded"
          placeholder="Nama"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          className="border w-full px-3 py-2 rounded"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          className="border w-full px-3 py-2 rounded"
          placeholder="Password"
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        {editingUser ? (
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded w-full"
            onClick={handleUpdate}
          >
            Update User
          </button>
        ) : (
          <button
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded w-full"
            onClick={handleCreate}
          >
            Tambah User
          </button>
        )}
        <button
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/login";
          }}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded w-full"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
