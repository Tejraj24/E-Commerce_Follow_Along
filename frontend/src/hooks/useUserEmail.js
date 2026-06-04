import useAuth from './useAuth';

const FALLBACK_EMAIL = 'ayan10092018@gmail.com';

export default function useUserEmail() {
  const auth = useAuth();
  return auth?.currentUser?.email || FALLBACK_EMAIL;
}
