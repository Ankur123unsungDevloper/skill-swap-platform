import { SignIn } from '@clerk/clerk-react';
import ClerkLayout from '../clerklayout';

const LoginPage = () => {
  return (
    <ClerkLayout>
      <SignIn path="/login" routing="path" redirectUrl="/dashboard" />
    </ClerkLayout>
  );
};

export default LoginPage;
