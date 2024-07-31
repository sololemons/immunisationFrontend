// authGuard.js or similar file
import { useAuthStore } from '../stores/auth'; // Adjust the path as per your setup

export function requireAuth(to, from, next) {
  const authStore = useAuthStore(); // Check if the user is authenticated
  if (!authStore.isAuthenticated) {
    next({ name: 'Login' }); // Redirect to Login page if not authenticated
  } else {
    next(); // Proceed to the requested route
  }
}

export default requireAuth;