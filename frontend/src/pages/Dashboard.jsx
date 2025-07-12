/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import Navbar from '../components/layout/Navbar';

const mockUsers = [
  { id: 1, name: 'Ankur Das', email: 'ankur@example.com' },
  { id: 2, name: 'Riya Singh', email: 'riya@example.com' },
  { id: 3, name: 'Aman Khan', email: 'aman@example.com' },
];

export default function Dashboard() {
  const { user } = useUser();
  const [search, setSearch] = useState('');

  const filteredUsers = mockUsers.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white-100 flex flex-col">
      {/* Top Navbar */}
      <Navbar />

      {/* Full height container below navbar */}
      <div className="flex-1 px-6 py-6 flex flex-col">
        {/* Top-right search bar */}
        <div className="flex justify-end mb-4">
          <input
            type="text"
            placeholder="Search by name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-xs border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Cards area - scrollable if overflow */}
        <div className="flex-1 overflow-y-auto space-y-4">
          {filteredUsers.map((u) => (
            <div key={u.id} className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="font-bold text-gray-800 text-lg">{u.name}</h3>
              <p className="text-sm text-gray-600">{u.email}</p>
            </div>
          ))}

          {filteredUsers.length === 0 && (
            <p className="text-gray-500 text-center">No users found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
