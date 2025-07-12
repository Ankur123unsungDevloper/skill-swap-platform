import React, { ReactNode } from 'react';
import { RedirectToSignIn, useUser } from '@clerk/clerk-react';

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isSignedIn, isLoaded } = useUser();

  if (!isLoaded) return null; // Optional: Loading state (spinner can be added here)

  if (!isSignedIn) {
    return <RedirectToSignIn />;
  }

  return <>{children}</>;
}
