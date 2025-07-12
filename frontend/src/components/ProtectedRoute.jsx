import { RedirectToSignIn, useUser } from '@clerk/clerk-react';

export default function ProtectedRoute({ children }) {
  const { isSignedIn, isLoaded } = useUser();

  if (!isLoaded) return null; // Optional: loading state

  if (!isSignedIn) {
    return <RedirectToSignIn />;
  }

  return children;
}
