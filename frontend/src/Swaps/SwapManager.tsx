import React, { useState } from 'react';
import { useApp } from '../../contexts/AppContext';
import { Clock, CheckCircle, XCircle, Trash2, Star, MessageSquare } from 'lucide-react';
import { SwapRequest } from '../../types';

export function SwapManager() {
  const { 
    currentUser, 
    swapRequests, 
    users, 
    respondToSwapRequest, 
    completeSwap, 
    cancelSwapRequest,
    addRating 
  } = useApp();
  
  const [activeTab, setActiveTab] = useState<'pending' | 'active' | 'completed'>('pending');
  const [ratingModal, setRatingModal] = useState<SwapRequest | null>(null);

  if (!currentUser) return null;

  const userSwapRequests = swapRequests.filter(request =>
    request.requesterId === currentUser.id || request.receiverId === currentUser.id
  );

  const pendingRequests = userSwapRequests.filter(request => request.status === 'pending');
  const activeSwaps = userSwapRequests.filter(request => request.status === 'accepted');
  const completedSwaps = userSwapRequests.filter(request => request.status === 'completed');

  const getOtherUser = (request: SwapRequest) => {
    const otherUserId = request.requesterId === currentUser.id ? request.receiverId : request.requesterId;
    return users.find(user => user.id === otherUserId);
  };

  const getSkillName = (skillId: string, userId: string) => {
    const user = users.find(u => u.id === userId);
    const skill = user?.skillsOffered.find(s => s.id === skillId);
    return skill?.name || 'Unknown Skill';
  };

  const handleResponse = (requestId: string, status: 'accepted' | 'rejected') => {
    respondToSwapRequest(requestId, status);
  };

  const handleComplete = (requestId: string) => {
    completeSwap(requestId);
    // Find the request to show rating modal
    const request = swapRequests.find(r => r.id === requestId);
    if (request) {
      setRatingModal(request);
    }
  };

  const handleCancel = (requestId: string) => {
    cancelSwapRequest(requestId);
  };

  const handleRating = (request: SwapRequest, rating: number, feedback: string) => {
    const otherUser = getOtherUser(request);
    if (otherUser) {
      addRating({
        swapRequestId: request.id,
        raterId: currentUser.id,
        ratedUserId: otherUser.id,
        rating,
        feedback
      });
    }
    setRatingModal(null);
  };

  const renderSwapCard = (request: SwapRequest) => {
    const otherUser = getOtherUser(request);
    if (!otherUser) return null;

    const isRequester = request.requesterId === currentUser.id;
    const offeredSkill = getSkillName(request.offeredSkillId, request.requesterId);
    const requestedSkill = getSkillName(request.requestedSkillId, request.receiverId);

    return (
      <div key={request.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {isRequester ? `Request to ${otherUser.name}` : `Request from ${otherUser.name}`}
            </h3>
            <p className="text-gray-600 text-sm">
              {isRequester ? `You offer: ${offeredSkill}` : `They offer: ${offeredSkill}`}
            </p>
            <p className="text-gray-600 text-sm">
              {isRequester ? `You want: ${requestedSkill}` : `They want: ${requestedSkill}`}
            </p>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
            request.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
            request.status === 'accepted' ? 'bg-green-100 text-green-800' :
            request.status === 'completed' ? 'bg-blue-100 text-blue-800' :
            'bg-red-100 text-red-800'
          }`}>
            {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
          </span>
        </div>

        <div className="mb-4">
          <p className="text-gray-700 text-sm">{request.message}</p>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <span>Created: {request.createdAt.toLocaleDateString()}</span>
          {request.respondedAt && (
            <span>Responded: {request.respondedAt.toLocaleDateString()}</span>
          )}
        </div>

        <div className="flex space-x-3">
          {request.status === 'pending' && !isRequester && (
            <>
              <button
                onClick={() => handleResponse(request.id, 'accepted')}
                className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
              >
                <CheckCircle className="h-4 w-4" />
                <span>Accept</span>
              </button>
              <button
                onClick={() => handleResponse(request.id, 'rejected')}
                className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center space-x-2"
              >
                <XCircle className="h-4 w-4" />
                <span>Reject</span>
              </button>
            </>
          )}

          {request.status === 'pending' && isRequester && (
            <button
              onClick={() => handleCancel(request.id)}
              className="flex items-center space-x-2 text-red-600 hover:text-red-700 px-4 py-2 border border-red-300 rounded-lg hover:bg-red-50 transition-colors"
            >
              <Trash2 className="h-4 w-4" />
              <span>Cancel Request</span>
            </button>
          )}

          {request.status === 'accepted' && (
            <button
              onClick={() => handleComplete(request.id)}
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
            >
              <CheckCircle className="h-4 w-4" />
              <span>Mark Complete</span>
            </button>
          )}

          {request.status === 'completed' && (
            <button
              onClick={() => setRatingModal(request)}
              className="flex-1 bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center space-x-2"
            >
              <Star className="h-4 w-4" />
              <span>Rate Experience</span>
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">My Swaps</h1>
        <p className="text-gray-600">Manage your skill exchange requests and activities</p>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-100 rounded-lg p-1 mb-6">
        {[
          { id: 'pending' as const, label: 'Pending', count: pendingRequests.length },
          { id: 'active' as const, label: 'Active', count: activeSwaps.length },
          { id: 'completed' as const, label: 'Completed', count: completedSwaps.length }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {tab.label} ({tab.count})
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="space-y-4">
        {activeTab === 'pending' && pendingRequests.map(renderSwapCard)}
        {activeTab === 'active' && activeSwaps.map(renderSwapCard)}
        {activeTab === 'completed' && completedSwaps.map(renderSwapCard)}
      </div>

      {userSwapRequests.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <MessageSquare className="h-12 w-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No swaps yet</h3>
          <p className="text-gray-600">Start browsing skills to find your first swap!</p>
        </div>
      )}

      {/* Rating Modal */}
      {ratingModal && (
        <RatingModal
          request={ratingModal}
          otherUser={getOtherUser(ratingModal)!}
          onClose={() => setRatingModal(null)}
          onSubmit={handleRating}
        />
      )}
    </div>
  );
}

interface RatingModalProps {
  request: SwapRequest;
  otherUser: any;
  onClose: () => void;
  onSubmit: (request: SwapRequest, rating: number, feedback: string) => void;
}

function RatingModal({ request, otherUser, onClose, onSubmit }: RatingModalProps) {
  const [rating, setRating] = useState(5);
  const [feedback, setFeedback] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(request, rating, feedback);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Rate your experience with {otherUser.name}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rating:
              </label>
              <div className="flex space-x-2">
                {[1, 2, 3, 4, 5].map(star => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className={`p-1 ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
                  >
                    <Star className="h-6 w-6 fill-current" />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Feedback:
              </label>
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                rows={4}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Share your experience..."
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
                Submit Rating
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}