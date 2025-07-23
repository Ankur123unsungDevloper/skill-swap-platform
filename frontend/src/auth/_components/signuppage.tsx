import { SignUp } from '@clerk/clerk-react';
import ClerkLayout from '../clerklayout';

const SignupPage = () => {
  return (
    <ClerkLayout>
      <SignUp path="/signup" routing="path" redirectUrl="/dashboard" />
    </ClerkLayout>
  );
};

export default SignupPage;
