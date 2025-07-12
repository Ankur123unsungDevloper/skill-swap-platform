import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/layout/Navbar';

export default function Profile() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`/api/users/${id}`); // Endpoint to be created in backend
        setUser(res.data.data.user);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (!user) return <div className="text-center py-10">User not found</div>;

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="bg-white rounded shadow p-6">
          <h1 className="text-2xl font-bold mb-4">{user.name}</h1>
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Location:</strong> {user.location}</p>
          <p><strong>Level:</strong> {user.level}</p>
          <p><strong>Skills Offered:</strong> {user.skillsOffered?.join(', ')}</p>
          <p><strong>Skills Wanted:</strong> {user.skillsWanted?.join(', ')}</p>
          <p><strong>Availability:</strong> {user.availability}</p>
        </div>
      </div>
    </div>
  );
}