"use client";

import { useEffect, useState } from 'react';
import { User } from '@/types/user';

const ManageUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch('/api/fetch-users')
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log('Fetched users:', data);  // Log fetched data
        setUsers(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
        setLoading(false);
      });
  }, []);

  const deleteUser = async (id: string) => {
    try {
      await fetch(`/api/users/${id}`, { method: 'DELETE' });
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const archiveUser = async (id: string, archived: boolean) => {
    try {
      const response = await fetch(`/api/users/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ archived }),
      });
      const updatedUser = await response.json();
      setUsers(users.map((user) => (user.id === id ? updatedUser : user)));
    } catch (error) {
      console.error('Error archiving user:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Manage Users</h1>
      {loading ? (
        <div className="text-center text-gray-500">Loading...</div>
      ) : users.length > 0 ? (
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2">Name</th>
              <th className="py-2">Email</th>
              <th className="py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td className="py-2">{user.firstName} {user.lastName}</td>
                <td className="py-2">{user.email}</td>
                <td className="py-2 flex space-x-4">
                  <button
                    onClick={() => archiveUser(user.id, !user.archived)}
                    className={`py-2 px-4 rounded ${
                      user.archived ? 'bg-green-500' : 'bg-yellow-500'
                    } text-white hover:bg-opacity-75`}
                  >
                    {user.archived ? 'Unarchive' : 'Archive'}
                  </button>
                  <button
                    onClick={() => deleteUser(user.id)}
                    className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="text-center text-gray-500">No users available</div>
      )}
    </div>
  );
};

export default ManageUsers;
