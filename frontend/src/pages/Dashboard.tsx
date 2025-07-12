/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useUser } from '@clerk/clerk-react';
import Navbar from '../components/layout/Navbar';

export default function Dashboard() {
  const { user } = useUser();
  const [search, setSearch] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get('/api/users'); // Replace with actual search endpoint if needed
        setUsers(res.data.data.users || []);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white-100 flex flex-col">
      <Navbar />
      <div className="flex-1 px-6 py-6 flex flex-col">
        <div className="flex justify-end mb-4 gap-2">
          <input
            type="text"
            placeholder="Search by name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-xs border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Search
          </button>
        </div>

        <div className="flex-1 overflow-y-auto space-y-4">
          {loading ? (
            <p>Loading users...</p>
          ) : filteredUsers.length === 0 ? (
            <p className="text-gray-500 text-center">No users found.</p>
          ) : (
            filteredUsers.map((u) => (
              <Link key={u._id} to={`/profile/${u._id}`}>
                <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md cursor-pointer">
                  <h3 className="font-bold text-gray-800 text-lg">{u.name}</h3>
                  <p className="text-sm text-gray-600">{u.email}</p>
                  <p className="text-xs text-gray-500 italic">{u.skillsOffered.join(', ')}</p>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
