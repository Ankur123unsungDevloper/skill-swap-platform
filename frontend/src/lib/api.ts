const API_BASE = 'http://localhost:3000/api';

export async function loginUser(email: string, password: string) {
  const res = await fetch(`${API_BASE}/user/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include', // If using cookies for auth
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) throw new Error('Login failed');
  return await res.json();
}

export async function logoutUser() {
  const res = await fetch(`${API_BASE}/user/logout`, {
    method: 'POST',
    credentials: 'include',
  });
  if (!res.ok) throw new Error('Logout failed');
}
