import { compare, hash } from "bcryptjs";

export const comparePassword = async (hash: string, password: string) => {
  return await compare(password, hash);
};
