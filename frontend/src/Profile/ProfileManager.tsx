import React, { useState } from 'react';
import { useApp } from '../../contexts/AppContext';
import { Plus, Edit2, Trash2, MapPin, Clock, Globe, Lock } from 'lucide-react';
import { Skill, Availability } from '../../types';

export function ProfileManager() {
  const { currentUser, updateProfile } = useApp();
  const [isEditing, setIsEditing] = useState(false);
  const [showSkillModal, setShowSkillModal] = useState<'offered' | 'wanted' | null>(null);
  const [showAvailabilityModal, setShowAvailabilityModal] = useState(false);

  if (!currentUser) return null;

  const handleProfileUpdate = (field: string, value: any) => {
    updateProfile({ [field]: value });
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">My Profile</h1>
        <p className="text-gray-600">Manage your skills and availability</p>
      </div>

      {/* Basic Info */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Basic Information</h2>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center space-x-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
          >
            <Edit2 className="h-4 w-4" />
            <span>{isEditing ? 'Save' : 'Edit'}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
            {isEditing ? (
              <input
                type="text"
                value={currentUser.name}
                onChange={(e) => handleProfileUpdate('name', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            ) : (
              <p className="text-gray-900">{currentUser.name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
            {isEditing ? (
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={currentUser.location || ''}
                  onChange={(e) => handleProfileUpdate('location', e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="City, State"
                />
              </div>
            ) : (
              <div className="flex items-center text-gray-900">
                <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                {currentUser.location || 'Not specified'}
              </div>
            )}
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Profile Visibility</label>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => handleProfileUpdate('isPublic', true)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  currentUser.isPublic 
                    ? 'bg-green-100 text-green-800 border border-green-200' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Globe className="h-4 w-4" />
                <span>Public</span>
              </button>
              <button
                onClick={() => handleProfileUpdate('isPublic', false)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  !currentUser.isPublic 
                    ? 'bg-red-100 text-red-800 border border-red-200' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Lock className="h-4 w-4" />
                <span>Private</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Skills Offered */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Skills I Offer</h2>
          <button
            onClick={() => setShowSkillModal('offered')}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span>Add Skill</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {currentUser.skillsOffered.map(skill => (
            <SkillCard
              key={skill.id}
              skill={skill}
              onEdit={() => {/* Implement edit */}}
              onDelete={() => {/* Implement delete */}}
            />
          ))}
          {currentUser.skillsOffered.length === 0 && (
            <p className="text-gray-500 col-span-2">No skills added yet</p>
          )}
        </div>
      </div>

      {/* Skills Wanted */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Skills I Want to Learn</h2>
          <button
            onClick={() => setShowSkillModal('wanted')}
            className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span>Add Skill</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {currentUser.skillsWanted.map(skill => (
            <SkillCard
              key={skill.id}
              skill={skill}
              onEdit={() => {/* Implement edit */}}
              onDelete={() => {/* Implement delete */}}
            />
          ))}
          {currentUser.skillsWanted.length === 0 && (
            <p className="text-gray-500 col-span-2">No skills added yet</p>
          )}
        </div>
      </div>

      {/* Availability */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Availability</h2>
          <button
            onClick={() => setShowAvailabilityModal(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            <Clock className="h-4 w-4" />
            <span>Manage Availability</span>
          </button>
        </div>

        <div className="space-y-3">
          {currentUser.availability.map((avail, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <span className="font-medium text-gray-900">{avail.day}</span>
                <span className="text-gray-600 ml-2">
                  {avail.timeSlots.join(', ')}
                </span>
              </div>
            </div>
          ))}
          {currentUser.availability.length === 0 && (
            <p className="text-gray-500">No availability set</p>
          )}
        </div>
      </div>

      {/* Modals */}
      {showSkillModal && (
        <SkillModal
          type={showSkillModal}
          onClose={() => setShowSkillModal(null)}
          onSubmit={(skill) => {
            const field = showSkillModal === 'offered' ? 'skillsOffered' : 'skillsWanted';
            const currentSkills = currentUser[field];
            handleProfileUpdate(field, [...currentSkills, { ...skill, id: Date.now().toString() }]);
            setShowSkillModal(null);
          }}
        />
      )}

      {showAvailabilityModal && (
        <AvailabilityModal
          availability={currentUser.availability}
          onClose={() => setShowAvailabilityModal(false)}
          onSubmit={(availability) => {
            handleProfileUpdate('availability', availability);
            setShowAvailabilityModal(false);
          }}
        />
      )}
    </div>
  );
}

interface SkillCardProps {
  skill: Skill;
  onEdit: () => void;
  onDelete: () => void;
}

function SkillCard({ skill, onEdit, onDelete }: SkillCardProps) {
  return (
    <div className="border border-gray-200 rounded-lg p-4">
      <div className="flex items-start justify-between mb-2">
        <h3 className="font-medium text-gray-900">{skill.name}</h3>
        <div className="flex space-x-1">
          <button
            onClick={onEdit}
            className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
          >
            <Edit2 className="h-4 w-4" />
          </button>
          <button
            onClick={onDelete}
            className="p-1 text-gray-400 hover:text-red-600 transition-colors"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
      <div className="flex items-center space-x-2 mb-2">
        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
          {skill.category}
        </span>
        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
          {skill.level}
        </span>
      </div>
      <p className="text-sm text-gray-600">{skill.description}</p>
    </div>
  );
}

interface SkillModalProps {
  type: 'offered' | 'wanted';
  onClose: () => void;
  onSubmit: (skill: Omit<Skill, 'id'>) => void;
}

function SkillModal({ type, onClose, onSubmit }: SkillModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: '',
    level: 'Beginner' as const
  });

  const categories = ['Programming', 'Design', 'Marketing', 'Writing', 'Music', 'Languages', 'Other'];
  const levels = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ ...formData, isApproved: true });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Add {type === 'offered' ? 'Skill I Offer' : 'Skill I Want to Learn'}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Skill Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., Photoshop, Python, Guitar"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Select a category</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Level</label>
              <select
                value={formData.level}
                onChange={(e) => setFormData(prev => ({ ...prev, level: e.target.value as any }))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {levels.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                rows={3}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Brief description of your experience or what you want to learn..."
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
                Add Skill
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

interface AvailabilityModalProps {
  availability: Availability[];
  onClose: () => void;
  onSubmit: (availability: Availability[]) => void;
}

function AvailabilityModal({ availability, onClose, onSubmit }: AvailabilityModalProps) {
  const [availabilityData, setAvailabilityData] = useState(availability);

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Weekends', 'Evenings'];
  const timeSlots = ['Morning', 'Afternoon', 'Evening', '6-8 PM', '8-10 PM', 'Flexible'];

  const handleDayToggle = (day: string) => {
    setAvailabilityData(prev => {
      const existing = prev.find(a => a.day === day);
      if (existing) {
        return prev.filter(a => a.day !== day);
      } else {
        return [...prev, { day, timeSlots: [] }];
      }
    });
  };

  const handleTimeSlotToggle = (day: string, timeSlot: string) => {
    setAvailabilityData(prev => {
      return prev.map(avail => {
        if (avail.day === day) {
          const hasSlot = avail.timeSlots.includes(timeSlot);
          return {
            ...avail,
            timeSlots: hasSlot 
              ? avail.timeSlots.filter(slot => slot !== timeSlot)
              : [...avail.timeSlots, timeSlot]
          };
        }
        return avail;
      });
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(availabilityData.filter(a => a.timeSlots.length > 0));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-lg w-full max-h-[80vh] overflow-y-auto">
        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Manage Availability</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {days.map(day => {
              const dayAvail = availabilityData.find(a => a.day === day);
              const isSelected = !!dayAvail;

              return (
                <div key={day} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center mb-3">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => handleDayToggle(day)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label className="ml-2 font-medium text-gray-900">{day}</label>
                  </div>

                  {isSelected && (
                    <div className="ml-6 space-y-2">
                      <p className="text-sm text-gray-600 mb-2">Select time slots:</p>
                      <div className="grid grid-cols-2 gap-2">
                        {timeSlots.map(slot => (
                          <label key={slot} className="flex items-center">
                            <input
                              type="checkbox"
                              checked={dayAvail?.timeSlots.includes(slot) || false}
                              onChange={() => handleTimeSlotToggle(day, slot)}
                              className="h-3 w-3 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <span className="ml-2 text-sm text-gray-700">{slot}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

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
                Save Availability
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}