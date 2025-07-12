import React, { useState, useMemo } from 'react';
import { useApp } from '../../contexts/AppContext';
import { Search, Filter, MapPin, Star, Clock, MessageSquare } from 'lucide-react';
import { User } from '../../types';

export function SkillsBrowser() {
  const { users, currentUser, createSwapRequest } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showSwapModal, setShowSwapModal] = useState(false);

  const publicUsers = users.filter(user => 
    user.isPublic && 
    !user.isBanned && 
    user.id !== currentUser?.id
  );

  const filteredUsers = useMemo(() => {
    return publicUsers.filter(user => {
      const matchesSearch = user.skillsOffered.some(skill =>
        skill.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        skill.category.toLowerCase().includes(searchTerm.toLowerCase())
      ) || user.name.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory = selectedCategory === 'all' || 
        user.skillsOffered.some(skill => skill.category === selectedCategory);

      return matchesSearch && matchesCategory;
    });
  }, [publicUsers, searchTerm, selectedCategory]);

  const categories = useMemo(() => {
    const allCategories = new Set<string>();
    publicUsers.forEach(user => {
      user.skillsOffered.forEach(skill => {
        allCategories.add(skill.category);
      });
    });
    return Array.from(allCategories);
  }, [publicUsers]);

  const handleRequestSwap = (targetUser: User, offeredSkillId: string, requestedSkillId: string, message: string) => {
    if (!currentUser) return;

    createSwapRequest({
      requesterId: currentUser.id,
      receiverId: targetUser.id,
      offeredSkillId,
      requestedSkillId,
      message,
      status: 'pending'
    });

    setShowSwapModal(false);
    setSelectedUser(null);
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Browse Skills</h1>
        <p className="text-gray-600">Find people with skills you want to learn</p>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search skills or people..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUsers.map(user => (
          <div key={user.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{user.name}</h3>
                  {user.location && (
                    <div className="flex items-center text-gray-600 text-sm mt-1">
                      <MapPin className="h-4 w-4 mr-1" />
                      {user.location}
                    </div>
                  )}
                </div>
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 mr-1" />
                  <span className="text-sm font-medium">{user.rating.toFixed(1)}</span>
                  <span className="text-gray-500 text-sm ml-1">({user.totalRatings})</span>
                </div>
              </div>

              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Skills Offered:</h4>
                <div className="flex flex-wrap gap-2">
                  {user.skillsOffered.slice(0, 3).map(skill => (
                    <span
                      key={skill.id}
                      className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                    >
                      {skill.name}
                    </span>
                  ))}
                  {user.skillsOffered.length > 3 && (
                    <span className="text-xs text-gray-500">+{user.skillsOffered.length - 3} more</span>
                  )}
                </div>
              </div>

              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Available:</h4>
                <div className="flex items-center text-gray-600 text-sm">
                  <Clock className="h-4 w-4 mr-1" />
                  {user.availability.slice(0, 2).map(a => a.day).join(', ')}
                </div>
              </div>

              <button
                onClick={() => setSelectedUser(user)}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
              >
                <MessageSquare className="h-4 w-4" />
                <span>Request Swap</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredUsers.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Search className="h-12 w-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No users found</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria</p>
        </div>
      )}

      {/* Swap Request Modal */}
      {selectedUser && (
        <SwapRequestModal
          targetUser={selectedUser}
          currentUser={currentUser!}
          onClose={() => setSelectedUser(null)}
          onSubmit={handleRequestSwap}
        />
      )}
    </div>
  );
}

interface SwapRequestModalProps {
  targetUser: User;
  currentUser: User;
  onClose: () => void;
  onSubmit: (targetUser: User, offeredSkillId: string, requestedSkillId: string, message: string) => void;
}

function SwapRequestModal({ targetUser, currentUser, onClose, onSubmit }: SwapRequestModalProps) {
  const [selectedOfferedSkill, setSelectedOfferedSkill] = useState('');
  const [selectedRequestedSkill, setSelectedRequestedSkill] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedOfferedSkill && selectedRequestedSkill && message.trim()) {
      onSubmit(targetUser, selectedOfferedSkill, selectedRequestedSkill, message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Request Skill Swap with {targetUser.name}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                I offer:
              </label>
              <select
                value={selectedOfferedSkill}
                onChange={(e) => setSelectedOfferedSkill(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Select a skill you offer</option>
                {currentUser.skillsOffered.map(skill => (
                  <option key={skill.id} value={skill.id}>{skill.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                I want to learn:
              </label>
              <select
                value={selectedRequestedSkill}
                onChange={(e) => setSelectedRequestedSkill(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Select a skill to learn</option>
                {targetUser.skillsOffered.map(skill => (
                  <option key={skill.id} value={skill.id}>{skill.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Message:
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Introduce yourself and explain why you'd like to swap skills..."
                required
              />
            </div>

            <div className="flex space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Send Request
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}