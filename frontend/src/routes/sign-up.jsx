import { SignUp } from '@clerk/clerk-react';
import ClerkLayout from '../components/layout/ClerkLayout';

export default function SignUpPage() {
  return (
    <ClerkLayout>
      <SignUp path="/sign-up" />
    </ClerkLayout>
  );
}
