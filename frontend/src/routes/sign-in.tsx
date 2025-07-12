import { SignIn } from '@clerk/clerk-react';
import ClerkLayout from '../components/layout/ClerkLayout';

export default function SignInPage() {
  return (
    <ClerkLayout>
      <SignIn path="/sign-in" />
    </ClerkLayout>
  );
}
