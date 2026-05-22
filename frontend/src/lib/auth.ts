// frontend/src/lib/auth.ts
export async function auth() {
  // مؤقتاً: نرجع مستخدم وهمي
  return { id: '1', name: 'Test User', email: 'test@example.com', role: 'user' };
}
