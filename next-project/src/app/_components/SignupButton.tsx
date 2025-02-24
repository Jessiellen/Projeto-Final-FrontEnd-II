import { useRouter } from 'next/router';

const SignupButton = () => {
  const router = useRouter();

  const handleSignup = () => {
    router.push('/register'); 
  };

  return (
    <button onClick={handleSignup}>
      Signup
    </button>
  );
};

export default SignupButton;