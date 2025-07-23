import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { AppState, User, SwapRequest, Rating, AdminMessage, Skill } from '../types';

interface AppContextValue extends AppState {
  login: (email: string, password: string) => boolean;
  logout: () => void;
  register: (userData: Partial<User>) => boolean;
  updateProfile: (userData: Partial<User>) => void;
  createSwapRequest: (request: Omit<SwapRequest, 'id' | 'createdAt'>) => void;
  respondToSwapRequest: (requestId: string, status: 'accepted' | 'rejected') => void;
  completeSwap: (requestId: string) => void;
  cancelSwapRequest: (requestId: string) => void;
  addRating: (rating: Omit<Rating, 'id' | 'createdAt'>) => void;
  banUser: (userId: string) => void;
  approveSkill: (userId: string, skillId: string) => void;
  rejectSkill: (userId: string, skillId: string) => void;
  createAdminMessage: (message: Omit<AdminMessage, 'id' | 'createdAt'>) => void;
}

const AppContext = createContext<AppContextValue | undefined>(undefined);

// --- Mock Data ---

const mockUsers: User[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    location: 'San Francisco, CA',
    profilePhoto: '',
    skillsOffered: [
      { id: '1', name: 'Photoshop', category: 'Design', description: 'Advanced photo editing and design', level: 'Expert', isApproved: true },
      { id: '2', name: 'UI/UX Design', category: 'Design', description: 'User interface and experience design', level: 'Advanced', isApproved: true }
    ],
    skillsWanted: [
      { id: '3', name: 'Python Programming', category: 'Programming', description: 'Learn Python for data analysis', level: 'Beginner', isApproved: true }
    ],
    availability: [],
    isPublic: true,
    rating: 4.8,
    totalRatings: 15,
    joinDate: new Date('2024-01-15'),
    isBanned: false,
    isAdmin: false
  }
];

const adminUser: User = {
  id: 'admin',
  name: 'Admin User',
  email: 'admin@skillswap.com',
  profilePhoto: '',
  skillsOffered: [],
  skillsWanted: [],
  availability: [],
  isPublic: false,
  rating: 0,
  totalRatings: 0,
  joinDate: new Date('2024-01-01'),
  isBanned: false,
  isAdmin: true
};

const initialState: AppState = {
  currentUser: null,
  users: mockUsers,
  swapRequests: [],
  ratings: [],
  adminMessages: [],
  isLoading: false
};

// --- Reducer ---

type Action = 
  | { type: 'LOGIN'; payload: User }
  | { type: 'LOGOUT' }
  | { type: 'REGISTER'; payload: User }
  | { type: 'UPDATE_PROFILE'; payload: { userId: string; userData: Partial<User> } }
  | { type: 'CREATE_SWAP_REQUEST'; payload: SwapRequest }
  | { type: 'RESPOND_TO_SWAP_REQUEST'; payload: { requestId: string; status: 'accepted' | 'rejected' } }
  | { type: 'COMPLETE_SWAP'; payload: string }
  | { type: 'CANCEL_SWAP_REQUEST'; payload: string }
  | { type: 'ADD_RATING'; payload: Rating }
  | { type: 'BAN_USER'; payload: string }
  | { type: 'APPROVE_SKILL'; payload: { userId: string; skillId: string } }
  | { type: 'REJECT_SKILL'; payload: { userId: string; skillId: string } }
  | { type: 'CREATE_ADMIN_MESSAGE'; payload: AdminMessage };

function appReducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, currentUser: action.payload };

    case 'LOGOUT':
      return { ...state, currentUser: null };

    case 'REGISTER':
      return { ...state, users: [...state.users, action.payload], currentUser: action.payload };

    case 'UPDATE_PROFILE':
      return {
        ...state,
        users: state.users.map(user =>
          user.id === action.payload.userId ? { ...user, ...action.payload.userData } : user
        ),
        currentUser: state.currentUser?.id === action.payload.userId
          ? { ...state.currentUser, ...action.payload.userData }
          : state.currentUser
      };

    case 'CREATE_SWAP_REQUEST':
      return {
        ...state,
        swapRequests: [...state.swapRequests, action.payload]
      };

    case 'RESPOND_TO_SWAP_REQUEST':
      return {
        ...state,
        swapRequests: state.swapRequests.map(request =>
          request.id === action.payload.requestId
            ? { ...request, status: action.payload.status, respondedAt: new Date() }
            : request
        )
      };

    case 'COMPLETE_SWAP':
      return {
        ...state,
        swapRequests: state.swapRequests.map(request =>
          request.id === action.payload ? { ...request, status: 'completed', completedAt: new Date() } : request
        )
      };

    case 'CANCEL_SWAP_REQUEST':
      return {
        ...state,
        swapRequests: state.swapRequests.map(request =>
          request.id === action.payload ? { ...request, status: 'cancelled' } : request
        )
      };

    case 'ADD_RATING':
      const ratingPayload = action.payload;
      const updatedUsers = state.users.map(user => {
        if (user.id === ratingPayload.ratedUserId) {
          const newTotal = user.totalRatings + 1;
          const newRating = ((user.rating * user.totalRatings) + ratingPayload.rating) / newTotal;
          return { ...user, totalRatings: newTotal, rating: newRating };
        }
        return user;
      });

      return {
        ...state,
        ratings: [...state.ratings, ratingPayload],
        users: updatedUsers
      };

    case 'BAN_USER':
      return {
        ...state,
        users: state.users.map(user =>
          user.id === action.payload ? { ...user, isBanned: true } : user
        )
      };

    case 'APPROVE_SKILL':
      return {
        ...state,
        users: state.users.map(user =>
          user.id === action.payload.userId
            ? {
                ...user,
                skillsOffered: user.skillsOffered.map(skill =>
                  skill.id === action.payload.skillId ? { ...skill, isApproved: true } : skill
                )
              }
            : user
        )
      };

    case 'REJECT_SKILL':
      return {
        ...state,
        users: state.users.map(user =>
          user.id === action.payload.userId
            ? {
                ...user,
                skillsOffered: user.skillsOffered.filter(skill =>
                  skill.id !== action.payload.skillId
                )
              }
            : user
        )
      };

    case 'CREATE_ADMIN_MESSAGE':
      return {
        ...state,
        adminMessages: [...state.adminMessages, action.payload]
      };

    default:
      return state;
  }
}

// --- Context Provider ---

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const login = (email: string, password: string): boolean => {
    if (email === 'admin@skillswap.com' && password === 'admin123') {
      dispatch({ type: 'LOGIN', payload: adminUser });
      return true;
    }

    const user = state.users.find(u => u.email === email);
    if (user && !user.isBanned) {
      dispatch({ type: 'LOGIN', payload: user });
      return true;
    }
    return false;
  };

  const logout = () => dispatch({ type: 'LOGOUT' });

  const register = (userData: Partial<User>): boolean => {
    const exists = state.users.find(u => u.email === userData.email);
    if (exists) return false;

    const newUser: User = {
      id: Date.now().toString(),
      name: userData.name || '',
      email: userData.email || '',
      profilePhoto: userData.profilePhoto || '',
      location: userData.location,
      skillsOffered: userData.skillsOffered || [],
      skillsWanted: userData.skillsWanted || [],
      availability: userData.availability || [],
      isPublic: true,
      rating: 0,
      totalRatings: 0,
      joinDate: new Date(),
      isBanned: false,
      isAdmin: false
    };

    dispatch({ type: 'REGISTER', payload: newUser });
    return true;
  };

  const updateProfile = (userData: Partial<User>) => {
    if (state.currentUser) {
      dispatch({
        type: 'UPDATE_PROFILE',
        payload: { userId: state.currentUser.id, userData }
      });
    }
  };

  const createSwapRequest = (request: Omit<SwapRequest, 'id' | 'createdAt'>) => {
    const newRequest: SwapRequest = {
      ...request,
      id: Date.now().toString(),
      createdAt: new Date()
    };
    dispatch({ type: 'CREATE_SWAP_REQUEST', payload: newRequest });
  };

  const respondToSwapRequest = (requestId: string, status: 'accepted' | 'rejected') =>
    dispatch({ type: 'RESPOND_TO_SWAP_REQUEST', payload: { requestId, status } });

  const completeSwap = (requestId: string) =>
    dispatch({ type: 'COMPLETE_SWAP', payload: requestId });

  const cancelSwapRequest = (requestId: string) =>
    dispatch({ type: 'CANCEL_SWAP_REQUEST', payload: requestId });

  const addRating = (rating: Omit<Rating, 'id' | 'createdAt'>) => {
    const newRating: Rating = {
      ...rating,
      id: Date.now().toString(),
      createdAt: new Date()
    };
    dispatch({ type: 'ADD_RATING', payload: newRating });
  };

  const banUser = (userId: string) =>
    dispatch({ type: 'BAN_USER', payload: userId });

  const approveSkill = (userId: string, skillId: string) =>
    dispatch({ type: 'APPROVE_SKILL', payload: { userId, skillId } });

  const rejectSkill = (userId: string, skillId: string) =>
    dispatch({ type: 'REJECT_SKILL', payload: { userId, skillId } });

  const createAdminMessage = (message: Omit<AdminMessage, 'id' | 'createdAt'>) => {
    const newMessage: AdminMessage = {
      ...message,
      id: Date.now().toString(),
      createdAt: new Date()
    };
    dispatch({ type: 'CREATE_ADMIN_MESSAGE', payload: newMessage });
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        login,
        logout,
        register,
        updateProfile,
        createSwapRequest,
        respondToSwapRequest,
        completeSwap,
        cancelSwapRequest,
        addRating,
        banUser,
        approveSkill,
        rejectSkill,
        createAdminMessage
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
