import { genSalt, hash, compare } from 'bcrypt';

export async function hashString(string: string): Promise<string> {
  const salt = await genSalt(10);

  return await hash(string, salt);
}

export async function compareHash(
  string: string,
  hash: string,
): Promise<boolean> {
  return await compare(string, hash);
}
