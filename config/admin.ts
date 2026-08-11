/**
 * Admin Configuration
 * 
 * IMPORTANT: This is a local-only authentication system.
 * The password is stored client-side and is NOT secure.
 * This is suitable ONLY for basic access control on static sites.
 * 
 * To change the admin password, modify the ADMIN_PASSWORD below.
 */

export const ADMIN_PASSWORD = 'pottery2024';
export const SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 hours
export const SESSION_STORAGE_KEY = 'admin_session';

export function verifyPassword(password: string): boolean {
  return password === ADMIN_PASSWORD;
}

export function createSession(): string {
  const timestamp = Date.now();
  const token = btoa(`session:${timestamp}`);
  return token;
}

export function validateSession(token: string): boolean {
  try {
    const decoded = atob(token);
    if (!decoded.startsWith('session:')) return false;

    const timestamp = parseInt(decoded.replace('session:', ''));
    const age = Date.now() - timestamp;

    return age < SESSION_DURATION;
  } catch {
    return false;
  }
}

export function setAdminSession(): void {
  if (typeof window === 'undefined') return;

  const token = createSession();
  localStorage.setItem(SESSION_STORAGE_KEY, token);
}

export function getAdminSession(): string | null {
  if (typeof window === 'undefined') return null;

  const token = localStorage.getItem(SESSION_STORAGE_KEY);
  if (!token) return null;

  if (!validateSession(token)) {
    localStorage.removeItem(SESSION_STORAGE_KEY);
    return null;
  }

  return token;
}

export function clearAdminSession(): void {
  if (typeof window === 'undefined') return;

  localStorage.removeItem(SESSION_STORAGE_KEY);
}

export function isAdminAuthenticated(): boolean {
  const token = getAdminSession();
  return token !== null && validateSession(token);
}
export function validateAdminSession(): boolean {
  return isAdminAuthenticated();
}
