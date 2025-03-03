import bcrypt from 'bcrypt';

export const hashPassword = async (val: string, saltRounds?: number) =>
  bcrypt.hash(val, saltRounds || 10);

export const comparePassword = async (val: string, hashedValue: string) =>
  bcrypt.compare(val, hashedValue).catch(() => false);
