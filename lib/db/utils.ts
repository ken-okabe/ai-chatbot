import { generateId } from 'ai';

export function generateDummyPassword() {
  const password = generateId(12);

  return password;
}
